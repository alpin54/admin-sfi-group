// -- libraries
import { useCallback, useEffect, useState, useMemo } from 'react';
import { Card, Button, Tooltip, Form, Table } from 'antd';
import Image from 'next/image';

// -- icons
import { EditOutlined, EyeOutlined, DeleteOutlined, EyeInvisibleOutlined, WarningOutlined } from '@ant-design/icons';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- components
import ModalFeature from '@components/Dealer/Reward/ModalFeature/widgets/Default';

const FeatureRewardView = (props) => {
  const { data, loading, onDelete, onStatus, refetch, method, confirm, notify } = props;
  const [open, setOpen] = useState(false);
  const [methodForm, setMethodForm] = useState('add');
  const [dataForm, setDataForm] = useState(undefined);
  const [formInstance] = Form.useForm();
  const user = LocalStorage.get('user');

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

  // Table actions
  const handleDelete = useCallback(
    (item) => {
      confirm({
        icon: <DeleteOutlined />,
        content: (
          <span>
            Are you sure you want to delete the reward points <strong>{item.name}</strong>?
          </span>
        ),
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
        content: (
          <span>
            Are you sure you want to {title.toLowerCase()} the reward points <strong>{item.title.en}</strong>?
          </span>
        ),
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

  const dataColumns = [
    {
      title: 'Icon',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) =>
        record?.image && <Image width={40} height={40} src={record.image} alt={`icon-${record.id}`} />
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (val) => val.en || '-'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (val) => val.en || '-'
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      width: 200,
      render: (_, record) => (
        <>
          <Tooltip key='edit' title='Edit' placement='top'>
            <Button
              size='small'
              variant='text'
              color='default'
              icon={<EditOutlined />}
              onClick={() => handleShowModal('edit', record)}
            />
          </Tooltip>
          <Tooltip key={record.status ? 'unhide' : 'hide'} title={record.status ? 'Unhide' : 'Hide'} placement='top'>
            <Button
              size='small'
              type='text'
              icon={record.status ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              onClick={() => handleStatus(record)}
            />
          </Tooltip>
          <Tooltip key='delete' title='Delete' placement='top'>
            <Button
              size='small'
              variant='text'
              color='default'
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </>
      )
    }
  ];

  return (
    <>
      {/* Point Card */}
      <Table dataSource={data} columns={dataColumns} rowKey='id' pagination={false} />
      <Button type='primary' onClick={() => handleShowModal('add')}>
        Add Rewards Points
      </Button>
      {/* Modal */}
      {open && (
        <ModalFeature
          method={methodForm}
          setMethod={() => setMethodForm('edit')}
          open={open}
          onClose={handleCloseModal}
          initialValues={dataForm}
          formInstance={formInstance}
          notify={notify}
        />
      )}
    </>
  );
};

export default FeatureRewardView;
