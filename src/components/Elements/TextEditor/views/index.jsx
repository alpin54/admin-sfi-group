'use client';

// -- library
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Modal, InputNumber, Space, Tooltip, Switch, Input, Popover, Select, Divider, Spin } from 'antd';
import {
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  CodeOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  BlockOutlined,
  TableOutlined,
  LinkOutlined,
  InfoCircleOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  MenuOutlined,
  UnderlineOutlined,
  FontSizeOutlined,
  DeleteOutlined,
  InsertRowBelowOutlined,
  DeleteRowOutlined,
  DeleteColumnOutlined,
  InsertRowRightOutlined
} from '@ant-design/icons';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// Import TipTap extensions as namespace so we can handle different export shapes
import * as TextStyleModule from '@tiptap/extension-text-style';
import * as UnderlineModule from '@tiptap/extension-underline';
import * as TextAlignModule from '@tiptap/extension-text-align';
import * as ColorModule from '@tiptap/extension-color';

// -- utils
import { loadTiptapTableExtensions } from '@utils/tiptap';

// -- styles
import style from '@components/Elements/TextEditor/styles/style.module.scss';

// --- FONT SIZE custom extension ----
import { Mark, mergeAttributes } from '@tiptap/core';

const FontSize = Mark.create({
  name: 'fontSize',
  addAttributes() {
    return {
      fontSize: {
        default: null,
        parseHTML: (element) => element.style.fontSize || null,
        renderHTML: (attributes) => {
          if (!attributes.fontSize) return {};
          return { style: `font-size: ${attributes.fontSize}` };
        }
      }
    };
  },
  parseHTML() {
    return [
      {
        style: 'font-size'
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0];
  }
});

// ----------- END FONT SIZE extension -----------

/* Helper to resolve module export shape to usable extension */
function resolveModuleExt(mod, configureArgs) {
  if (!mod) return null;
  // possible shapes: default export, named export (e.g. TextStyle), or module itself
  const candidate = mod.default || mod.TextStyle || mod.Underline || mod.TextAlign || mod.Color || mod;
  if (!candidate) return null;
  // if candidate has configure, try to configure (pass args when provided)
  if (candidate.configure && typeof candidate.configure === 'function') {
    try {
      return candidate.configure(configureArgs || {});
    } catch (err) {
      // fall back to returning candidate itself
      // eslint-disable-next-line no-console
      console.warn('Failed to configure candidate extension (falling back):', err);
    }
  }
  return candidate;
}

/* Helper untuk menghapus duplicate extension names */
function dedupeExtensions(exts) {
  const seen = new Set();
  const out = [];
  for (const ext of exts) {
    const name = ext && ext.name;
    if (!name) {
      out.push(ext);
      continue;
    }
    if (!seen.has(name)) {
      seen.add(name);
      out.push(ext);
    }
  }
  return out;
}

/* small helper to safely render icons (fallback to text) */
function IconOrLabel(IconComp, label) {
  if (typeof IconComp !== 'undefined' && IconComp) {
    try {
      return <IconComp />;
    } catch (e) {
      return <span>{label}</span>;
    }
  }
  return <span>{label}</span>;
}

/* EditorInner: menerima final extensions sebagai prop dan inisialisasi editor di sini */
function EditorInner({ initialContent, onChange, placeholder, className, extensions }) {
  const editor = useEditor({
    extensions: dedupeExtensions(extensions),
    content: initialContent || '<p></p>',
    onUpdate: ({ editor }) => {
      if (typeof onChange === 'function') onChange(editor.getHTML());
    },
    immediatelyRender: false // hindari SSR hydration mismatch
  });

  // expose to window for debugging (optional)
  useEffect(() => {
    if (editor && typeof window !== 'undefined') {
      // window.__editor = editor; // uncomment if needed for debugging
    }
    return () => {
      // if (typeof window !== 'undefined' && window.__editor === editor) delete window.__editor;
    };
  }, [editor]);

  // destroy on unmount
  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  // sync initialContent update
  useEffect(() => {
    if (editor && initialContent !== undefined && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialContent, editor]);

  // toolbar/modal states
  const [isTableModalVisible, setTableModalVisible] = useState(false);
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [withHeader, setWithHeader] = useState(true);
  const [linkUrl, setLinkUrl] = useState('');
  const [isLinkModalVisible, setLinkModalVisible] = useState(false);

  // word count (updated on editor update)
  const [wordCount, setWordCount] = useState(0);
  useEffect(() => {
    if (!editor) return;
    const updateCount = () => {
      try {
        const text = typeof editor.getText === 'function' ? editor.getText() : editor.state.doc.textContent || '';
        const count = text.trim().length === 0 ? 0 : text.trim().split(/\s+/).filter(Boolean).length;
        setWordCount(count);
      } catch {
        setWordCount(0);
      }
    };
    updateCount();
    try {
      editor.on('update', updateCount);
      return () => editor.off('update', updateCount);
    } catch {
      return undefined;
    }
  }, [editor]);

  if (!editor) {
    return (
      <div style={{ padding: 12, border: '1px dashed #e8e8e8', borderRadius: 6 }}>
        <strong>Editor not initialized</strong>
        <div style={{ marginTop: 6 }}>
          Check console for errors. If you see icon/component undefined warnings, run:
          <pre style={{ background: '#fafafa', padding: 8 }}>
            npm install @ant-design/icons @tiptap/extension-text-style @tiptap/extension-underline
            @tiptap/extension-text-align @tiptap/extension-color
          </pre>
        </div>
      </div>
    );
  }

  const toggleMark = (mark) => {
    switch (mark) {
      case 'bold':
        editor.chain().focus().toggleBold().run();
        break;
      case 'italic':
        editor.chain().focus().toggleItalic().run();
        break;
      case 'strike':
        editor.chain().focus().toggleStrike().run();
        break;
      case 'code':
        editor.chain().focus().toggleCode().run();
        break;
      default:
        break;
    }
  };

  // textStyle helper: fontFamily, color only (fontSize pakai mark fontSize tersendiri)
  const applyTextStyle = (attrs = {}) => {
    try {
      // ONLY apply non-fontSize attribute with textStyle
      // e.g. {color:...}
      if (attrs.color) {
        editor.chain().focus().setMark('textStyle', { color: attrs.color }).run();
      }
      // fontSize now handled by fontSize mark extension
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Failed to apply textStyle (maybe extension not installed):', err);
    }
  };

  const clearTextStyle = () => {
    try {
      editor.chain().focus().unsetMark('textStyle').unsetMark('fontSize').run();
    } catch {}
  };

  const setAlignment = (alignment) => {
    try {
      if (editor.chain) editor.chain().focus().setTextAlign(alignment).run();
    } catch {}
  };

  const toggleUnderline = () => {
    try {
      if (editor.chain) editor.chain().focus().toggleUnderline().run();
    } catch {
      // eslint-disable-next-line no-console
      console.warn('Underline command not available (extension missing).');
    }
  };

  const insertTable = (r, c, header) => {
    if (!editor || !editor.commands || !editor.commands.insertTable) {
      // eslint-disable-next-line no-console
      console.warn(
        'insertTable command not available. Current extensions:',
        editor.extensionManager.extensions.map((e) => e.name)
      );
      return;
    }
    editor
      .chain()
      .focus()
      .insertTable({ rows: Number(r), cols: Number(c), withHeaderRow: !!header })
      .run();
  };

  const removeTable = () => {
    if (editor.commands.deleteNode) editor.chain().focus().deleteNode('table').run();
  };
  const addRow = () => {
    if (editor.commands.addRowAfter) editor.chain().focus().addRowAfter().run();
  };
  const deleteRow = () => {
    if (editor.commands.deleteRow) editor.chain().focus().deleteRow().run();
  };
  const addColumn = () => {
    if (editor.commands.addColumnAfter) editor.chain().focus().addColumnAfter().run();
  };
  const deleteColumn = () => {
    if (editor.commands.deleteColumn) editor.chain().focus().deleteColumn().run();
  };

  const openLinkModal = () => {
    setLinkModalVisible(true);
    const selectedText = editor.state.doc.textBetween(editor.state.selection.from, editor.state.selection.to, ' ');
    setLinkUrl(selectedText && selectedText.startsWith('http') ? selectedText : '');
  };
  const applyLink = () => {
    if (!linkUrl) editor.chain().focus().unsetLink().run();
    else editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    setLinkModalVisible(false);
    setLinkUrl('');
  };

  const sizes = [
    { label: '16', value: '16px' },
    { label: '18', value: '18px' },
    { label: '20', value: '20px' },
    { label: '24', value: '24px' }
  ];

  return (
    <div className={`${style.rteWrapper} ${className}`}>
      <div className={style.rteToolbar} style={{ marginBottom: 8 }}>
        <Space wrap align='center'>
          <Select
            size='small'
            style={{ width: 92 }}
            placeholder='Size'
            options={sizes}
            onChange={(val) => {
              // Use custom fontSize mark
              if (val) {
                editor.chain().focus().setMark('fontSize', { fontSize: val }).run();
              } else {
                editor.chain().focus().unsetMark('fontSize').run();
              }
            }}
            allowClear
            suffixIcon={<FontSizeOutlined />}
          />

          <Divider type='vertical' style={{ height: 24 }} />

          <Tooltip title='Align left'>
            <Button size='small' onClick={() => setAlignment('left')} icon={IconOrLabel(AlignLeftOutlined, 'L')} />
          </Tooltip>
          <Tooltip title='Align center'>
            <Button size='small' onClick={() => setAlignment('center')} icon={IconOrLabel(AlignCenterOutlined, 'C')} />
          </Tooltip>
          <Tooltip title='Align right'>
            <Button size='small' onClick={() => setAlignment('right')} icon={IconOrLabel(AlignRightOutlined, 'R')} />
          </Tooltip>
          <Tooltip title='Justify'>
            <Button size='small' onClick={() => setAlignment('justify')} icon={IconOrLabel(MenuOutlined, 'J')} />
          </Tooltip>

          <Divider type='vertical' style={{ height: 24 }} />

          <Tooltip title='Bold'>
            <Button
              size='small'
              type={editor.isActive('bold') ? 'primary' : 'default'}
              onClick={() => toggleMark('bold')}
              icon={IconOrLabel(BoldOutlined, 'B')}
            />
          </Tooltip>

          <Tooltip title='Italic'>
            <Button
              size='small'
              type={editor.isActive('italic') ? 'primary' : 'default'}
              onClick={() => toggleMark('italic')}
              icon={IconOrLabel(ItalicOutlined, 'I')}
            />
          </Tooltip>

          <Tooltip title='Underline'>
            <Button
              size='small'
              type={editor.isActive('underline') ? 'primary' : 'default'}
              onClick={toggleUnderline}
              icon={IconOrLabel(UnderlineOutlined, 'U')}
            />
          </Tooltip>

          <Tooltip title='Strike'>
            <Button
              size='small'
              type={editor.isActive('strike') ? 'primary' : 'default'}
              onClick={() => toggleMark('strike')}
              icon={IconOrLabel(StrikethroughOutlined, 'S')}
            />
          </Tooltip>

          <Tooltip title='Code'>
            <Button
              size='small'
              type={editor.isActive('code') ? 'primary' : 'default'}
              onClick={() => toggleMark('code')}
              icon={IconOrLabel(CodeOutlined, '<>')}
            />
          </Tooltip>

          <Divider type='vertical' style={{ height: 24 }} />

          <Tooltip title='Bullet list'>
            <Button
              size='small'
              type={editor.isActive('bulletList') ? 'primary' : 'default'}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              icon={IconOrLabel(UnorderedListOutlined, '•')}
            />
          </Tooltip>

          <Tooltip title='Ordered list'>
            <Button
              size='small'
              type={editor.isActive('orderedList') ? 'primary' : 'default'}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              icon={IconOrLabel(OrderedListOutlined, '1.')}
            />
          </Tooltip>

          <Tooltip title='Blockquote'>
            <Button
              size='small'
              type={editor.isActive('blockquote') ? 'primary' : 'default'}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              icon={IconOrLabel(BlockOutlined, '"')}
            />
          </Tooltip>

          <Divider type='vertical' style={{ height: 24 }} />

          <Tooltip title='Insert table'>
            <Button size='small' onClick={() => setTableModalVisible(true)} icon={IconOrLabel(TableOutlined, 'Tbl')} />
          </Tooltip>

          <Tooltip title='Add row'>
            <Button size='small' onClick={addRow} icon={<InsertRowBelowOutlined />} />
          </Tooltip>
          <Tooltip title='Delete row'>
            <Button size='small' onClick={deleteRow} icon={<DeleteColumnOutlined />} />
          </Tooltip>

          <Tooltip title='Add column'>
            <Button size='small' onClick={addColumn} icon={<InsertRowRightOutlined />} />
          </Tooltip>
          <Tooltip title='Delete column'>
            <Button size='small' onClick={deleteColumn} icon={<DeleteRowOutlined />} />
          </Tooltip>

          <Tooltip title='Remove table'>
            <Button size='small' onClick={removeTable} icon={<DeleteOutlined />} />
          </Tooltip>

          <Divider type='vertical' style={{ height: 24 }} />

          <Tooltip title='Link'>
            <Button size='small' onClick={openLinkModal} icon={IconOrLabel(LinkOutlined, 'Link')} />
          </Tooltip>

          <Popover
            content={
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                  type='color'
                  onChange={(e) => applyTextStyle({ color: e.target.value })}
                  style={{ width: 36, height: 28, border: 'none', padding: 0, background: 'transparent' }}
                />
                <Button size='small' onClick={() => clearTextStyle()}>
                  Clear
                </Button>
              </div>
            }
            title='Text color'
            trigger='click'>
            <Button size='small'>A</Button>
          </Popover>

          <Popover
            content={
              <div style={{ maxWidth: 360 }}>
                <h4 style={{ margin: '0 0 8px' }}>Article Writing Tips</h4>
                <ul style={{ paddingLeft: 16, margin: 0 }}>
                  <li>
                    <strong>Title:</strong> Use H1 for the page title; keep it short and descriptive (50–70 chars).
                  </li>
                  <li>
                    <strong>Sections:</strong> Use H2/H3 to break content into scannable sections.
                  </li>
                  <li>
                    <strong>Paragraphs:</strong> Keep paragraphs short (2–4 sentences).
                  </li>
                  <li>
                    <strong>Media:</strong> Add images with alt text and captions for accessibility.
                  </li>
                  <li>
                    <strong>Links:</strong> Use descriptive anchor text for outbound/internal links.
                  </li>
                  <li>
                    <strong>SEO:</strong> Aim 700–1,500 words for long-form content; include keywords naturally.
                  </li>
                </ul>
                <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
                  Tip: Use the toolbar to insert headings, lists, and tables. Word count shown below.
                </div>
              </div>
            }
            title='Writing Tips'
            trigger='click'>
            <Button size='small' icon={IconOrLabel(InfoCircleOutlined, 'i')} />
          </Popover>
        </Space>
      </div>

      <div className={style.rteEditor}>
        <EditorContent editor={editor} className={style.editorContent} data-placeholder={placeholder} />
      </div>

      {/* footer: word count and optional status */}
      <div className={style.editorFooter}>
        <div className={style.editorStatus}>Tips: Keep paragraphs short, use headings.</div>
        <div className={style.wordCount}>Words: {wordCount}</div>
      </div>

      <Modal
        title='Insert table'
        open={isTableModalVisible}
        onOk={() => {
          insertTable(rows, cols, withHeader);
          setTableModalVisible(false);
        }}
        onCancel={() => setTableModalVisible(false)}
        okText='Insert'>
        <Space direction='vertical'>
          <div>
            Rows: <InputNumber min={1} max={20} value={rows} onChange={(v) => setRows(Number(v || 1))} />
          </div>
          <div>
            Columns: <InputNumber min={1} max={20} value={cols} onChange={(v) => setCols(Number(v || 1))} />
          </div>
          <div>
            Header row: <Switch checked={withHeader} onChange={(val) => setWithHeader(val)} />
          </div>
        </Space>
      </Modal>

      <Modal
        title='Insert link'
        open={isLinkModalVisible}
        onOk={applyLink}
        onCancel={() => setLinkModalVisible(false)}
        okText='Apply'>
        <Input placeholder='https://example.com' value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} />
      </Modal>
    </div>
  );
}

/* Parent component: loads table extensions then mounts EditorInner with final extensions */
export default function TextEditor({
  value = '',
  onChange,
  placeholder = 'Tulis sesuatu...',
  className = '',
  withTables = true
}) {
  // resolve modules we imported as namespaces
  const ResolvedTextStyle = resolveModuleExt(TextStyleModule);
  const ResolvedUnderline = resolveModuleExt(UnderlineModule);
  const ResolvedTextAlign = resolveModuleExt(TextAlignModule, { types: ['heading', 'paragraph'] });
  const ResolvedColor = resolveModuleExt(ColorModule);

  // Add FontSize extension
  const baseExtensions = useMemo(
    () =>
      [
        StarterKit.configure({ heading: { levels: [1, 2, 3] }, underline: false }),
        ResolvedTextStyle,
        ResolvedUnderline,
        ResolvedTextAlign,
        ResolvedColor,
        FontSize
      ].filter(Boolean),
    [ResolvedTextStyle, ResolvedUnderline, ResolvedTextAlign, ResolvedColor]
  );

  const [tableExtensions, setTableExtensions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!withTables) {
        if (mounted) {
          setTableExtensions([]);
          setLoading(false);
        }
        return;
      }
      try {
        const resolved = await loadTiptapTableExtensions();
        if (!mounted) return;
        setTableExtensions(resolved || []);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to load table extensions in TextEditor parent:', err);
        if (mounted) setTableExtensions([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [withTables]);

  // If waiting for table extensions, wait — so EditorInner mounts with final extensions
  if (loading) {
    return (
      <div className='custom-load'>
        <Spin size='large' />
      </div>
    );
  }

  const merged = dedupeExtensions([...baseExtensions, ...(tableExtensions || [])]);
  // EditorInner will initialize editor with merged extensions, making insertTable available immediately
  return (
    <EditorInner
      initialContent={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      extensions={merged}
    />
  );
}
