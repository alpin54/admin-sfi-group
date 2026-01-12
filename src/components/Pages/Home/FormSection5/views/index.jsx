import { useCallback, useEffect, useState } from 'react';
import { Card, Button, Tooltip, Table, Space, Form } from 'antd';
import Image from 'next/image';
import { EditOutlined, EyeOutlined, EyeInvisibleOutlined, WarningOutlined } from '@ant-design/icons';

// -- utils
import LocalStorage from '@utils/localStorage';
import FormData from '@utils/formdata';

// -- elements
import SectionHeader from '@components/Elements/SectionHeader/views';

// -- components
import ModalHighlight from '@components/Pages/Home/ModalHighlight/widgets/Default';

const FormHomeSection5View = (props) => {
  const { method, confirm, notify, data, loading, onPublish, onStatus, refetch } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
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
    (record) => {
      formInstance.resetFields();
      setDataForm(record);
      setOpen(true);
    },
    [formInstance]
  );

  // Close modal & reset modal-only state
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
        content: `Are you sure you want to ${title.toLowerCase()} highlight?`,
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

  // helper: build columns ...
  const buildColumns = useCallback(() => {
    const cols = [
      {
        title: 'Image',
        dataIndex: 'image',
        key: `image`,
        width: 80,
        render: (_, record) => {
          return (
            <Image
              src={record.image}
              width={40}
              height={32}
              alt={`img-${record.id}`}
              style={{ objectFit: 'cover', borderRadius: 4 }}
            />
          );
        }
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: `title`
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: `description`,
        render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />
      }
    ];

    if (isEdit) {
      cols.push({
        title: 'Actions',
        key: 'actions',
        align: 'center',
        width: 100,
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
              <Button size='small' type='text' icon={<EditOutlined />} onClick={() => handleShowModal(record)} />
            </Tooltip>
          </Space>
        )
      });
    }

    return cols;
  }, [isEdit, handleStatus, handleShowModal]);

  return (
    <>
      <Card loading={loading}>
        <SectionHeader title='Higlight' publish={data?.status} onPublish={() => handlePublish(data)} />
        <Table dataSource={data?.list || []} columns={buildColumns()} rowKey='id' pagination={false} />
        <Space size={16}>
          {isEdit ? (
            <Button color='primary' variant='outlined' onClick={(e) => handleEnableForm(e, false)}>
              Cancel
            </Button>
          ) : (
            <Button type='primary' onClick={() => setIsEdit(true)}>
              Edit
            </Button>
          )}
        </Space>
      </Card>

      {open && (
        <ModalHighlight
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

export default FormHomeSection5View;
