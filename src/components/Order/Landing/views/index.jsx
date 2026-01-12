// -- libraries
import { useCallback, useState, useRef, useMemo } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button, Table, Space, Tooltip, Row, Col, Input, Select, Tag, DatePicker, Modal, Badge } from 'antd';
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
import {
  DeleteOutlined,
  SearchOutlined,
  ZoomInOutlined,
  ShopOutlined,
  DollarCircleOutlined,
  WalletOutlined,
  CodeSandboxOutlined,
  DeliveredProcedureOutlined,
  FileDoneOutlined,
  PrinterOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';

// -- components
import PrintLabel, { getPaymentLogo, getShippingLogo } from '@components/Order/Landing/views/print';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';
import usePermission from '@hooks/usePermission';

// -- utils
import Currency from '@utils/currency';
import LocalStorage from '@utils/localStorage';

// -- elements
import CardSummary from '@components/Elements/CardSummary/views';

const OrderLanding = (props) => {
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
  const { canView, canDelete } = usePermission('/order'); // Sesuaikan dengan route order Anda

  const dataSummary = summary;
  const dataList = data;
  const user = LocalStorage.get('user');

  // Modal state
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [printData, setPrintData] = useState(null);
  const printRef = useRef(null);

  // Print handler
  const handlePrint = useCallback(
    (record) => {
      if (!canView) {
        notify({
          type: 'error',
          message: 'Permission denied',
          description: 'You do not have permission to print'
        });
        return;
      }
      setPrintData(record);
      setPrintModalOpen(true);
    },
    [canView, notify]
  );

  // Setup react-to-print
  const handlePrintAction = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Order-${printData?.order_code || 'label'}`,
    onBeforePrint: () => {
      console.log('Preparing to print...');
      return Promise.resolve();
    },
    onAfterPrint: () => {
      console.log('Print completed');
      notify({
        type: 'success',
        message: 'Print completed successfully'
      });
    },
    onPrintError: (errorLocation, error) => {
      console.error('Print error:', errorLocation, error);
      notify({
        type: 'error',
        message: 'Failed to print. Please try again.'
      });
    }
  });

  // Trigger print with delay
  const triggerPrint = useCallback(() => {
    setTimeout(() => {
      if (printRef.current) {
        handlePrintAction();
      } else {
        notify({
          type: 'error',
          message: 'Print content is not ready. Please try again.'
        });
      }
    }, 100);
  }, [handlePrintAction, notify]);

  // Range presets
  const rangePresets = useMemo(
    () => [
      { label: 'Today', value: [dayjs(), dayjs().endOf('day')] },
      { label: 'Last 7 Days', value: [dayjs().subtract(6, 'day'), dayjs()] },
      { label: 'Last 14 Days', value: [dayjs().subtract(13, 'day'), dayjs()] },
      { label: 'Last 30 Days', value: [dayjs().subtract(29, 'day'), dayjs()] },
      { label: 'Last 90 Days', value: [dayjs().subtract(89, 'day'), dayjs()] }
    ],
    []
  );

  // Transform summary data
  const transformSummaryData = useCallback((summaryData) => {
    if (!summaryData) return [];

    let d = summaryData;
    if (d.data && typeof d.data === 'object') {
      d = d.data;
    }

    if (typeof d === 'object' && (d.order || d.revenue || d.statuses)) {
      const orderObj = d.order || {};
      const revenueObj = d.revenue || {};
      const statuses = d.statuses || {};

      const orderTotal = Number(orderObj.total ?? 0);
      const revenueTotal = Number(revenueObj.total ?? 0);

      const orderLabel = orderObj.periodLabel || undefined;
      const revenueLabel = revenueObj.periodLabel || undefined;

      const entries = [
        { key: 'order', icon: <ShopOutlined />, title: 'Total Order', value: orderTotal, lg: 12, xl: 12 },
        { key: 'revenue', icon: <DollarCircleOutlined />, title: 'Total Revenue', value: revenueTotal, lg: 12, xl: 12 },
        {
          key: 'payment',
          icon: <WalletOutlined />,
          title: 'Payment',
          value: Number(statuses.PENDING ?? 0),
          lg: 8,
          xl: 5
        },
        {
          key: 'packaging',
          icon: <CodeSandboxOutlined />,
          title: 'Packaging',
          value: Number(statuses.PROCESSING ?? 0),
          lg: 8,
          xl: 5
        },
        {
          key: 'shipping',
          icon: <DeliveredProcedureOutlined />,
          title: 'Shipping',
          value: Number(statuses.SHIPPED ?? 0),
          lg: 8,
          xl: 4
        },
        {
          key: 'delivered',
          icon: <FileDoneOutlined />,
          title: 'Delivered',
          value: Number(statuses.DELIVERED ?? 0),
          lg: 12,
          xl: 5
        },
        {
          key: 'cancelled',
          icon: <CloseCircleOutlined />,
          title: 'Cancelled',
          value: Number(statuses.CANCELLED ?? 0),
          lg: 12,
          xl: 5
        }
      ];

      return entries.map((entry) => {
        const baseData = {
          icon: entry.icon,
          title: entry.title,
          value: entry.value ?? 0,
          lg: entry.lg,
          xl: entry.xl
        };

        if (entry.key === 'order') {
          const percent = Math.abs(Number(orderObj.percentChange ?? orderObj.percentage_change ?? 0));
          const direction = orderObj.direction || (Number(orderObj.percentChange ?? 0) >= 0 ? 'up' : 'down') || 'up';
          return {
            ...baseData,
            description: orderLabel,
            percentage: Number.isNaN(percent) ? 0 : percent,
            traffic: direction !== 'down'
          };
        }

        if (entry.key === 'revenue') {
          const percent = Math.abs(Number(revenueObj.percentChange ?? revenueObj.percentage_change ?? 0));
          const direction =
            revenueObj.direction || (Number(revenueObj.percentChange ?? 0) >= 0 ? 'up' : 'down') || 'up';
          return {
            ...baseData,
            description: revenueLabel,
            percentage: Number.isNaN(percent) ? 0 : percent,
            traffic: direction !== 'down'
          };
        }

        return baseData;
      });
    }

    if (Array.isArray(summaryData) && summaryData.length > 0) {
      const item = summaryData[0];
      const itemLabel = item.label || '';

      const keys = [
        { key: 'order', icon: <ShopOutlined />, title: 'Total Order', lg: 12, xl: 12 },
        { key: 'revenue', icon: <DollarCircleOutlined />, title: 'Total Revenue', lg: 12, xl: 12 },
        { key: 'payment', icon: <WalletOutlined />, title: 'Payment', lg: 8, xl: 5 },
        { key: 'packaging', icon: <CodeSandboxOutlined />, title: 'Packaging', lg: 8, xl: 5 },
        { key: 'shipping', icon: <DeliveredProcedureOutlined />, title: 'Shipping', lg: 8, xl: 4 },
        { key: 'delivered', icon: <FileDoneOutlined />, title: 'Delivered', lg: 12, xl: 5 },
        { key: 'cancelled', icon: <CloseCircleOutlined />, title: 'Cancelled', lg: 12, xl: 5 }
      ];

      return keys.map((entry) => {
        const value = item[entry.key] ?? { total: 0, percentage_change: 0 };
        const baseData = {
          icon: entry.icon,
          title: entry.title,
          value: value.total ?? 0,
          lg: entry.lg,
          xl: entry.xl
        };

        if (['order', 'revenue'].includes(entry.key)) {
          return {
            ...baseData,
            description: itemLabel || undefined,
            percentage: Math.abs(value.percentage_change ?? 0),
            traffic: (value.percentage_change ?? 0) >= 0
          };
        }
        return baseData;
      });
    }

    return [];
  }, []);

  // Memoize summary data
  const summaryCards = useMemo(() => transformSummaryData(dataSummary), [dataSummary, transformSummaryData]);

  // Delete handler
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
        title: 'Delete Order',
        icon: <DeleteOutlined style={{ color: 'red' }} />,
        content: `Are you sure you want to delete order ${record.order_code}? `,
        onSuccess: async () => {
          try {
            const payload = { id: record.id, deleted_by: user?.id };
            await onDelete(payload);
            notify({
              type: 'success',
              message: 'Order deleted successfully'
            });
          } catch (error) {
            notify({
              type: 'error',
              message: 'Failed to delete order'
            });
          }
        }
      });
    },
    [confirm, notify, onDelete, user, canDelete]
  );

  // Table columns
  const dataColumns = useMemo(
    () => [
      {
        title: 'Date',
        dataIndex: 'created_at',
        width: 180,
        render: (val) => dayjs(val).format('DD MMM YYYY HH:mm')
      },
      {
        title: 'Order ID',
        dataIndex: 'order_code',
        render: (val, record) => <Link href={`/order/detail/${record.id}`}>{val}</Link>
      },
      {
        title: 'Customer',
        dataIndex: 'customer',
        width: 180,
        render: (customer) => customer?.name || '-'
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
        dataIndex: 'shipments',
        align: 'center',
        render: (shipments) => {
          const logo = getShippingLogo(shipments);
          return logo ? <Image src={logo} alt='shipping' width={72} height={32} style={{ objectFit: 'cover' }} /> : '-';
        }
      },
      {
        title: 'Payment',
        dataIndex: 'payments',
        align: 'center',
        render: (payments) => {
          const logo = getPaymentLogo(payments);
          return logo ? <Image src={logo} alt='payment' width={72} height={32} style={{ objectFit: 'cover' }} /> : '-';
        }
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
              <Tooltip title='View Details'>
                <Link href={`/order/detail/${record.id}`}>
                  <Button size='small' type='text' icon={<ZoomInOutlined />} />
                </Link>
              </Tooltip>
            )}
            {canView && (
              <Tooltip title='Print Label'>
                <Button size='small' type='text' icon={<PrinterOutlined />} onClick={() => handlePrint(record)} />
              </Tooltip>
            )}
            {canDelete && (
              <Tooltip title='Delete'>
                <Button size='small' type='text' icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
              </Tooltip>
            )}
          </Space>
        )
      }
    ],
    [handlePrint, handleDelete, canView, canDelete]
  );

  return (
    <>
      {confirmHolder}
      {notificationHolder}
      <section id='order-section'>
        {/* Summary Date Filter */}
        <div className='row-container'>
          <RangePicker
            allowClear={false}
            defaultValue={[dayjs(), dayjs()]}
            format='DD MMM YYYY'
            presets={rangePresets}
            value={dateRange}
            onChange={(dates) => setDateRange(dates ? [dates[0], dates[1]] : [null, null])}
          />
        </div>

        {/* Summary Cards */}
        <Row gutter={[16, 16]} className='row-container'>
          {summaryCards.map((val, idx) => (
            <Col xl={val.xl} lg={val.lg} key={`summary-${idx}`}>
              <CardSummary {...val} />
            </Col>
          ))}
        </Row>

        {/* Filters */}
        <Row gutter={16} className='row-container'>
          <Col lg={6} md={12} xs={24}>
            <RangePicker
              allowClear
              placeholder={['Start Date', 'End Date']}
              format='DD MMM YYYY'
              presets={rangePresets}
              style={{ width: '100%' }}
              value={[
                filters?.start_date ? dayjs(filters.start_date, 'YYYY-MM-DD') : null,
                filters?.end_date ? dayjs(filters.end_date, 'YYYY-MM-DD') : null
              ]}
              onChange={(dates) =>
                onFilterChange({
                  start_date: dates?.[0] ? dayjs(dates[0]).format('YYYY-MM-DD') : null,
                  end_date: dates?.[1] ? dayjs(dates[1]).format('YYYY-MM-DD') : null
                })
              }
            />
          </Col>
          <Col lg={6} md={12} xs={24}>
            <Select
              showSearch
              allowClear
              placeholder='Status'
              optionFilterProp='label'
              style={{ width: '100%' }}
              options={[
                { label: 'Pending', value: 'PENDING' },
                { label: 'Processing', value: 'PROCESSING' },
                { label: 'Shipped', value: 'SHIPPED' },
                { label: 'Delivered', value: 'DELIVERED' },
                { label: 'Cancelled', value: 'CANCELLED' },
                { label: 'Returned', value: 'RETURNED' }
              ]}
              value={filters?.status}
              onChange={(value) => onFilterChange({ status: value })}
            />
          </Col>
          <Col lg={12} md={24} xs={24}>
            <Input
              placeholder='Search.. .'
              suffix={<SearchOutlined />}
              allowClear
              value={filters?.keyword}
              onChange={(e) => onFilterChange({ keyword: e.target.value })}
            />
          </Col>
        </Row>

        {/* Orders Table */}
        <Table
          columns={dataColumns}
          dataSource={dataList ?? []}
          rowKey='id'
          loading={loading ?? false}
          pagination={
            totalPage > pagination.limit && {
              current: pagination.page,
              pageSize: pagination.limit,
              total: totalPage,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50', '100'],
              onChange: onPageChange
            }
          }
        />
      </section>

      {/* Print Modal */}
      <Modal
        open={printModalOpen}
        onCancel={() => setPrintModalOpen(false)}
        title={`Print Label - ${printData?.order_code || ''}`}
        footer={[
          <Button key='cancel' onClick={() => setPrintModalOpen(false)}>
            Close
          </Button>,
          <Button key='print' type='primary' icon={<PrinterOutlined />} onClick={triggerPrint}>
            Print
          </Button>
        ]}
        centered
        width={560}>
        <div ref={printRef}>
          <PrintLabel data={printData} />
        </div>
      </Modal>
    </>
  );
};

export default OrderLanding;
