// -- libraries
import { useCallback, useState } from 'react';
import { Button, Table, Space, Tooltip, Breadcrumb, Form } from 'antd';
import Link from 'next/link';

// -- icons
import {
  EditOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  DeleteOutlined,
  ZoomInOutlined,
  WarningOutlined
} from '@ant-design/icons';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- components
import RoleDrawer from '@components/Role/Drawer/widgets/Default';

const RoleLanding = (props) => {
  const { accessOptions, data, loading, totalPage, pagination, onDelete, onStatus, onPageChange, refetch } = props;
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState('add');
  const [roleId, setRoleId] = useState(undefined);
  const [formInstance] = Form.useForm();
  const user = LocalStorage.get('user');

  // Show modal (Add, Edit, View)
  const handleShowModal = useCallback(
    (type, role_id) => {
      formInstance.resetFields();
      setMethod(type);
      setRoleId(type === 'add' ? undefined : role_id);
      setOpen(true);
    },
    [formInstance]
  );

  // Close modal & reset form
  const handleCloseModal = useCallback(() => {
    formInstance.resetFields();
    setRoleId(undefined);
    setOpen(false);
  }, [formInstance]);

  // Table actions
  const handleDelete = useCallback(
    (record) => {
      if (record.role_id !== user?.role_id) {
        confirm({
          icon: <DeleteOutlined />,
          content: `Are you sure you want to delete ${record.roleName.toLocaleLowerCase()}?`,
          onSuccess: async () => {
            const response = await onDelete(record.role_id);
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
      } else {
        notify({
          type: 'error',
          message: "can't delete data, you are logged in"
        });
      }
    },
    [confirm, notify, onDelete, user]
  );

  const handleStatus = useCallback(
    (record) => {
      if (record.role_id !== user?.role_id) {
        const title = record.status ? 'Hide' : 'Unhide';
        const status = record.status ? false : true;
        const payload = { id: record.role_id, status: status, updated_by: user?.id };
        confirm({
          icon: <WarningOutlined />,
          content: `Are you sure you want to ${title.toLowerCase()} ${record.roleName.toLocaleLowerCase()}?`,
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
      } else {
        notify({
          type: 'error',
          message: "can't delete data, you are logged in"
        });
      }
    },
    [confirm, notify, onStatus, user]
  );

  const dataColumns = [
    {
      title: 'Role Name',
      dataIndex: 'roleName'
    },
    { title: 'Permission', dataIndex: 'permissions' },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      width: 200,
      render: (_, record) => (
        <Space>
          <Tooltip title='View More' placement='left'>
            <Button
              size='small'
              variant='text'
              color='default'
              icon={<ZoomInOutlined />}
              onClick={() => handleShowModal('detail', record.role_id)}
            />
          </Tooltip>
          <Tooltip title='Edit' placement='left'>
            <Button
              size='small'
              variant='text'
              color='default'
              icon={<EditOutlined />}
              onClick={() => handleShowModal('edit', record.role_id)}
            />
          </Tooltip>
          <Tooltip title={record.status ? 'Hide' : 'Unhide'} placement='left'>
            <Button
              size='small'
              variant='text'
              color='default'
              icon={record.status ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              onClick={() => handleStatus(record)}
            />
          </Tooltip>
          <Tooltip title='Delete' placement='left'>
            <Button
              size='small'
              variant='text'
              color='default'
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <>
      {confirmHolder}
      {notificationHolder}
      <section id='role-section'>
        {/* Breadcrumb */}
        <div className='row-container'>
          <Breadcrumb items={[{ title: <Link href='/admin'>Admin</Link> }, { title: 'Role' }]} />
        </div>
        {/* Filter */}
        <div className='row-container'>
          <Button type='primary' onClick={() => handleShowModal('add')}>
            Add Role
          </Button>
        </div>

        {/* Table */}
        <Table
          columns={dataColumns}
          dataSource={data ?? []}
          rowKey='role_id'
          loading={loading}
          pagination={
            totalPage > pagination.limit && {
              current: pagination.page,
              pageSize: pagination.limit,
              total: totalPage,
              onChange: (page, pageSize) => onPageChange(page, pageSize),
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50', '100']
            }
          }
        />

        {/* Form */}
        {open && (
          <RoleDrawer
            method={method}
            setMethod={() => setMethod('edit')}
            open={open}
            onClose={handleCloseModal}
            roleId={roleId}
            accessOptions={accessOptions}
            formInstance={formInstance}
            notify={notify}
            refetch={refetch}
          />
        )}
      </section>
    </>
  );
};

export default RoleLanding;
