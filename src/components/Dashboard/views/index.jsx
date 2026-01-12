// -- libraries
import { useCallback, useState, useRef, useMemo } from 'react';
import { Col, Row, DatePicker, Card, Space, Tooltip, Button, Tag, Table, Avatar, Modal, Badge } from 'antd';
import { useReactToPrint } from 'react-to-print';
import { Line, Pie } from '@ant-design/charts';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/id';

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.locale('id');

import {
  ShopOutlined,
  DollarCircleOutlined,
  EyeOutlined,
  WalletOutlined,
  CodeSandboxOutlined,
  DeliveredProcedureOutlined,
  FileDoneOutlined,
  LineChartOutlined,
  ZoomInOutlined,
  PrinterOutlined,
  ShoppingOutlined,
  RiseOutlined,
  CopyOutlined,
  UserOutlined
} from '@ant-design/icons';

// -- styles
import style from '@components/Dashboard/styles/style.module.scss';

// -- utils
import Currency from '@utils/currency';

// -- elements
import CardSummary from '@components/Elements/CardSummary/views';

// -- components
import PrintLabel, { getPaymentLogo, getShippingLogo } from '@components/Order/Landing/views/print';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';

// --- Helper mapping functions
const convertWidgetOrder = (raw) => {
  const orders = raw?.data?.order ?? raw?.order ?? [];
  if (!Array.isArray(orders) || orders.length === 0) return [];

  const findByLabel = (label) => orders.find((o) => o.label?.toLowerCase().includes(label.toLowerCase()));

  const totalOrder = findByLabel('Total Order');
  const totalRevenue = findByLabel('Total Revenue');
  const totalVisitor = findByLabel('Total Visitors');

  const base = {
    order: {
      total: totalOrder?.total ?? 0,
      percentage_change: totalOrder?.percentChange ?? totalOrder?.percentage_change ?? 0
    },
    revenue: {
      total: totalRevenue?.total ?? 0,
      percentage_change: totalRevenue?.percentChange ?? totalRevenue?.percentage_change ?? 0
    },
    visitor: {
      total: totalVisitor?.total ?? 0,
      percentage_change: totalVisitor?.percentChange ?? totalVisitor?.percentage_change ?? 0
    },
    payment: { total: 0, percentage_change: 0 },
    packaging: { total: 0, percentage_change: 0 },
    shipping: { total: 0, percentage_change: 0 },
    delivered: { total: 0, percentage_change: 0 },
    label: totalOrder?.periodLabel ?? totalRevenue?.periodLabel ?? totalVisitor?.periodLabel ?? '1 days'
  };

  return [base];
};

const convertWeeklyOrders = (raw) => {
  const labels = raw?.data?.labels ?? raw?.labels ?? [];
  const orders = raw?.data?.series?.orders ?? raw?.series?.orders ?? [];
  const revenue = raw?.data?.series?.revenue ?? raw?.series?.revenue ?? [];
  const visitors = raw?.data?.series?.visitors ?? raw?.series?.visitors ?? [];

  if (!Array.isArray(labels) || labels.length === 0) return [];

  return labels.map((label, idx) => ({
    label,
    Order: { value: orders[idx] ?? 0 },
    Revenue: { value: revenue[idx] ?? 0 },
    Visitor: { value: visitors[idx] ?? 0 }
  }));
};

const convertRecentOrders = (raw) => {
  const rows = raw?.data ?? raw ?? [];
  if (!Array.isArray(rows) || rows.length === 0) return [];

  return rows.map((r) => ({
    id: r.id,
    created_at: r.created_at,
    order_code: r.order_code,
    total_amount: r.total_amount,
    customer: r.customer,
    shipments: r.shipments,
    payments: r.payments,
    status: r.status,
    items: r.items,
    shipping_address: r.shipping_address
  }));
};

const convertTopProduct = (raw) => {
  const rows = raw?.data ?? raw ?? [];
  if (!Array.isArray(rows) || rows.length === 0) return [];

  return rows.map((r) => ({
    id: r.product?.id,
    image: r.product?.image1,
    name: r.product?.name ?? '-',
    total_item: r.total_quantity ?? 0,
    total: r.total_revenue ?? 0
  }));
};

