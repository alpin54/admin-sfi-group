// -- libraries
import { useCallback } from 'react';
import { Button, Table, Space, Tooltip, Row, Col, Input, Tag, DatePicker, Badge } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/id';

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.locale('id');

// -- icons
import { DeleteOutlined, SearchOutlined, ZoomInOutlined, DollarCircleOutlined } from '@ant-design/icons';

// -- assets
import shippingImage from '@assets/image/dummy/anteraja.svg';
import paymentImage from '@assets/image/dummy/bca.svg';

// -- styles
import style from '@components/Revenue/styles/style.module.scss';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';
import usePermission from '@hooks/usePermission';

// -- utils
import Currency from '@utils/currency';
import LocalStorage from '@utils/localStorage';

// -- elements
import CardSummary from '@components/Elements/CardSummary/views';

const RevenueLanding = (props) => {
  const {
    data,
    summary,
    loading,
    filters,
    pagination,
    totalPage,
    onDelete,
    onPageChange,
    onFilterChange,
    dateRange,
    setDateRange
  } = props;

  // Hooks
  const { RangePicker } = DatePicker;
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();
  const { canView, canDelete } = usePermission('/revenue');
  const user = LocalStorage.get('user');

  // range presets
  const rangePresets = [
    { label: 'Today', value: [dayjs(), dayjs().endOf('day')] },
    { label: 'Last 7 Days', value: [dayjs().add(-6, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-13, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-29, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-89, 'd'), dayjs()] }
  ];

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

      confirm({
        title: 'Delete',
        icon: <DeleteOutlined style={{ color: 'red' }} />,
        content: `Are you sure you want to delete ${record.order_id}?`,
        onSuccess: async () => {
          notify({
            type: 'success',
            message: 'Data deleted successfully'
          });
          const payload = { id: record.id, deleted_by: user?.id };
          await onDelete(payload);
        }
      });
    },
    [confirm, notify, onDelete, user, canDelete]
  );

  const dataColumns = [
    {
      title: 'Date',
      dataIndex: 'created_at',
      width: 180,
      render: (val) => dayjs(val).format('DD MMM YYYY, HH:mm')
    },
    {
      title: 'Order Id',
      dataIndex: 'order_code'
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      width: 180,
      render: (val) => val.name
    },
    {
      title: 'Type',
      dataIndex: 'customer',
      width: 120,
      render: (val) => {
        const roleMap = {
          Guest: { label: 'Guest', color: 'success' },
          Member: { label: 'Member', color: 'processing' },
          Dealer: { label: 'Dealer', color: 'warning' }
        };
        const role = roleMap[val.role_name] || { label: 'Unknown', color: 'error' };

        return <Badge status={role.color} text={role.label} />;
      }
    },
    {
      title: 'Total',
      dataIndex: 'total_amount',
      render: (val) => Currency.formatRp(val)
    },
    {
      title: 'Shipping',
      dataIndex: 'shipping',
      align: 'center',
      render: (val) => <Image src={shippingImage} alt='shipping' className={style.image} width={72} height={32} />
    },
    {
      title: 'Payment',
      dataIndex: 'payment',
      align: 'center',
      render: (val) => <Image src={paymentImage} alt='payment' className={style.image} width={72} height={32} />
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      render: (val) => {
        const statusMap = {
          PENDING: { label: 'Pending', color: 'error' },
          PROCESSING: { label: 'Processing', color: 'processing' },
          SHIPPED: { label: 'Shipped', color: 'warning' },
          DELIVERED: { label: 'Delivered', color: 'success' },
          CANCELLED: { label: 'Cancelled', color: 'default' },
          RETURNED: { label: 'Returned', color: 'red' }
        };
        const status = statusMap[val] || { label: 'Unknown', color: 'error' };

        return (
          <Tag bordered={false} color={status.color}>
            {status.label}
          </Tag>
        );
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <Space>
          {canView && (
            <Tooltip title='View More' placement='left'>
              <Link href={`/order/detail/${record.id}`}>
                <Button size='small' variant='text' color='default' icon={<ZoomInOutlined />} />
              </Link>
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
      <section id='revenue-section'>
        {/* Filter */}
        <div className='row-container'>
          <RangePicker
            className='custom-range-picker'
            allowClear={false}
            defaultValue={[dayjs(), dayjs()]}
            format='DD MMM YYYY'
            presets={rangePresets}
            value={dateRange}
            onChange={(date) => {
              setDateRange([date ? date[0] : null, date ? date[1] : null]);
            }}
          />
        </div>

        {/* Summary */}
        <Row gutter={[16, 16]} className='row-container'>
          <Col span={24}>
            <CardSummary
              icon={<DollarCircleOutlined />}
              title='Total Revenue'
              value={summary ? summary.totalRevenue : 0}
              percentage={summary ? summary.percentChange : 0}
              traffic={summary ? summary.previousRevenue : 0}
              description={summary ? summary.periodLabel : '-'}
            />
          </Col>
        </Row>

        {/* Filter */}
        <Row gutter={16} className='row-container'>
          <Col lg={6}>
            <RangePicker
              allowClear={false}
              placeholder='Date'
              format='DD MMM YYYY'
              presets={rangePresets}
              value={[
                filters?.start_date ? dayjs(filters.start_date, 'YYYY-MM-DD') : null,
                filters?.end_date ? dayjs(filters.end_date, 'YYYY-MM-DD') : null
              ]}
              onChange={(date) =>
                onFilterChange({
                  start_date: date ? dayjs(date[0]).format('YYYY-MM-DD') : null,
                  end_date: date ? dayjs(date[1]).format('YYYY-MM-DD') : null
                })
              }
            />
          </Col>
          <Col lg={18}>
            <Input
              placeholder='Search.. .'
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
          loading={loading ?? false}
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

export default RevenueLanding;
