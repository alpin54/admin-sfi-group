import { useCallback, useEffect, useState } from 'react';
import { Card, Button, Tooltip, Table, Space } from 'antd';
import Image from 'next/image';

// -- icons
import { EditOutlined, EyeOutlined, EyeInvisibleOutlined, WarningOutlined, DeleteOutlined } from '@ant-design/icons';

// -- utils
import LocalStorage from '@utils/localStorage';
import FormData from '@utils/formdata';

// -- elements
import SectionHeader from '@elements/SectionHeader/views';

const FormHomeSection1View = (props) => {
  const { method, confirm, notify, data, loading, onPublish, onStatus, onDelete } = props;
  const [isEdit, setIsEdit] = useState(false);
  const user = LocalStorage.get('user');

  useEffect(() => {
    if (method === 'edit') {
      setIsEdit(true);
    }
  }, [method]);

  const handleEnableForm = (e, value) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEdit(value);
  };

  const handlePublish = useCallback(
    (record) => {
      const title = record.status ? 'Unpublish' : 'Publish';
      const status = record.status ? 0 : 1;
      const payload = { id: record.id, status: status, updated_by: user?.id };
      const formData = FormData(payload);
      confirm({
        icon: <WarningOutlined />,
        content: `Are you sure you want to ${title.toLowerCase()} hero banner?`,
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

  const handleDelete = useCallback(
    (record) => {
      confirm({
        icon: <DeleteOutlined />,
        content: `Are you sure you want to delete ${record.id}?`,
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
              src={record.image_desktop}
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
        key: `title`,
        render: (title) => {
          if (!title) return '-';
          if (typeof title === 'string') return title;
          return title ?? '-';
        }
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: `description`,
        render: (description) => {
          if (!description) return '-';
          if (typeof description === 'string') return description;
          return description ?? '-';
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
                href={`/pages/home/hero-banner/edit/${record.id}`}
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
  }, [isEdit, handleDelete, handleStatus]);

  return (
    <>
      <Card>
        <SectionHeader title='Hero Banner' publish={data?.status} onPublish={() => handlePublish(data)} />

        <Table
          dataSource={data?.list || []}
          columns={buildColumns()}
          loading={loading}
          rowKey='id'
          pagination={false}
        />

        <Space size={16}>
          {isEdit ? (
            <>
              <Button color='primary' variant='outlined' onClick={(e) => handleEnableForm(e, false)}>
                Cancel
              </Button>
              <Button type='primary' href='/pages/home/hero-banner/add'>
                Add Hero Banner
              </Button>
            </>
          ) : (
            <Button type='primary' onClick={(e) => handleEnableForm(e, true)}>
              Edit
            </Button>
          )}
        </Space>
      </Card>
    </>
  );
};

export default FormHomeSection1View;
