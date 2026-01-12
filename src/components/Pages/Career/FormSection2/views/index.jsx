import { useCallback, useEffect, useState, useMemo } from 'react';
import { Card, Button, Tooltip, Table, Space, Switch, Form, App } from 'antd';
import Image from 'next/image';

// -- icons
import { EditOutlined, EyeOutlined, DeleteOutlined, EyeInvisibleOutlined, WarningOutlined } from '@ant-design/icons';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- components
import ModalImage from '@components/Pages/Career/ModalImage/widgets/Default';

// -- elements
import SectionHeader from '@elements/SectionHeader/views';

const FormCareerSection2View = (props) => {
  const { data, loading, onStatus, refetch, onDelete } = props;
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState('add');
  const [dataForm, setDataForm] = useState(undefined);
  const [formInstance] = Form.useForm();
  const user = LocalStorage.get('user');

  useEffect(() => {
    if (method === 'edit') {
      setIsEdit(true);
    }
  }, [method]);

  // Show modal (Add, Edit, View)
  const handleShowModal = useCallback(
    (type, record) => {
      formInstance.resetFields();
      setMethod(type);
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

  // Table actions
  const handleDelete = useCallback(
    (item) => {
      confirm({
        icon: <DeleteOutlined />,
        content: `Are you sure you want to delete `,
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

      confirm({
        icon: <WarningOutlined />,
        content: `Are you sure you want to `,
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

  const dataSource = Array.isArray(data) ? data : [];

  // helper: build columns for a given language key ('en' or 'id')
  const buildColumns = useCallback(
    (lang) => {
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
          key: `title_${lang}`,
          render: (title) => {
            if (!title) return '-';
            if (typeof title === 'string') return title;
            return title[lang] ?? '-';
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
    },
    [isEdit, handleStatus, handleShowModal, handleDelete]
  );

  return (
    <>
      {confirmHolder}
      {notificationHolder}
      <Card>
        <SectionHeader title='Image' />
        <Table dataSource={dataSource} columns={buildColumns()} rowKey='id' pagination={false} />
        <div style={{ marginTop: 12 }}>
          {isEdit ? (
            <Button type='primary' onClick={() => handleShowModal('add')} style={{ marginLeft: 8 }}>
              Add Recruitment Process
            </Button>
          ) : (
            <Button type='primary' onClick={() => setIsEdit(true)} style={{ marginLeft: 8 }}>
              Edit
            </Button>
          )}
        </div>
      </Card>

      {open && (
        <ModalImage
          method={method}
          setMethod={() => setMethod('edit')}
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

export default FormCareerSection2View;
