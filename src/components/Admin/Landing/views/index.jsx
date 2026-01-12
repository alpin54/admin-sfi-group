// -- libraries
import { useState, useCallback } from 'react';
import { Button, Table, Space, Tooltip, Form, Row, Col, Input, Select } from 'antd';
import Image from 'next/image';

// -- icons
import {
  ZoomInOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  WarningOutlined
} from '@ant-design/icons';

// -- style
import style from '@components/Admin/Landing/styles/style.module.scss';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';
import usePermission from '@hooks/usePermission';

// -- utils
import LocalStorage from '@utils/localStorage';
import FormData from '@utils/formdata';

// -- components
import AdminModal from '@components/Admin/Modal/widgets/Default';

// -- elements
import CardSummary from '@components/Elements/CardSummary/views';

const AdminLanding = (props) => {
  const {
    roleOptions,
    data,
    loading,
    filters,
    totalPage,
    pagination,
    onDelete,
    onSuspend,
    onPageChange,
    onFilterChange,
    refetch
  } = props;

  // Hooks
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();
  const { canView, canCreate, canEdit, canDelete } = usePermission('/admin'); // Sesuaikan dengan route admin Anda

  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState('add');
  const [dataForm, setDataForm] = useState(undefined);
  const [formInstance] = Form.useForm();
  const user = LocalStorage.get('user');

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
    (record) => {
      if (!canDelete) {
        notify({
          type: 'error',
          message: 'You do not have permission to delete'
        });
        return;
      }

      if (record.id !== user?.id) {
        confirm({
          icon: <DeleteOutlined />,
          content: `Are you sure you want to delete ${record.name.toLocaleLowerCase()}?`,
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
      } else {
        notify({
          type: 'error',
          message: "can't delete data, you are logged in"
        });
      }
    },
    [confirm, notify, onDelete, user, canDelete]
  );

  const handleSuspend = useCallback(
    (record) => {
      if (!canEdit) {
        notify({
          type: 'error',
          message: 'You do not have permission to suspend/unsuspend'
        });
        return;
      }

      if (record.id !== user?.id) {
        const title = record.status ? 'Suspend' : 'Unsuspend';
        const suspend = record.status ? 0 : 1;
        const payload = { id: record.id, status: suspend, updated_by: user.id };
        const formData = FormData(payload, 'suspend');

        confirm({
          icon: <WarningOutlined />,
          content: `Are you sure you want to ${title.toLowerCase()} ${record.name.toLocaleLowerCase()}?`,
          onSuccess: async () => {
            const response = await onSuspend(formData);
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
    [confirm, notify, onSuspend, user, canEdit]
  );

  const dataColumns = [
    {
      title: 'Full Name',
      dataIndex: 'name',
      render: (_, record) => (
        <div className={style.profile}>
          <div className={style.avatar}>
            <Image src={record.image} alt={record.name} className={style.avatar} width={40} height={40} />
          </div>
          <div className={style.text}>
            <span className={style.name}>{record.name}</span>
          </div>
        </div>
      )
    },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Role', dataIndex: 'role_name' },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      width: 200,
      render: (_, record) => (
        <Space>
          {canView && (
            <Tooltip title='View More' placement='left'>
              <Button
                size='small'
                variant='text'
                color='default'
                icon={<ZoomInOutlined />}
                onClick={() => handleShowModal('detail', record)}
              />
            </Tooltip>
          )}
          {canEdit && (
            <Tooltip title='Edit' placement='left'>
              <Button
                size='small'
                variant='text'
                color='default'
                icon={<EditOutlined />}
                onClick={() => handleShowModal('edit', record)}
              />
            </Tooltip>
          )}
          {canEdit && (
            <Tooltip title={record.status ? 'Suspend' : 'Unsuspend'} placement='left'>
              <Button
                size='small'
                variant='text'
                color='default'
                icon={record.status ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                onClick={() => handleSuspend(record)}
              />
            </Tooltip>
          )}
          {canDelete && (
            <Tooltip title='Delete' placement='left'>
              <Button
                size='small'
                variant='text'
                color='default'
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record)}
              />
            </Tooltip>
          )}
        </Space>
      )
    }
  ];

  // Jika user tidak punya akses view, tampilkan pesan
  if (!canView) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <WarningOutlined style={{ fontSize: '48px', color: '#faad14' }} />
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page. </p>
      </div>
    );
  }

  return (
    <>
      {confirmHolder}
      {notificationHolder}
      <section id='admin-section' className={style.admin}>
        {/* Summary */}
        <Row gutter={[16, 16]} className='row-container'>
          <Col lg={24}>
            <CardSummary title='Total Admin' value={data?.total ?? 0} icon={<EditOutlined />} />
          </Col>
        </Row>

        {/* Action Buttons */}
        <Row gutter={[16, 16]} className='row-container'>
          {canCreate && (
            <Col lg={4}>
              <Button type='primary' block onClick={() => handleShowModal('add')}>
                Add Admin
              </Button>
            </Col>
          )}
          <Col lg={3}>
            <Button color='primary' variant='outlined' block href='/admin/role'>
              Role
            </Button>
          </Col>
        </Row>

        {/* Filter */}
        <Row gutter={[16, 16]} className='row-container'>
          <Col lg={7}>
            <Select
              showSearch
              allowClear
              placeholder='Role'
              optionFilterProp='label'
              options={roleOptions.map((role) => ({
                label: role.roleName,
                value: role.role_id
              }))}
              value={filters?.role_id}
              onChange={(value) => onFilterChange({ role_id: value })}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
            />
          </Col>
          <Col lg={17}>
            <Input
              placeholder='Search...'
              suffix={<SearchOutlined />}
              allowClear
              value={filters?.keyword}
              onChange={(e) => onFilterChange({ keyword: e.target.value })}
            />
          </Col>
        </Row>

        {/* Table */}
        <Table
          columns={dataColumns}
          dataSource={data ?? []}
          rowKey='id'
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
      </section>

      {/* Form Modal */}
      {open && (
        <AdminModal
          roleOptions={roleOptions}
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

export default AdminLanding;
