// -- libraries
import { useCallback } from 'react';
import { Button, Table, Space, Tooltip, Row, Col, Input, DatePicker } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';

// -- icons
import {
  ZoomInOutlined,
  DeleteOutlined,
  SearchOutlined,
  LockOutlined,
  UnlockOutlined,
  UserAddOutlined,
  WarningOutlined
} from '@ant-design/icons';

// -- style
import style from '@components/Member/Landing/styles/style.module.scss';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';
import usePermission from '@hooks/usePermission';

// -- utils
import Currency from '@utils/currency';
import LocalStorage from '@utils/localStorage';

// -- elements
import CardSummary from '@components/Elements/CardSummary/views';

const MemberLanding = (props) => {
  const { data, summary, loading, filters, totalPage, pagination, onDelete, onSuspend, onPageChange, onFilterChange } =
    props;

  // Hooks
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();
  const { canView, canEdit, canDelete } = usePermission('/member');
  const { RangePicker } = DatePicker;
  const user = LocalStorage.get('user');

  // range presets
  const rangePresets = [
    { label: 'Today', value: [dayjs(), dayjs().endOf('day')] },
    { label: 'Last 7 Days', value: [dayjs().add(-6, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-13, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-29, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-89, 'd'), dayjs()] }
  ];

  // transform summary
  const transformSummaryData = (summary) => {
    if (!summary || summary.length === 0) return [];

    const item = summary;
    const label = item.label || '';

    const keys = [
      { key: 'total_member', icon: <UserAddOutlined />, title: 'Total Member' },
      { key: 'total_revenue_member', icon: <UserAddOutlined />, title: 'Total Revenue Member' }
    ];

    return keys.map((entry) => {
      const value = item[entry.key] ?? { total: 0, previous: 0, percentage_change: 0 };

      const baseData = {
        icon: entry.icon,
        title: entry.title,
        value: value.total ?? 0
      };

      return {
        ...baseData,
        description: `From the last ${label}`,
        percentage: Math.abs(value.percentage_change ?? 0),
        traffic: (value.percentage_change ?? 0) >= 0
      };
    });
  };

  // Table actions
  const handleDelete = useCallback(
    (record) => {
      if (!canDelete) {
        notify({
          type: 'error',
          message: 'Permission denied',
          description: 'You do not have permission to delete'
        });
        return;
      }

      let passwordInput = '';

      confirm({
        icon: <DeleteOutlined />,
        content: (
          <>
            <p>
              Are you sure you want to delete the account of <strong>{record.name}</strong>?
            </p>
            <Input.Password
              allowClear
              placeholder='Enter your password'
              onChange={(e) => {
                passwordInput = e.target.value;
              }}
            />
          </>
        ),
        onSuccess: async () => {
          if (!passwordInput) {
            notify({
              type: 'error',
              message: 'Password required',
              description: 'Please enter your password to confirm deletion'
            });
            return;
          }

          try {
            await onDelete(record.id, passwordInput);
            notify({
              type: 'success',
              message: 'Data deleted successfully'
            });
          } catch (error) {
            notify({
              type: 'error',
              message: 'Failed to delete data',
              description: error.message || 'An error occurred'
            });
          }
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
          message: 'Permission denied',
          description: 'You do not have permission to suspend/unsuspend'
        });
        return;
      }

      const title = record.status ? 'Suspend' : 'Unsuspend';
      const suspend = record.status ? 0 : 1;
      const payload = { id: record.id, status: suspend, updated_by: user.id };

      confirm({
        icon: <WarningOutlined style={{ color: '#d6a31f' }} />,
        content: (
          <span>
            Are you sure you want to {title.toLowerCase()} the account of <strong>{record.name}</strong>?
          </span>
        ),
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
    {
      title: 'Date',
      dataIndex: 'created_at',
      width: 180
    },
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
    { title: 'Phone Number', dataIndex: 'phone', width: 140 },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Points', dataIndex: 'point' },
    { title: 'Total Order', dataIndex: 'total_order', render: (val) => Currency.formatRp(val) },
    { title: 'Total Spending', dataIndex: 'total_spending', render: (val) => Currency.formatRp(val) },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      width: 200,
      render: (_, record) => (
        <Space>
          {canView && (
            <Tooltip title='View More' placement='left'>
              <Link href={`/member/detail/${record.id}`}>
                <Button size='small' variant='text' color='default' icon={<ZoomInOutlined />} />
              </Link>
            </Tooltip>
          )}
          {canEdit && (
            <Tooltip title={record.status ? 'Suspend' : 'Unsuspend'} placement='left'>
              <Button
                size='small'
                variant='text'
                color='default'
                icon={record.status ? <UnlockOutlined /> : <LockOutlined />}
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

  return (
    <>
      {confirmHolder}
      {notificationHolder}
      <section id='member-section' className={style.Member}>
        {/* Filter */}
        <div className='row-container'>
          <RangePicker
            className='custom-range-picker'
            allowClear={false}
            defaultValue={[dayjs(), dayjs()]}
            format='DD MMM YYYY'
            presets={rangePresets}
          />
        </div>

        {/* Summary */}
        <Row gutter={[16, 16]} className='row-container'>
          {transformSummaryData(summary).map((val, idx) => (
            <Col span={12} key={`summ-${idx}`}>
              <CardSummary {...val} />
            </Col>
          ))}
        </Row>

        {/* Search */}
        <Row gutter={[16, 16]} className='row-container'>
          <Col lg={24}>
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
    </>
  );
};

export default MemberLanding;
