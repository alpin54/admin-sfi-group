// -- libraries
import { useCallback, useState, useRef, useMemo } from 'react';
import { useReactToPrint } from 'react-to-print';
import {
  Button,
  Table,
  Space,
  Tooltip,
  Row,
  Col,
  Input,
  Select,
  Tag,
  Breadcrumb,
  Card,
  Typography,
  DatePicker,
  Modal
} from 'antd';
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
  PrinterOutlined,
  UserOutlined,
  PhoneOutlined,
  CalendarOutlined,
  MailOutlined,
  EnvironmentOutlined,
  RightOutlined
} from '@ant-design/icons';

// -- image
import pointLogo from '@assets/image/dummy/point-logo.png';

// -- styles
import style from '@components/Member/Detail/styles/style.module.scss';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';

// -- utils
import Currency from '@utils/currency';
import LocalStorage from '@utils/localStorage';

// -- components
import DrawerMemberDetailWidget from '@components/Member/DrawerShipping/widgets/Default';
import PrintLabel, { getPaymentLogo, getShippingLogo } from '@components/Order/Landing/views/print';

// -- elements
import CardSummary from '@components/Elements/CardSummary/views';

const { Text } = Typography;
const { RangePicker } = DatePicker;

const MemberDetail = (props) => {
  const { data, summary, order, loading, filters, pagination, totalPage, onDelete, onPageChange, onFilterChange } =
    props;

  const dataSummary = summary?.[0] ?? {};
  const dataList = order ?? [];
  const user = LocalStorage.get('user');

  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();

  // Drawer state for shipping details
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerRecord, setDrawerRecord] = useState(null);

  // Modal state for print
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [printData, setPrintData] = useState(null);
  const printRef = useRef(null);

  const openShippingDrawer = useCallback((record) => {
    setDrawerRecord(record ?? null);
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setDrawerRecord(null);
  }, []);

  // Print handler
  const handlePrint = useCallback((record) => {
    setPrintData(record);
    setPrintModalOpen(true);
  }, []);

  // Setup react-to-print
  const handlePrintAction = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Order-${printData?.order_code || 'label'}`,
    onBeforePrint: () => {
      console.log('Preparing to print.. .');
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
          message: 'Print content is not ready.  Please try again.'
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

  // Delete handler
  const handleDelete = useCallback(
    (record) => {
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
    [confirm, notify, onDelete, user]
  );

  // Table columns - aligned with order-landing structure
  const dataColumns = useMemo(
    () => [
      {
        title: 'Date',
        dataIndex: 'created_at',
        width: 160,
        render: (val) => dayjs(val).format('DD MMM YYYY HH:mm')
      },
      {
        title: 'Order ID',
        dataIndex: 'order_code',
        render: (val, record) => <Link href={`/order/detail/${record.id}`}>{val}</Link>
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
            <Tooltip title='Delete'>
              <Button size='small' type='text' icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
            </Tooltip>
          </Space>
        )
      }
    ],
    [handlePrint, handleDelete]
  );

  const InfoRow = ({ icon, label, value, image }) => (
    <Row align='middle' className={style.infoRow}>
      <Col flex='20px' className={style.infoIcon}>
        {icon}
      </Col>
      <Col flex='100px' className={style.infoLabel}>
        <Text className={style.infoLabelText}>{label}</Text>
      </Col>
      <Col className={style.infoValue}>
        {image && <Image className={style.infoImg} src={image} alt={label} width={24} height={24} />}
        <Text className={style.infoValueText}>{value}</Text>
      </Col>
    </Row>
  );

  return (
    <>
      {confirmHolder}
      {notificationHolder}

      <section id='member-detail-section' className={style.container}>
        <div className='row-container'>
          <Breadcrumb items={[{ title: <Link href='/member'>Member</Link> }, { title: data?.name }]} />
        </div>

        {/* Top cards:  User Information */}
        <div className='row-container'>
          <Card className={style.card} title='User Information'>
            <Row gutter={[24, 12]}>
              <Col span={12}>
                <InfoRow icon={<UserOutlined />} label='Full Name' value={data?.name ?? '-'} />
              </Col>
              <Col span={12}>
                <InfoRow
                  icon={<CalendarOutlined />}
                  label='Register'
                  value={data?.created_at ? dayjs(data.created_at).format('DD MMM YYYY, HH:mm') : '-'}
                />
              </Col>

              <Col span={12}>
                <InfoRow icon={<PhoneOutlined />} label='Phone Number' value={data?.phone ?? '-'} />
              </Col>
              <Col span={12}>
                <InfoRow icon={<MailOutlined />} label='Email Address' value={data?.email ?? '-'} />
              </Col>

              <Col span={12}>
                <InfoRow icon={<CalendarOutlined />} label='Date of Birth' value={data?.date_of_birth ?? '-'} />
              </Col>
              <Col span={12}>
                <InfoRow icon={<UserOutlined />} label='Gender' value={data?.gender ?? '-'} />
              </Col>
            </Row>
          </Card>
        </div>

        {/* Account & Shipping Details */}
        <Row gutter={[16, 16]} className='row-container'>
          <Col span={24}>
            <Card className={style.card} title='Account & Shipping Details'>
              <Row justify='start' align='middle' gutter={[24, 12]}>
                <Col span={23}>
                  <InfoRow
                    icon={<EnvironmentOutlined />}
                    label='Shipping'
                    value={`${data?.shipping_count ?? 0} Shipping Addresses`}
                  />
                </Col>
                <Col span={1}>
                  <Tooltip title='View addresses'>
                    <Button
                      size='small'
                      type='text'
                      icon={<RightOutlined />}
                      onClick={() => openShippingDrawer(null)}
                      aria-label='open-shipping-account'
                    />
                  </Tooltip>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Summary Cards */}
        <Row gutter={[16, 16]} className='row-container'>
          <Col span={12}>
            <CardSummary title='Total Order' value={dataSummary.order?.total ?? 0} icon={<ShopOutlined />} />
          </Col>

          <Col span={12}>
            <CardSummary
              title='Total Spending'
              value={dataSummary.revenue?.total ?? 0}
              icon={<DollarCircleOutlined />}
            />
          </Col>
        </Row>

        {/* Filter */}
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

        {/* Table */}
        <Row className='row-container'>
          <Col span={24}>
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
          </Col>
        </Row>
      </section>

      {/* Drawer for Shipping details */}
      <DrawerMemberDetailWidget open={drawerOpen} onClose={closeDrawer} initialValues={data} />

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

export default MemberDetail;
