// --library
import { useCallback, useEffect, useState } from 'react';
import { Card, Button, Tooltip, Table, Space, Form, Input } from 'antd';
import Image from 'next/image';
import { EditOutlined, EyeOutlined, DeleteOutlined, EyeInvisibleOutlined, WarningOutlined } from '@ant-design/icons';

// -- utils
import LocalStorage from '@utils/localStorage';
import FormData from '@utils/formdata';

// -- elements
import SectionHeader from '@elements/SectionHeader/views';

// -- components
import ModalValues from '@components/Pages/AboutUs/ModalValues/widgets/Default';

const FormAboutUsSection3View = (props) => {
  const { method, confirm, notify, data, ready, loading, message, onPublish, onStatus, onDelete, onSubmit, refetch } =
    props;
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [methodForm, setMethodForm] = useState('add');
  const [dataForm, setDataForm] = useState(undefined);
  const [formInstance] = Form.useForm();
  const [formInstanceModal] = Form.useForm();
  const user = LocalStorage.get('user');

  useEffect(() => {
    if (method === 'edit') {
      setIsEdit(true);
    }
  }, [method]);

  useEffect(() => {
    if (data) {
      formInstance?.setFieldsValue(data);
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

  // Show modal (Add, Edit, View)
  const handleShowModal = useCallback(
    (type, record) => {
      formInstanceModal.resetFields();
      setMethodForm(type);
      setDataForm(type === 'add' ? undefined : record);
      setOpen(true);
    },
    [formInstanceModal]
  );

  // Close modal & reset modal-only state
  const handleCloseModal = useCallback(() => {
    formInstanceModal.resetFields();
    setDataForm(undefined);
    setOpen(false);
  }, [formInstanceModal]);

  const handleEnableForm = (e, value) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEdit(value);
  };

  const handleDelete = useCallback(
    (record) => {
      confirm({
        icon: <DeleteOutlined />,
        content: `Are you sure you want to delete ${record.title.toLocaleLowerCase()}?`,
        onSuccess: async () => {
          const response = await onDelete(record.id);
          if (response && !response.error) {
            notify({
              type: 'success',
              message: 'Data deleted successfully'
            });
          } else {
            notify({
              type: 'error',
              message: response.error || 'Failed to delete data'
            });
          }
        }
      });
    },
    [confirm, notify, onDelete]
  );

  const handleStatus = useCallback(
    (record) => {
      const title = record.status ? 'Hide' : 'Unhide';
      const status = record.status ? 0 : 1;
      const payload = { id: record.id, status: status, updated_by: user?.id };
      const formData = FormData(payload);

      confirm({
        icon: <WarningOutlined />,
        content: `Are you sure you want to ${title.toLowerCase()} ${record.title.toLocaleLowerCase()}?`,
        onSuccess: async () => {
          const response = await onStatus(formData);
          if (response && !response.error) {
            notify({
              type: 'success',
              message: `Data ${title.toLowerCase()} successfully`
            });
          } else {
            notify({
              type: 'error',
              message: response.error || `Failed to ${title.toLowerCase()} data`
            });
          }
        }
      });
    },
    [confirm, notify, onStatus, user]
  );

  const handlePublish = useCallback(
    (record) => {
      const title = record.status ? 'Unpublish' : 'Publish';
      const status = record.status ? false : true;
      const payload = { id: record.id, status: status, updated_by: user?.id };
      confirm({
        icon: <WarningOutlined />,
        content: `Are you sure you want to ${title.toLowerCase()} ${record.title.toLocaleLowerCase()}?`,
        onSuccess: async () => {
          const response = await onPublish(payload);
          if (response && !response.error) {
            notify({
              type: 'success',
              message: `Data ${title.toLowerCase()} successfully`
            });
          } else {
            notify({
              type: 'error',
              message: response.error || `Failed to ${title.toLowerCase()} data`
            });
          }
        }
      });
    },
    [confirm, notify, onPublish, user]
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

  // helper: build columns ...
  const buildColumns = useCallback(() => {
    const cols = [
      {
        title: 'Image',
        dataIndex: 'image',
        key: `image`,
        width: 80,
        render: (image, record) => {
          const src = image?.url ?? image ?? record?.image?.url ?? record?.image ?? '';
          if (!src) return null;
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image
                src={src}
                width={40}
                height={32}
                alt={`img-${record.id}`}
                style={{ objectFit: 'cover', borderRadius: 4 }}
              />
            </div>
          );
        }
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: `title`,
        ellipsis: {
          showTitle: true
        }
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: `description`,
        ellipsis: {
          showTitle: true
        },
        render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />
      }
    ];

    if (isEdit) {
      cols.push({
        title: 'Actions',
        key: 'actions',
        align: 'center',
        width: 200,
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

            <Tooltip key='edit' title='Edit' placement='top'>
              <Button
                size='small'
                type='text'
                icon={<EditOutlined />}
                onClick={() => handleShowModal('edit', record)}
              />
            </Tooltip>

            <Tooltip key='delete' title='Delete' placement='top'>
              <Button size='small' type='text' danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
            </Tooltip>
          </Space>
        )
      });
    }

    return cols;
  }, [isEdit, handleStatus, handleShowModal, handleDelete]);

  return (
    <>
      <Card loading={ready}>
        <SectionHeader title='Values' publish={data?.status} onPublish={() => handlePublish(data)} />
        <Form form={formInstance} id='form-about-us' layout='vertical' autoComplete='off' onFinish={handleFinish}>
          <Form.Item name='id' hidden>
            <Input />
          </Form.Item>

          <Form.Item name='title' label='Title ' rules={[{ required: true, message: 'Title is required' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Space size={16}>
              {isEdit ? (
                <>
                  <Button color='primary' variant='outlined' onClick={(e) => handleEnableForm(e, false)}>
                    Cancel
                  </Button>
                  <Button type='primary' htmlType='submit' form='form-about-us-section3' loading={loading}>
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
          <Table dataSource={data?.list || []} columns={buildColumns()} rowKey='id' pagination={false} />
          <Space size={16}>
            {isEdit ? (
              <>
                <Button color='primary' variant='outlined' onClick={(e) => handleEnableForm(e, false)}>
                  Cancel
                </Button>
                <Button type='primary' onClick={() => handleShowModal('add')}>
                  Add Value
                </Button>
              </>
            ) : (
              <Button type='primary' onClick={() => setIsEdit(true)}>
                Edit
              </Button>
            )}
          </Space>
        </Form>
      </Card>

      {open && (
        <ModalValues
          method={methodForm}
          setMethod={() => setMethodForm('edit')}
          open={open}
          onClose={handleCloseModal}
          initialValues={dataForm}
          formInstance={formInstanceModal}
          notify={notify}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default FormAboutUsSection3View;
