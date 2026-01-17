// -- libraries
import { useCallback, useEffect, useState, useMemo } from 'react';
import { Card, Button, Tooltip, Table, Space, Form, Input } from 'antd';
import { EditOutlined, EyeOutlined, EyeInvisibleOutlined, WarningOutlined } from '@ant-design/icons';

// -- utils
import LocalStorage from '@utils/localStorage';
import FormData from '@utils/formdata';

// -- elements
import SectionHeader from '@elements/SectionHeader/views';
import TranslationTabs from '@components/Elements/TranslationTabs/views';

// -- components
import ModalMenu2 from '@components/Footer/ModalMenu2/widgets/Default';
import { Color } from 'antd/es/color-picker';

const FormFooterSection2View = (props) => {
  const { method, confirm, notify, data, ready, loading, message, onPublish, onStatus, onSubmit, refetch } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [methodForm, setMethodForm] = useState('add');
  const [dataForm, setDataForm] = useState(undefined);
  const [formInstance] = Form.useForm();
  const user = LocalStorage.get('user');
  const [formInstanceModal] = Form.useForm();

  useEffect(() => {
    if (method === 'edit') {
      setIsEdit(true);
    }
  }, [method]);

  useEffect(() => {
    if (data) {
      formInstance?.setFieldsValue({
        ...data,
        en: {
          title: data?.title?.en || '',
          alias: data?.alias?.en || ''
        },
        id: {
          title: data?.title?.id || '',
          alias: data?.alias?.id || ''
        }
      });
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

  const handleShowModal = useCallback(
    (type, record) => {
      formInstanceModal.resetFields();
      setMethodForm(type);
      setDataForm(type === 'add' ? undefined : record);
      setOpen(true);
    },
    [formInstanceModal]
  );

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

  const handlePublish = useCallback(
    (record) => {
      const title = record.status ? 'Unpublish' : 'Publish';
      const status = record.status ? false : true;
      const payload = { id: record.id, status: status, updated_by: user?.id };
      confirm({
        icon: <WarningOutlined />,
        content: `Are you sure you want to ${title.toLowerCase()} ${record.title.en.toLocaleLowerCase()}?`,
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
  // suspend/unsuspend row
  const handleStatus = useCallback(
    (record) => {
      const title = record.status ? 'Hide' : 'Unhide';
      const status = record.status ? false : true;
      const payload = { id: record.id, status: status, updated_by: user?.id, sorting: record.sorting };

      confirm({
        icon: <WarningOutlined />,
        content: `Are you sure you want to ${title.toLowerCase()} ${record.label.toLocaleLowerCase()}?`,
        onSuccess: async () => {
          const response = await onStatus(payload);
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

  // helper: build columns ...
  const buildColumns = useCallback(() => {
    const cols = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title'
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
          </Space>
        )
      });
    }

    return cols;
  }, [isEdit, handleStatus, handleShowModal]);

  return (
    <>
      <Card>
        <SectionHeader title='Menu 02' publish={data?.status} onPublish={() => handlePublish(data)} />
        <Form
          form={formInstance}
          id='form-footer-section2'
          layout='vertical'
          onFinish={handleFinish}
          initialValues={data}>
          <Form.Item name='id' hidden>
            <Input />
          </Form.Item>

          <TranslationTabs>
            {(lang) => (
              <>
                <Form.Item
                  name={[lang, 'title']}
                  label='Title'
                  rules={[{ required: true, message: 'Title is required' }]}>
                  <Input allowClear readOnly={!isEdit} />
                </Form.Item>
              </>
            )}
          </TranslationTabs>

          <Table dataSource={data?.list || []} columns={buildColumns()} rowKey='id' pagination={false} />

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

      {open && (
        <ModalMenu2
          method={methodForm}
          setMethod={() => setMethodForm('edit')}
          open={open}
          onClose={handleCloseModal}
          initialValues={dataForm}
          notify={notify}
          refetch={refetch}
          formInstance={formInstanceModal}
        />
      )}
    </>
  );
};

export default FormFooterSection2View;
