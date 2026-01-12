import { useCallback, useEffect, useRef, useState } from 'react';
import { Card, Button, Tooltip, Table, Space, Form, Input } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, WarningOutlined, DragOutlined } from '@ant-design/icons';

// -- utils
import LocalStorage from '@utils/localStorage';
import FormData from '@utils/formdata';

// -- elements
import SectionHeader from '@elements/SectionHeader/views';
import UploadImage from '@elements/UploadImage/views';

// -- styles
import style from '@components/Footer/FormSection2/styles/style.module.scss';

const FormFooterSection2View = (props) => {
  const { method, confirm, notify, data, ready, loading, message, onStatus, onSubmit, refetch } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [formInstance] = Form.useForm();
  const [formReady, setFormReady] = useState(false);
  const user = LocalStorage.get('user');

  // refs for drag handling
  const dragIndexRef = useRef(null);
  const dragOverIndexRef = useRef(null);

  useEffect(() => {
    if (method === 'edit') {
      setIsEdit(true);
    }
  }, [method]);

  useEffect(() => {
    if (data) {
      formInstance.setFieldsValue(data);
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
      // Cancel: restore values dari prop data (reset)
      formInstance.resetFields();
      formInstance.setFieldsValue(data);
    }
    setIsEdit(value);
  };

  const handleStatus = useCallback(
    (record) => {
      const title = record.status ? 'Hide' : 'Unhide';
      const status = record.status ? false : true;
      const payload = { id: record.id, status: status, updated_by: user?.id };

      confirm({
        icon: <WarningOutlined />,
        content: `Are you sure you want to ${title.toLowerCase()} ${record.title.toLocaleLowerCase()}?`,
        onSuccess: async () => {
          const response = await onStatus(payload);
          if (response && !response.error) {
            notify({
              type: 'success',
              message: `Data ${title.toLowerCase()} successfully`
            });
            if (typeof refetch === 'function') refetch();
          } else {
            notify({
              type: 'error',
              message: response.error || `Failed to ${title.toLowerCase()} data`
            });
          }
        }
      });
    },
    [confirm, notify, onStatus, user, refetch]
  );

  const handleFinish = async (values) => {
    try {
      const payload = {
        ...values,
        updated_by: user?.id
      };
      const formData = FormData(payload);
      // Submit form data
      const response = await onSubmit(formData);

      if (response && response.data) {
        notify({
          type: 'success',
          message: 'Data updated successfully'
        });
        setIsEdit(false);
        if (typeof refetch === 'function') refetch();
      } else {
        notify({
          type: 'error',
          message: 'Data failed to updated'
        });
      }
    } catch (err) {
      console.log('Error:', err);

      notify({
        type: 'error',
        message: 'Data failed to updated',
        description: err?.message ?? 'Unknown error'
      });
    }
  };

  const dataSource = formReady ? formInstance.getFieldValue('sosmed') || [] : [];

  // // Drag handlers (native HTML5)
  // const handleDragStart = (e, index) => {
  //   dragIndexRef.current = index;
  //   // for firefox
  //   e.dataTransfer.effectAllowed = 'move';
  //   try {
  //     e.dataTransfer.setData('text/plain', String(index));
  //   } catch (err) {
  //     // ignore; some browsers require setData
  //   }
  // };

  // const handleDragOver = (e, index) => {
  //   e.preventDefault();
  //   dragOverIndexRef.current = index;
  //   e.dataTransfer.dropEffect = 'move';
  // };

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   const from = dragIndexRef.current;
  //   const to = dragOverIndexRef.current;
  //   // reset refs
  //   dragIndexRef.current = null;
  //   dragOverIndexRef.current = null;

  //   if (from == null || to == null || from === to) return;

  //   const list = Array.isArray(formInstance.getFieldValue('sosmed'))
  //     ? [...formInstance.getFieldValue('sosmed')]
  //     : [...(data?.sosmed || [])];

  //   // Move item
  //   const item = list.splice(from, 1)[0];
  //   list.splice(to, 0, item);

  //   // update form value
  //   formInstance.setFieldsValue({ sosmed: list });
  // };

  // helper: build columns ...
  const buildColumns = useCallback(() => {
    const cols = [];

    // // drag handle column (only when editing)
    // if (isEdit) {
    //   cols.push({
    //     title: '',
    //     key: 'drag',
    //     width: 40,
    //     render: (_, record, index) => (
    //       <div style={{ cursor: 'grab', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    //         <DragOutlined />
    //       </div>
    //     )
    //   });
    // }

    cols.push(
      {
        title: 'Title',
        dataIndex: 'title',
        key: `title`,
        ellipsis: {
          showTitle: true
        },
        render: (_, record, index) => {
          // Form.Item per baris untuk input inline
          return (
            <Form.Item name={['sosmed', index, 'title']} style={{ margin: 0 }}>
              <Input readOnly={!isEdit} />
            </Form.Item>
          );
        }
      },
      {
        title: 'URL',
        dataIndex: 'url',
        key: `url`,
        render: (_, record, index) => {
          return (
            <Form.Item name={['sosmed', index, 'url']} style={{ margin: 0 }}>
              <Input readOnly={!isEdit} />
            </Form.Item>
          );
        }
      }
    );

    // actions column only when editing
    if (isEdit) {
      cols.push({
        title: 'Action',
        key: 'actions',
        align: 'center',
        width: 120,
        render: (_, record) => (
          <Space>
            <Tooltip key={record.status ? 'hide' : 'unhide'} title={record.status ? 'Hide' : 'Unhide'} placement='top'>
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
  }, [isEdit, handleStatus]);

  return (
    <>
      <Card loading={ready}>
        <SectionHeader title='Company Info' />
        <Form
          form={formInstance}
          id='form-footer-section2'
          layout='vertical'
          onFinish={handleFinish}
          initialValues={data}
          autoComplete='off'>
          <Form.Item name='id' hidden>
            <Input />
          </Form.Item>
          <Space>
            <h6 className={style.sectionSubtitle}>Logo</h6>
          </Space>
          <Form.Item name='logo' label='Image' valuePropName='file' getValueFromEvent={(e) => e} help='280px x 40px'>
            <UploadImage value={{ url: data?.logo }} disabled={!isEdit} />
          </Form.Item>
          <Space>
            <h6 className={style.sectionSubtitle}>Subscribe</h6>
          </Space>
          <Form.Item name='subscribe_title' label='Title ' rules={[{ required: true, message: 'Title is required' }]}>
            <Input readOnly={!isEdit} />
          </Form.Item>
          <Form.Item
            name='subscribe_description'
            label='Description'
            rules={[{ required: true, message: 'Description is required' }]}>
            <Input.TextArea rows={3} readOnly={!isEdit} />
          </Form.Item>
          <Space>
            <h6 className={style.sectionSubtitle}>Copyright</h6>
          </Space>
          <Form.Item name='copyright' label='Title ' rules={[{ required: true, message: 'Title is required' }]}>
            <Input readOnly={!isEdit} />
          </Form.Item>
          <Space>
            <h6 className={style.sectionSubtitle}>Social Media</h6>
          </Space>
          <Form.Item name='sosmed_title' label='Title ' rules={[{ required: true, message: 'Title is required' }]}>
            <Input readOnly={!isEdit} />
          </Form.Item>

          <Table dataSource={dataSource} columns={buildColumns()} rowKey='id' pagination={false} />

          <Form.Item>
            <Space size={16}>
              {isEdit ? (
                <>
                  <Button color='primary' variant='outlined' onClick={(e) => handleEnableForm(e, false)}>
                    Cancel
                  </Button>
                  <Button type='primary' htmlType='submit' form='form-footer-section2' loading={loading}>
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
        </Form>
      </Card>
    </>
  );
};

export default FormFooterSection2View;
