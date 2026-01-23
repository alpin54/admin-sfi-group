import { useCallback, useEffect, useState, useMemo } from 'react';
import { Card, Button, Tooltip, Table, Space, Switch, Form, Input } from 'antd';
import Image from 'next/image';

// -- icons
import { EditOutlined, EyeOutlined, DeleteOutlined, EyeInvisibleOutlined, WarningOutlined } from '@ant-design/icons';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';

// -- utils
import LocalStorage from '@utils/localStorage';
import FormData from '@utils/formdata';

// -- components
import ModalBranches from '@components/Pages/AboutUs/ModalBranches/widgets/Default';

// -- elements
import SectionHeader from '@elements/SectionHeader/views';
import TranslationTabs from '@components/Elements/TranslationTabs/views';

const FormAboutUsSection5View = (props) => {
  const { data, loading, onStatus, refetch, onDelete, onPublish } = props;
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState('add');
  const [dataForm, setDataForm] = useState(undefined);
  const [formInstance] = Form.useForm();
  const [formInstanceModal] = Form.useForm();
  const user = LocalStorage.get('user');

  useEffect(() => {
    if (method === 'edit') {
      setIsEdit(true);
    }
  }, [method]);

  // Show modal (Add, Edit, View)
  const handleShowModal = useCallback(
    (type, record) => {
      formInstanceModal.resetFields();
      setMethod(type);
      setDataForm(type === 'add' ? undefined : record);
      setOpen(true);
    },
    [formInstanceModal]
  );

  // Close modal & reset form
  const handleCloseModal = useCallback(() => {
    formInstanceModal.resetFields();
    setDataForm(undefined);
    setOpen(false);
  }, [formInstanceModal]);

  const handlePublish = useCallback(
    (record) => {
      const title = record.status ? 'Unpublish' : 'Publish';
      const status = record.status ? 0 : 1;
      const payload = { id: record.id, status: status, updated_by: user?.id };
      const formData = FormData(payload);
      confirm({
        icon: <WarningOutlined />,
        content: `Are you sure you want to ${title.toLowerCase()} ${record.title.toLocaleLowerCase()}?`,
        onSuccess: async () => {
          const response = await onPublish(formData);
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

  // Table actions
  const handleDelete = useCallback(
    (item) => {
      confirm({
        icon: <DeleteOutlined />,
        content: `Are you sure you want to delete ${item.title.en.toLocaleLowerCase()}?`,
        onSuccess: async () => {
          const response = await onDelete(item.id);
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
    (item) => {
      const title = item.status ? 'Hide' : 'Unhide';
      const status = item.status ? false : true;
      const payload = { id: item.id, status: status, updated_by: user.id };
      const formData = FormData(payload);

      confirm({
        icon: <WarningOutlined />,
        content: `Are you sure you want to ${title.toLowerCase()} ${item.title.en.toLocaleLowerCase()}?`,
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

  const handleFinish = async (values) => {
    try {
      const payload = {
        ...values,
        updated_by: user?.id
      };
      // Submit form data
      const response = await onSubmit(payload);

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

  const dataSource = Array.isArray(data.list) ? data.list : [];

  // helper: build columns for a given language key ('en' or 'id')
  const buildColumns = useCallback(() => {
    const cols = [
      {
        title: 'Province',
        dataIndex: 'province',
        key: 'province',
        width: 250,
        render: (value) => value || '-'
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        render: (value) => value || '-'
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
            <Tooltip
              key={record.status ? 'suspend' : 'unsuspend'}
              title={record.status ? 'Suspend' : 'Unsuspend'}
              placement='top'>
              <Button
                size='small'
                type='text'
                icon={record.status ? <EyeInvisibleOutlined /> : <EyeOutlined />}
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
              <Button size='small' type='text' danger onClick={() => handleDelete(record)}>
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </Space>
        )
      });
    }
    return cols;
  }, [isEdit, handleStatus, handleShowModal, handleDelete]);

  return (
    <>
      {confirmHolder}
      {notificationHolder}
      <Card>
        <SectionHeader title='Our Branches' publish={data?.status} onPublish={() => handlePublish(data)} />
        <Form form={formInstance} layout='vertical' autoComplete='off' onFinish={handleFinish} initialValues={data}>
          <Form.Item name='id' hidden>
            <Input />
          </Form.Item>

          <TranslationTabs>
            {(lang) => (
              <>
                <Form.Item
                  name={['title', lang]}
                  label='Title'
                  rules={[{ required: true, message: 'Title is required' }]}>
                  <Input allowClear readOnly={!isEdit} />
                </Form.Item>
                <div style={{ marginBottom: 12 }}>
                  {isEdit && (
                    <Button type='primary' onClick={() => handleFinish()} style={{ marginLeft: 8 }}>
                      Save
                    </Button>
                  )}
                </div>
              </>
            )}
          </TranslationTabs>

          <Table dataSource={dataSource} columns={buildColumns()} rowKey='id' pagination={false} />

          <div style={{ marginTop: 12 }}>
            {isEdit ? (
              <Button type='primary' onClick={() => handleShowModal('add')} style={{ marginLeft: 8 }}>
                Add Branches
              </Button>
            ) : (
              <Button type='primary' onClick={() => setIsEdit(true)} style={{ marginLeft: 8 }}>
                Edit
              </Button>
            )}
          </div>
        </Form>
      </Card>

      {open && (
        <ModalBranches
          method={method}
          setMethod={() => setMethod('edit')}
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

export default FormAboutUsSection5View;