const convertTopPage = (raw) => {
  const rows = raw?.data ?? raw ?? [];
  if (!Array.isArray(rows) || rows.length === 0) return [];

  return rows.map((r) => ({
    id: r.id,
    name: r.page_name ?? '-',
    total: r.views ?? 0
  }));
};

const convertTopMember = (raw) => {
  const rows = raw?.data ?? raw ?? [];
  if (!Array.isArray(rows) || rows.length === 0) return [];

  return rows.map((r, idx) => ({
    key: `member${r.customer_id ?? idx}`,
    id: r.customer_id ?? idx,
    name: r.customer?.name ?? '-',
    points: r.points ?? 0,
    total_order: r.orders_count ?? 0,
    total_spending: r.total_spent ?? 0
  }));
};

const convertTopDealer = (raw) => {
  const rows = raw?.data ?? raw ?? [];
  if (!Array.isArray(rows) || rows.length === 0) return [];

  return rows.map((r, idx) => ({
    key: `dealer${r.customer_id ?? idx}`,
    id: r.customer_id ?? idx,
    name: r.customer?.name ?? '-',
    voucher: r.voucher ?? 0,
    total_order: r.orders_count ?? 0,
    total_spending: r.total_spent ?? 0
  }));
};

const convertChartCustomer = (raw) => {
  // Accepts either an object like { guest: 120, member: 120, dealer: 240 }
  // or already an array [{ type, value }]
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  const guest = raw.guest ?? 0;
  const member = raw.member ?? 0;
  const dealer = raw.dealer ?? 0;

  return [
    { type: 'Guest', value: guest },
    { type: 'Member', value: member },
    { type: 'Dealer', value: dealer }
  ];
};

const rangePresets = [
  { label: 'Today', value: [dayjs(), dayjs().endOf('day')] },
  { label: 'Last 7 Days', value: [dayjs().subtract(6, 'day'), dayjs()] },
  { label: 'Last 14 Days', value: [dayjs().subtract(13, 'day'), dayjs()] },
  { label: 'Last 30 Days', value: [dayjs().subtract(29, 'day'), dayjs()] },
  { label: 'Last 90 Days', value: [dayjs().subtract(89, 'day'), dayjs()] }
];

