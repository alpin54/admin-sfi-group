// -- libraries
import { useCallback, useEffect, useRef, useState } from 'react';
import { Card, Button, Tooltip, Table, Space, Form, Input } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, WarningOutlined } from '@ant-design/icons';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- elements
import SectionHeader from '@elements/SectionHeader/views';

// -- styles
import style from '@components/Footer/FormSection1/styles/style.module.scss';

const FormFooterSection1View = (props) => {
  const { method, confirm, notify, data, ready, loading, message, onStatus, onSubmit, refetch } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [formInstance] = Form.useForm();
  const [formReady, setFormReady] = useState(false);
  const user = LocalStorage.get('user');

  // Keep a deep copy of original data so we can detect changes
  const originalDataRef = useRef({});

  useEffect(() => {
    if (method === 'edit') {
      setIsEdit(true);
    }
  }, [method]);

  useEffect(() => {
    if (data) {
      // set form fields and snapshot original data for change detection
      formInstance.setFieldsValue(data);
      // deep clone to avoid mutation issues
      originalDataRef.current = JSON.parse(JSON.stringify(data));
      setFormReady(true);
    }
  }, [data, formInstance]);

  useEffect(() => {
    if (message) {
      notify({
        type: 'error',
        message: `Failed`,
        description: message
      });
    }
  }, [message, notify]);

  const handleEnableForm = (e, value) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (!value) {
      formInstance.resetFields();
      formInstance.setFieldsValue(data);
    }
    setIsEdit(value);
  };

  const handleStatus = useCallback(
    (record) => {
      const title = record.status ? 'Hide' : 'Unhide';
      const status = !record.status;
      const payload = { id: record.id, status, updated_by: user?.id };

      confirm({
        icon: <WarningOutlined />,
        content: `Are you sure you want to ${title.toLowerCase()} ${record.title?.toLocaleLowerCase()}?`,
        onSuccess: async () => {
          const response = await onStatus(payload);
          if (response && !response.error) {
            notify({ type: 'success', message: `Data ${title.toLowerCase()} successfully` });
            refetch?.();
            // update snapshot so subsequent "no changes" check considers this new state
            if (originalDataRef.current) {
              const keys = ['menu_1', 'menu_2'];
              keys.forEach((k) => {
                originalDataRef.current[k] = (originalDataRef.current[k] || []).map((it) =>
                  it.id === record.id ? { ...it, status: Number(status) } : it
                );
              });
            }
          } else {
            notify({ type: 'error', message: response?.error || `Failed to ${title.toLowerCase()} data` });
          }
        }
      });
    },
    [confirm, notify, onStatus, user, refetch]
  );

  // Normalize item fields to compare/send to API
  const normalizeItem = (item, index) => {
    const sorting = typeof item?.sorting !== 'undefined' ? Number(item.sorting) : index + 1;
    return {
      id: item?.id,
      name: item?.name ?? '',
      alias: item?.alias ?? '',
      sorting,
      updated_by: user?.id
    };
  };

  const isSameItem = (a = {}, b = {}) => {
    // Compare relevant fields: name, alias, sorting, status
    const na = a.name ?? '';
    const nb = b.name ?? '';
    const aa = a.alias ?? '';
    const ab = b.alias ?? '';
    const sa = Number(a.sorting ?? 0);
    const sb = Number(b.sorting ?? 0);
    const sta = Number(a.status ?? 1);
    const stb = Number(b.status ?? 1);
    return na === nb && aa === ab && sa === sb && sta === stb;
  };

  // Build payloads only for items that changed (or new items)
  const buildChangedPayloads = (values) => {
    const changed = [];
    const keys = ['menu_1', 'menu_2'];
    keys.forEach((key) => {
      const currentArr = values?.[key] ?? formInstance.getFieldValue(key) ?? data?.[key] ?? [];
      const originalArr = (originalDataRef.current?.[key] ?? []).slice();

      if (!Array.isArray(currentArr)) return;

      currentArr.forEach((item, idx) => {
        const normalized = normalizeItem(item, idx);
        if (normalized.id) {
          // find original by id
          const orig = originalArr.find((o) => String(o.id) === String(normalized.id));
          if (!orig) {
            // Original not found -> treat as new (edge-case)
            changed.push({ payload: normalized, method: 'post' });
          } else {
            if (!isSameItem(normalized, orig)) {
              changed.push({ payload: normalized, method: 'put' });
            }
          }
        } else {
          // new item -> always create
          changed.push({ payload: normalized, method: 'post' });
        }
      });
    });

    return changed;
  };

  const handleFinish = async (values) => {
    try {
      const payloads = buildChangedPayloads(values);

      if (payloads.length === 0) {
        notify({ type: 'info', message: 'No changes detected' });
        setIsEdit(false);
        return;
      }

      const errors = [];
      for (const p of payloads) {
        const response = await onSubmit(p.payload, p.method);
        if (!(response && response.data)) {
          errors.push({
            payload: p.payload,
            error: response?.error || 'Unknown error'
          });
        } else {
          // if success and was update (put) or create (post), update snapshot accordingly
          // For updates, replace original item; for posts, ideally response.data contains new id
          const respItem = response.data;
          const keys = ['menu_1', 'menu_2'];
          keys.forEach((k) => {
            const arr = originalDataRef.current?.[k] ?? [];
            const idx = arr.findIndex((it) => it.id && String(it.id) === String(p.payload.id));
            if (idx !== -1) {
              // update existing
              arr[idx] = { ...arr[idx], ...p.payload, ...(respItem || {}) };
            } else if (p.method === 'post') {
              // add new at end
              arr.push({ ...(p.payload || {}), ...(respItem || {}) });
            }
            originalDataRef.current[k] = arr;
          });
        }
      }

      if (errors.length === 0) {
        notify({ type: 'success', message: 'Changed items saved successfully' });
        setIsEdit(false);
        refetch();
      } else {
        notify({
          type: 'error',
          message: 'Some items failed to save',
          description: `${errors.length} item(s) failed to save.`
        });
        refetch();
      }
    } catch (err) {
      notify({
        type: 'error',
        message: 'Data failed to update',
        description: err?.message ?? 'Unknown error'
      });
    }
  };

  const getMenuList = (key) => formInstance.getFieldValue(key) || data?.[key] || [];

  const buildColumnsFor = useCallback(
    (key) => {
      const cols = [
        {
          title: 'Title',
          dataIndex: 'name',
          key: `${key}-name`,
          ellipsis: { showTitle: true },
          render: (_, record, index) => (
            <>
              <Form.Item name={[key, index, 'id']} hidden>
                <Input />
              </Form.Item>

              <Form.Item
                name={[key, index, 'sorting']}
                hidden
                initialValue={typeof record?.sorting !== 'undefined' ? record.sorting : index + 1}>
                <Input />
              </Form.Item>

              <Form.Item
                name={[key, index, 'status']}
                hidden
                initialValue={typeof record?.status !== 'undefined' ? Number(record.status) : 1}>
                <Input />
              </Form.Item>

              <Form.Item name={[key, index, 'name']} style={{ margin: 0 }}>
                <Input readOnly={!isEdit} />
              </Form.Item>
            </>
          )
        },
        {
          title: 'Alias',
          dataIndex: 'alias',
          key: `${key}-alias`,
          render: (_, record, index) => (
            <Form.Item name={[key, index, 'alias']} style={{ margin: 0 }}>
              <Input readOnly={!isEdit} placeholder='alias / url' />
            </Form.Item>
          )
        }
      ];

      if (isEdit) {
        cols.push({
          title: 'Action',
          key: `${key}-actions`,
          align: 'center',
          width: 120,
          render: (_, record) => (
            <Space>
              <Tooltip title={record.status ? 'Hide' : 'Unhide'} placement='top'>
                <Button
                  size='small'
                  type='text'
                  icon={record.status ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  onClick={() => handleStatus(record)}
                />
              </Tooltip>
            </Space>
          )
        });
      }

      return cols;
    },
    [isEdit, handleStatus]
  );

  return (
    <Card loading={ready}>
      <SectionHeader title='Menu' />
      <Form form={formInstance} id='form-footer-section1' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        {formReady && (
          <>
            <div className={style.col}>
              <div className={style.wrapper}>
                <h6 className={style.sectionSubtitle}>Menu 01</h6>
                <Table
                  dataSource={getMenuList('menu_1')}
                  columns={buildColumnsFor('menu_1')}
                  rowKey='id'
                  pagination={false}
                />
              </div>

              <div className={style.wrapper}>
                <h6 className={style.sectionSubtitle}>Menu 02</h6>
                <Table
                  dataSource={getMenuList('menu_2')}
                  columns={buildColumnsFor('menu_2')}
                  rowKey='id'
                  pagination={false}
                />
              </div>
            </div>

            <Form.Item style={{ marginTop: 16 }}>
              <Space size={16}>
                {isEdit ? (
                  <>
                    <Button color='primary' variant='outlined' onClick={(e) => handleEnableForm(e, false)}>
                      Cancel
                    </Button>
                    <Button type='primary' htmlType='submit' form='form-footer-section1' loading={loading}>
                      Save
                    </Button>
                  </>
                ) : (
                  <Button type='primary' htmlType='button' onClick={(e) => handleEnableForm(e, true)}>
                    Edit
                  </Button>
                )}
              </Space>
            </Form.Item>
          </>
        )}
      </Form>
    </Card>
  );
};

export default FormFooterSection1View;
