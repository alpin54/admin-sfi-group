// --library
import { useCallback } from 'react';
import { Button, Row, Col, Table, Space, Tooltip, Input, Select } from 'antd';
import Link from 'next/link';
import {
  ZoomInOutlined,
  DeleteOutlined,
  SearchOutlined,
  AuditOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  EditOutlined,
  FolderOpenOutlined,
  WarningOutlined
} from '@ant-design/icons';

// --components
import style from '@components/Career/Landing/styles/style.module.scss';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';
import usePermission from '@hooks/usePermission';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- elements
import CardSummary from '@components/Elements/CardSummary/views';

const CareerView = (props) => {
  const {
    summaryCareer,
    summaryApplication,
    data,
    loading,
    filters,
    pagination,
    totalPage,
    onDelete,
    onSuspend,
    onPageChange,
    onFilterChange,
    categoryJobTypeOptions
  } = props;

  // Hooks
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();
  const { canView, canCreate, canEdit, canDelete } = usePermission('/career'); // Sesuaikan dengan route career Anda

  const user = LocalStorage?.get?.('user');
  const dataSummaryCareer = summaryCareer;
  const dataSummaryApplication = summaryApplication;

  // Actions
  const handleDelete = useCallback(
    (record) => {
      if (!canDelete) {
        notify({
          type: 'error',
          message: 'You do not have permission to delete'
        });
        return;
      }

      confirm({
        title: 'Delete',
        icon: <DeleteOutlined style={{ color: 'red' }} />,
        content: `Are you sure you want to delete ${record.title.toLocaleLowerCase()}?`,
        onSuccess: async () => {
          notify({
            type: 'success',
            message: 'Data deleted successfully'
          });
          await onDelete(record.id);
        }
      });
    },
    [confirm, notify, onDelete, canDelete]
  );

  const handleSuspend = useCallback(
    (record) => {
      if (!canEdit) {
        notify({
          type: 'error',
          message: 'You do not have permission to hide/unhide'
        });
        return;
      }

      const title = record.status ? 'Hide' : 'Unhide';
      const suspend = record.status ? 0 : 1;
      const payload = { id: record.id, status: suspend, updated_by: user.id };

      confirm({
        title: title,
        icon: record.status ? <EyeOutlined /> : <EyeInvisibleOutlined />,
        content: `Are you sure you want to ${title.toLowerCase()} ${record.title.toLocaleLowerCase()}?`,
        onSuccess: async () => {
          notify({
            type: 'success',
            message: `Data ${title.toLowerCase()} successfully`
          });
          await onSuspend(payload);
        }
      });
    },
    [confirm, notify, user, onSuspend, canEdit]
  );

  const dataColumns = [
    { title: 'Career', dataIndex: 'title', key: 'title' },
    {
      title: 'Job Type',
      dataIndex: 'job_type_id',
      render: (_, record) => record.job_type_name || record.workplace_type_name || '-'
    },
    {
      title: 'Workplace',
      dataIndex: 'workplace_type_id',
      render: (_, record) => record.employment_status_name || record.workplace_type_name || '-'
    },
    { title: 'Applicants', dataIndex: 'applicants', key: 'applicants' },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      width: 160,
      render: (_, record) => (
        <Space>
          {canView && (
            <Tooltip title='View More' placement='left'>
              <Link href={`/career/detail/${record.id}`}>
                <Button size='small' type='text' icon={<ZoomInOutlined />} />
              </Link>
            </Tooltip>
          )}
          {canEdit && (
            <Tooltip title='Edit' placement='left'>
              <Link href={`/career/edit/${record.id}`}>
                <Button size='small' type='text' icon={<EditOutlined />} />
              </Link>
            </Tooltip>
          )}
          {canView && (
            <Tooltip title='Application' placement='left'>
              <Link href={`/career/application/${record.id}`}>
                <Button size='small' type='text' icon={<FolderOpenOutlined />} />
              </Link>
            </Tooltip>
          )}
          {canEdit && (
            <Tooltip title={record.status ? 'Hide' : 'Unhide'} placement='left'>
              <Button
                size='small'
                type='text'
                icon={record.status ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                onClick={() => handleSuspend(record)}
              />
            </Tooltip>
          )}
          {canDelete && (
            <Tooltip title='Delete' placement='left'>
              <Button size='small' type='text' icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
            </Tooltip>
          )}
        </Space>
      )
    }
  ];

  // Access Denied Guard
  if (!canView) {
    return (
      <div style={{ padding: '48px', textAlign: 'center' }}>
        <WarningOutlined style={{ fontSize: '64px', color: '#faad14', marginBottom: '16px' }} />
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page. </p>
      </div>
    );
  }

  return (
    <>
      {confirmHolder}
      {notificationHolder}
      <section className={style?.menu ?? ''}>
        {/* Card Summary */}
        <Row gutter={[16, 16]} className='row-container'>
          <Col xs={24} sm={12}>
            <CardSummary icon={<AuditOutlined />} title='Total Application' value={dataSummaryApplication?.total} />
          </Col>

          <Col xs={24} sm={12}>
            <CardSummary icon={<AuditOutlined />} title='Total Career' value={dataSummaryCareer?.total} />
          </Col>
        </Row>

        {/* Actions + Filters */}
        <Row gutter={[16, 16]} className='row-container' style={{ marginTop: 16 }}>
          {canCreate && (
            <Col>
              <Link href='/career/add'>
                <Button type='primary'>Add New Career</Button>
              </Link>
            </Col>
          )}
          <Col>
            <Link href='/career/job-type'>
              <Button type='default'>Job Type</Button>
            </Link>
          </Col>
          <Col>
            <Link href='/career/workplace'>
              <Button type='default'>Workplace</Button>
            </Link>
          </Col>

          <Col flex='auto' />
        </Row>

        <Row gutter={[16, 16]} className='row-container' style={{ marginTop: 12 }}>
          <Col xs={24} md={6}>
            <Select
              showSearch
              allowClear
              placeholder='Job Type'
              optionFilterProp='label'
              options={categoryJobTypeOptions?.map((category) => ({
                label: category.name,
                value: category.id
              }))}
              value={filters?.job_type_id}
              onChange={(value) => onFilterChange({ job_type_id: value })}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} md={18}>
            <Input
              placeholder='Search .  . .'
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
    </>
  );
};

export default CareerView;
