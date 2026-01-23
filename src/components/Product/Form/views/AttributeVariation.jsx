// -- libraries
import { useEffect, useCallback } from 'react';
import { Input, Button } from 'antd';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';

// -- icons
import { DeleteOutlined } from '@ant-design/icons';

// -- styles
import style from '@components/Product/Form/styles/style.module.scss';

// -- utils
import { generateId } from '@utils/productHelpers';

// -- components
import SortableOption from '@components/Product/Form/views/SortableOption';

const AttributeVariation = ({ viewOnly, data, attributesHook }) => {
  const {
    attributes,
    setAttributes,
    addAttribute,
    removeAttribute,
    updateAttributeName,
    updateOptionValue,
    removeOption
  } = attributesHook;

  // Initialize one empty attribute when creating new product
  useEffect(() => {
    if (!data && attributes.length === 0) {
      setAttributes([
        {
          id: generateId(),
          name: '',
          options: [{ id: generateId(), value: '' }],
          active: true
        }
      ]);
    }
  }, [data, attributes.length, setAttributes]);

  // Initialize attributes from API data when editing
  useEffect(() => {
    if (!data) return;
    if (attributes.length > 0) return;

    if (Array.isArray(data.attributes) && data.attributes.length) {
      const incoming = data.attributes.map((attr) => ({
        id: generateId(),
        name: attr.name ?? '',
        options:
          Array.isArray(attr.options) && attr.options.length
            ? attr.options.map((opt) => ({ id: generateId(), value: String(opt) }))
            : [{ id: generateId(), value: '' }],
        active: true
      }));
      setAttributes(incoming);
    }
  }, [data, attributes.length, setAttributes]);

  const onDragEnd = useCallback(
    ({ active, over }) => {
      if (!active?.id || !over?.id) return;
      const [activeAttrId, activeOptId] = String(active.id).split('-');
      const [overAttrId, overOptId] = String(over.id).split('-');
      if (activeAttrId !== overAttrId) return;
      setAttributes((prev) =>
        prev.map((a) => {
          if (a.id !== activeAttrId) return a;
          const currentOptions = Array.from(a.options);
          const oldIndex = currentOptions.findIndex((o) => String(o.id) === String(activeOptId));
          const newIndex = currentOptions.findIndex((o) => String(o.id) === String(overOptId));
          if (oldIndex === -1 || newIndex === -1) return a;
          const moved = arrayMove(currentOptions, oldIndex, newIndex);
          return { ...a, options: moved };
        })
      );
    },
    [setAttributes]
  );

  // Handler tombol Add Variation
  const handleAddVariation = useCallback(() => {
    if (typeof addAttribute === 'function') addAttribute();
  }, [addAttribute]);

  return (
    <>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <div className={style.variation}>
          {attributes.map((attr) => (
            <div key={attr.id} className={style.variationItem}>
              <div className={style.variationHeader}>
                <Input
                  variant='borderless'
                  placeholder='Enter Variation'
                  value={attr.name}
                  onChange={(e) => updateAttributeName(attr.id, e.target.value)}
                  disabled={viewOnly}
                />
                {!viewOnly && (
                  <Button
                    className={style.delete}
                    variant='text'
                    color='default'
                    onClick={() => removeAttribute(attr.id)}
                    icon={<DeleteOutlined />}
                  />
                )}
              </div>
              <SortableContext
                items={attr.options.map((o) => `${attr.id}-${o.id}`)}
                strategy={verticalListSortingStrategy}>
                <div className={style.option}>
                  {attr.options.map((opt) => (
                    <SortableOption
                      key={opt.id}
                      option={opt}
                      attrId={attr.id}
                      onChangeValue={(optId, val) => updateOptionValue(attr.id, optId, val)}
                      onRemove={(optId) => removeOption(attr.id, optId)}
                      disabled={viewOnly}
                    />
                  ))}
                </div>
              </SortableContext>
            </div>
          ))}
        </div>
      </DndContext>

      {!viewOnly && attributes.length < 3 && (
        <Button size='small' type='primary' onClick={handleAddVariation}>
          Add Variation
        </Button>
      )}
    </>
  );
};

export default AttributeVariation;
