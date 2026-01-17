import { useCallback, useEffect, useState } from 'react';
import { Card, Button, Tooltip, Table, Space, Form } from 'antd';

// -- icons
import { EditOutlined, EyeOutlined, DeleteOutlined, EyeInvisibleOutlined, WarningOutlined } from '@ant-design/icons';

// -- utils
import LocalStorage from '@utils/localStorage';
import FormData from '@utils/formdata';

// -- elements
import SectionHeader from '@elements/SectionHeader/views';
import TranslationTabs from '@components/Elements/TranslationTabs/views';

// -- components
import ModalItem from '@components/Pages/Faq/ModalItem/widgets/Default';

const FormFaqSection3View = (props) => {
  const { method, confirm, notify, data, ready, message, onStatus, onDelete, refetch } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [methodForm, setMethodForm] = useState('add');
  const [dataForm, setDataForm] = useState(undefined);
  const [formInstance] = Form.useForm();
  const user = LocalStorage.get('user');

  useEffect(() => {
    if (method === 'edit') {
      setIsEdit(true);
    }
  }, [method]);

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
      formInstance.resetFields();
      setMethodForm(type);
      setDataForm(type === 'add' ? undefined : record);
      setOpen(true);
    },
    [formInstance]
  );

  // Close modal & reset form
  const handleCloseModal = useCallback(() => {
    formInstance.resetFields();
    setDataForm(undefined);
    setOpen(false);
  }, [formInstance]);

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
      const status = record.status ? false : true;
      const payload = { id: record.id, status: status, updated_by: user?.id };
      const formData = FormData(payload, 'Hide');

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

  // helper: build columns for a given language key ('en' or 'id')
  const buildColumns = useCallback(
    (lang) => {
      const cols = [
        {
          title: 'Title',
          dataIndex: ['title', lang],
          key: `title_${lang}`,
          render: (value, record) => {
            return record?.title?.[lang] || '-';
          }
        },
        {
          title: 'Description',
          dataIndex: ['description', lang],
          key: `description_${lang}`,
          render: (value, record) => {
            const txt = record?.description?.[lang] || '-';
            return (
              <div style={{ maxWidth: 480, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {txt}
              </div>
            );
          }
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
                key={record.status ? 'hide' : 'unhide'}
                title={record.status ? 'Hide' : 'Unhide'}
                placement='top'>
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
                <Button size='small' type='text' danger onClick={() => handleDelete(record)}>
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </Space>
          )
        });
      }

      return cols;
    },
    [handleDelete, handleStatus, handleShowModal, isEdit]
  );

  return (
    <>
      <Card loading={ready}>
        <SectionHeader title='FAQ Item' />
        <TranslationTabs>
          {(lang) => <Table dataSource={data || []} columns={buildColumns(lang)} rowKey='id' pagination={false} />}
        </TranslationTabs>

        <Space size={16}>
          {isEdit ? (
            <>
              <Button color='primary' variant='outlined' onClick={(e) => handleEnableForm(e, false)}>
                Cancel
              </Button>
              <Button type='primary' htmlType='button' onClick={() => handleShowModal('add')}>
                Add FAQ
              </Button>
            </>
          ) : (
            <Button type='primary' htmlType='button' onClick={(e) => handleEnableForm(e, true)}>
              Edit
            </Button>
          )}
        </Space>
      </Card>

      {open && (
        <ModalItem
          method={methodForm}
          setMethod={() => setMethodForm('edit')}
          open={open}
          onClose={handleCloseModal}
          initialValues={dataForm}
          formInstance={formInstance}
          notify={notify}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default FormFaqSection3View;