const DashboardView = (props) => {
  const {
    widgetOrderData,
    chartWeeklyData,
    recentOrderData,
    topMemberData,
    topDealerData,
    topProductData,
    topPageData,
    chartCustomerData,
    dateRange,
    setDateRange
  } = props;

  const { RangePicker } = DatePicker;
  const { contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();

  // Modal state for print
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [printData, setPrintData] = useState(null);
  const printRef = useRef(null);

  // Print handler
  const handlePrint = useCallback((record) => {
    setPrintData(record);
    setPrintModalOpen(true);
  }, []);

  // Setup react-to-print
  const handlePrintAction = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Order-${printData?.order_code || 'label'}`,
    onBeforePrint: () => Promise.resolve(),
    onAfterPrint: () => {
      notify({
        type: 'success',
        message: 'Print completed successfully'
      });
    },
    onPrintError: (errorLocation, error) => {
      console.error('Print error:', errorLocation, error);
      notify({
        type: 'error',
        message: 'Failed to print.  Please try again.'
      });
    }
  });

  // Trigger print
  const triggerPrint = useCallback(() => {
    setTimeout(() => {
      if (printRef.current) {
        handlePrintAction();
      } else {
        notify({
          type: 'error',
          message: 'Print content is not ready.  Please try again.'
        });
      }
    }, 100);
  }, [handlePrintAction, notify]);

  const widgetOrder = useMemo(() => {
    if (Array.isArray(widgetOrderData)) return widgetOrderData;
    if (widgetOrderData && (widgetOrderData.data || widgetOrderData.order)) return convertWidgetOrder(widgetOrderData);
    return [];
  }, [widgetOrderData]);

  const weeklyChart = useMemo(() => {
    if (Array.isArray(chartWeeklyData)) return chartWeeklyData;
    if (chartWeeklyData && (chartWeeklyData.data || chartWeeklyData.labels || chartWeeklyData.series))
      return convertWeeklyOrders(chartWeeklyData);
    return [];
  }, [chartWeeklyData]);

  const recentOrders = useMemo(() => {
    if (Array.isArray(recentOrderData)) return convertRecentOrders({ data: recentOrderData });
    if (recentOrderData && (recentOrderData.data || Array.isArray(recentOrderData)))
      return convertRecentOrders(recentOrderData);
    return [];
  }, [recentOrderData]);

  const topMembers = useMemo(() => {
    if (Array.isArray(topMemberData)) return convertTopMember({ data: topMemberData });
    if (topMemberData && (topMemberData.data || Array.isArray(topMemberData))) return convertTopMember(topMemberData);
    return [];
  }, [topMemberData]);

  const topDealers = useMemo(() => {
    if (Array.isArray(topDealerData)) return convertTopDealer({ data: topDealerData });
    if (topDealerData && (topDealerData.data || Array.isArray(topDealerData))) return convertTopDealer(topDealerData);
    return [];
  }, [topDealerData]);

  const topProducts = useMemo(() => {
    if (Array.isArray(topProductData)) return convertTopProduct({ data: topProductData });
    if (topProductData && (topProductData.data || Array.isArray(topProductData)))
      return convertTopProduct(topProductData);
    return [];
  }, [topProductData]);

  const topPages = useMemo(() => {
    if (Array.isArray(topPageData)) return convertTopPage({ data: topPageData });
    if (topPageData && (topPageData.data || Array.isArray(topPageData))) return convertTopPage(topPageData);
    return [];
  }, [topPageData]);

  const chartCustomer = useMemo(() => {
    if (!chartCustomerData) return [];
    return convertChartCustomer(chartCustomerData);
  }, [chartCustomerData]);

  const transformSummaryData = useCallback((summary) => {
    if (!summary || (Array.isArray(summary) && summary.length === 0)) return [];

    const item = Array.isArray(summary) ? summary[0] : summary;
    if (!item) return [];

    const label = item.label || '';

    const keys = [
      { key: 'order', icon: <ShopOutlined />, title: 'Total Order', lg: 12, xl: 8 },
      { key: 'revenue', icon: <DollarCircleOutlined />, title: 'Total Revenue', lg: 12, xl: 8 },
      { key: 'visitor', icon: <EyeOutlined />, title: 'Total Visitor', lg: 24, xl: 8 },
      { key: 'payment', icon: <WalletOutlined />, title: 'Payment', lg: 6, xl: 6 },
      { key: 'packaging', icon: <CodeSandboxOutlined />, title: 'Packaging', lg: 6, xl: 6 },
      { key: 'shipping', icon: <DeliveredProcedureOutlined />, title: 'Shipping', lg: 6, xl: 6 },
      { key: 'delivered', icon: <FileDoneOutlined />, title: 'Delivered', lg: 6, xl: 6 }
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

      if (['order', 'revenue', 'visitor'].includes(entry.key)) {
        return {
          ...baseData,
          description: `From the last ${label}`,
          percentage: Math.abs(value.percentage_change ?? 0),
          traffic: (value.percentage_change ?? 0) >= 0
        };
      }
      return baseData;
    });
  }, []);

  const summaryCards = useMemo(() => transformSummaryData(widgetOrder), [widgetOrder, transformSummaryData]);

  return (
    <>
      {confirmHolder}
      {notificationHolder}
      <section id='dashboard-section'>
        {/* Filter */}
        <div className='row-container'>
          <RangePicker
            allowClear={false}
            value={dateRange || [dayjs(), dayjs()]}
            onChange={(dates) => setDateRange?.(dates)}
            format='DD MMM YYYY'
            presets={rangePresets}
          />
        </div>

        {/* Summary */}
        <Row gutter={[16, 16]} className='row-container'>
          {summaryCards.map((val, idx) => (
            <Col lg={val.lg} xl={val.xl} key={`summ-${idx}`}>
              <CardSummary {...val} />
            </Col>
          ))}
        </Row>

        {/* Chart + Customer */}
        <Row gutter={[16, 16]} className='row-container'>
          <Col xs={24} lg={16}>
            <ChartLine data={weeklyChart} />
          </Col>
          <Col xs={24} lg={8}>
            <ChartCustomer data={chartCustomer} />
          </Col>
        </Row>

        {/* Recent Order */}
        <div className='row-container'>
          <RecentOrder data={recentOrders} handlePrint={handlePrint} />
        </div>

        <Row gutter={[16, 16]} className='row-container'>
          {/* Top Member */}
          <Col span={12}>
            <TopMember data={topMembers} />
          </Col>
          {/* Top Dealer */}
          <Col span={12}>
            <TopDealer data={topDealers} />
          </Col>
        </Row>

        <Row gutter={[16, 16]} className='row-container'>
          {/* Top Product */}
          <Col span={12}>
            <TopProduct data={topProducts} />
          </Col>
          {/* Pages */}
          <Col span={12}>
            <Pages data={topPages} />
          </Col>
        </Row>
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
        width={560}
        destroyOnHidden>
        <div ref={printRef}>
          <PrintLabel data={printData} />
        </div>
      </Modal>
    </>
  );
};

// - ChartLine
const ChartLine = ({ data }) => {
  const CATEGORY_MAP = useMemo(
    () => [
      { key: 'Order', label: 'Order', color: '#0a0a0a' },
      { key: 'Revenue', label: 'Revenue', color: '#871518' },
      { key: 'Visitor', label: 'Visitor', color: '#065074' }
    ],
    []
  );

  const flattenChartData = useCallback(
    (data) =>
      data?.flatMap((item) =>
        CATEGORY_MAP.map((cat) => ({
          label: item.label,
          value: item[cat.key]?.value || 0,
          percentage_change: item[cat.key]?.percentage_change,
          category: cat.label
        }))
      ) ?? [],
    [CATEGORY_MAP]
  );

  const chartData = useMemo(() => (Array.isArray(data) ? flattenChartData(data) : []), [data, flattenChartData]);

  const labelTotals = useMemo(() => {
    const totals = {};
    data?.forEach((item) => {
      totals[item.label] = CATEGORY_MAP.reduce((sum, cat) => sum + (item[cat.key]?.value || 0), 0) || 1;
    });
    return totals;
  }, [data, CATEGORY_MAP]);

  const dataChart = useMemo(
    () =>
      chartData.map((item) => ({
        ...item,
        percentage: (item.value / (labelTotals[item.label] || 1)) * 100
      })),
    [chartData, labelTotals]
  );

  const totalLabels = Array.isArray(data) ? data.length : 0;

  const configChartLine = useMemo(
    () => ({
      data: dataChart,
      xField: 'label',
      yField: 'percentage',
      colorField: 'category',
      legend: false,
      shapeField: 'smooth',
      scale: {
        color: {
          domain: CATEGORY_MAP.map((c) => c.label),
          range: CATEGORY_MAP.map((c) => c.color)
        }
      },
      style: {
        lineWidth: 2
      },
      axis: {
        x: {
          labelFormatter: (label, index) => {
            if (dayjs(label).isValid()) {
              if (totalLabels >= 32) {
                return index % 2 === 0 || index === totalLabels - 1 ? dayjs(label).locale('en').format('D MMM') : '';
              }
              return dayjs(label).locale('en').format('D MMM');
            }
            return label;
          }
        },
        y: {
          labelFormatter: (v) => `${v}%`
        }
      },
      tooltip: {
        shared: true,
        title: false,
        items: [
          (datum) => ({
            name: datum.category,
            value:
              datum.value > 0
                ? ['Order', 'Revenue'].includes(datum.category)
                  ? Currency.formatRp(datum.value)
                  : datum.value
                : 0
          })
        ]
      }
    }),
    [dataChart, CATEGORY_MAP, totalLabels]
  );

  return (
    <Card className={style.chart}>
      <div className={style.cardHead}>
        <p className={style.cardTitle}>
          <LineChartOutlined />
          <span>Order, Revenue, Visitor</span>
        </p>
      </div>
      <Line {...configChartLine} className={style.chartLineCanvas} />
    </Card>
  );
};

// - ChartCustomer (donut chart with small legend)
const ChartCustomer = ({ data }) => {
  const COLORS = ['#0f9d58', '#f6a623', '#1890ff']; // Guest (green), Member (orange), Dealer (blue)

  const pieData = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const total = useMemo(() => pieData.reduce((s, d) => s + (d.value || 0), 0), [pieData]);

  const configPie = useMemo(
    () => ({
      appendPadding: 8,
      data: pieData,
      angleField: 'value',
      colorField: 'type',
      radius: 1,
      innerRadius: 0.7,
      legend: false,
      tooltip: {
        showTitle: false,
        formatter: (datum) => ({
          name: datum.type,
          value: datum.value
        })
      },
      label: false,
      interactions: [{ type: 'element-active' }],
      color: ['#0f9d58', '#f6a623', '#1890ff'],
      statistic: {
        title: false,
        content: {
          style: { fontSize: 18, lineHeight: 1, color: '#262626', fontWeight: 600 },
          formatter: () => (total || 0).toString()
        }
      }
    }),
    [pieData, total]
  );

  return (
    <Card className={style.card}>
      <div className={style.cardHead}>
        <p className={style.cardTitle}>
          <UserOutlined />
          <span>Customer</span>
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: '0 0 140px' }}>
          {(pieData || []).map((item, idx) => {
            const color = COLORS[idx] ?? '#ccc';
            return (
              <div
                key={item.type}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                  gap: 8
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 36, textAlign: 'right', fontWeight: 600 }}>{item.value}</div>
                  <div style={{ width: 8, height: 8, background: color, borderRadius: 4 }} />
                  <div style={{ color: '#6b6b6b' }}>{item.type}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <Pie {...configPie} />
        </div>
      </div>
    </Card>
  );
};

// - Recent Order with Print Integration (Updated to match Order Landing)
const RecentOrder = ({ data, handlePrint }) => {
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
            <Tooltip title='View Details'>
              <Link href={`/order/detail/${record.id}`}>
                <Button size='small' type='text' icon={<ZoomInOutlined />} />
              </Link>
            </Tooltip>
            <Tooltip title='Print Label'>
              <Button size='small' type='text' icon={<PrinterOutlined />} onClick={() => handlePrint(record)} />
            </Tooltip>
          </Space>
        )
      }
    ],
    [handlePrint]
  );

  return (
    <Card className={style.card}>
      <Table
        title={() => (
          <p className={style.cardTitle}>
            <ShopOutlined />
            <span>Recent Order</span>
          </p>
        )}
        columns={dataColumns}
        dataSource={data ?? []}
        rowKey='id'
        pagination={false}
      />
    </Card>
  );
};

// - Top Member
const TopMember = ({ data }) => {
  const dataSource = useMemo(
    () =>
      (data ?? []).map((d, idx) => ({
        key: d.key ?? d.id ?? idx,
        index: idx + 1,
        name: d.name,
        points: d.points ?? 0,
        total_order: d.total_order ?? 0,
        total_spending: d.total_spending ?? 0
      })),
    [data]
  );

  const columns = useMemo(
    () => [
      {
        title: '#',
        dataIndex: 'index',
        key: 'index',
        align: 'center',
        width: 48
      },
      {
        title: 'Full Name',
        dataIndex: 'name',
        key: 'name',
        render: (val) => (
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar size={24} icon={<UserOutlined />} />
            <span>{val}</span>
          </span>
        )
      },
      {
        title: 'Points',
        dataIndex: 'points',
        key: 'points',
        align: 'center',
        width: 80
      },
      {
        title: 'Total Order',
        dataIndex: 'total_order',
        key: 'total_order',
        align: 'center',
        width: 120
      },
      {
        title: 'Total Spending',
        dataIndex: 'total_spending',
        key: 'total_spending',
        align: 'center',
        width: 160,
        render: (val) => Currency.formatRp(val)
      }
    ],
    []
  );

  return (
    <Card className={style.card}>
      <Table
        title={() => (
          <p className={style.cardTitle}>
            <UserOutlined />
            <span>Top Member</span>
          </p>
        )}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey='key'
        size='middle'
      />
    </Card>
  );
};

// - Top Dealer
const TopDealer = ({ data }) => {
  const dataSource = useMemo(
    () =>
      (data ?? []).map((d, idx) => ({
        key: d.key ?? d.id ?? idx,
        index: idx + 1,
        name: d.name,
        voucher: d.voucher ?? 0,
        total_order: d.total_order ?? 0,
        total_spending: d.total_spending ?? 0
      })),
    [data]
  );

  const columns = useMemo(
    () => [
      {
        title: '#',
        dataIndex: 'index',
        key: 'index',
        align: 'center',
        width: 48
      },
      {
        title: 'Full Name',
        dataIndex: 'name',
        key: 'name',
        render: (val) => (
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar size={24} icon={<UserOutlined />} />
            <span>{val}</span>
          </span>
        )
      },
      {
        title: 'Voucher',
        dataIndex: 'voucher',
        key: 'voucher',
        align: 'center',
        width: 80
      },
      {
        title: 'Total Order',
        dataIndex: 'total_order',
        key: 'total_order',
        align: 'center',
        width: 120
      },
      {
        title: 'Total Spending',
        dataIndex: 'total_spending',
        key: 'total_spending',
        align: 'center',
        width: 160,
        render: (val) => Currency.formatRp(val)
      }
    ],
    []
  );

  return (
    <Card className={style.card}>
      <Table
        title={() => (
          <p className={style.cardTitle}>
            <UserOutlined />
            <span>Top Dealer</span>
          </p>
        )}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey='key'
        size='middle'
      />
    </Card>
  );
};

// - Top Product
const TopProduct = ({ data }) => {
  const dataSource = useMemo(
    () =>
      (data ?? []).map((d, idx) => ({
        key: d.id ?? idx,
        index: idx + 1,
        image: d.image,
        name: d.name ?? '-',
        total_item: d.total_item ?? 0,
        total: d.total ?? 0
      })),
    [data]
  );

  const columns = useMemo(
    () => [
      {
        title: '#',
        dataIndex: 'index',
        key: 'index',
        align: 'center',
        width: 48
      },
      {
        title: 'Product Name',
        dataIndex: 'name',
        key: 'name',
        render: (val, record) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {record.image ? (
              <Image
                src={record.image}
                alt={val}
                width={32}
                height={32}
                style={{ objectFit: 'cover', borderRadius: 4 }}
              />
            ) : (
              <div style={{ width: 32, height: 32, backgroundColor: '#f0f0f0', borderRadius: 4 }} />
            )}
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{val}</span>
          </div>
        )
      },
      {
        title: 'Sold',
        dataIndex: 'total_item',
        key: 'total_item',
        align: 'center',
        width: 100,
        render: (val) => `${val} Sold`
      },
      {
        title: 'Revenue',
        dataIndex: 'total',
        key: 'total',
        align: 'right',
        width: 140,
        render: (val) => Currency.formatRp(val)
      }
    ],
    []
  );

  return (
    <Card className={style.card}>
      <Table
        title={() => (
          <p className={style.cardTitle}>
            <ShoppingOutlined />
            <span>Top Product</span>
          </p>
        )}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey='key'
        size='middle'
      />
    </Card>
  );
};

// - Pages
const Pages = ({ data }) => {
  const dataSource = useMemo(
    () =>
      (data ?? []).map((d, idx) => ({
        key: d.id ?? idx,
        index: idx + 1,
        name: d.name ?? '-',
        total: d.total ?? 0
      })),
    [data]
  );

  const columns = useMemo(
    () => [
      {
        title: '#',
        dataIndex: 'index',
        key: 'index',
        align: 'center',
        width: 48
      },
      {
        title: 'Page Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'View',
        dataIndex: 'total',
        key: 'total',
        width: 80,
        align: 'center'
      },
      {
        title: '',
        dataIndex: 'icon',
        key: 'icon',
        align: 'right',
        width: 24,
        render: () => <RiseOutlined />
      }
    ],
    []
  );

  return (
    <Card className={style.card}>
      <Table
        title={() => (
          <p className={style.cardTitle}>
            <CopyOutlined />
            <span>Pages</span>
          </p>
        )}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey='key'
        size='middle'
      />
    </Card>
  );
};

export default DashboardView;
