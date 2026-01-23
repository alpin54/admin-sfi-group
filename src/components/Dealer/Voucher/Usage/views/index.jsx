// -- libraries
import { Breadcrumb, Table, Row, Col, Input, DatePicker, Badge } from 'antd';
import Link from 'next/link';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/id';

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.locale('id');

// -- icons
import {
  TagOutlined,
  SearchOutlined,
  BookOutlined,
  BarcodeOutlined,
  CalendarOutlined,
  PieChartOutlined,
  IssuesCloseOutlined,
  StockOutlined,
  QuestionOutlined,
  UserSwitchOutlined,
  AppstoreAddOutlined
} from '@ant-design/icons';

// -- elements
import CardSummary from '@components/Elements/CardSummary/views';
import Currency from '@utils/currency';

const VoucherUsage = (props) => {
  const { data, summary, loading, filters, pagination, totalPage, onPageChange, onFilterChange } = props;
  const { RangePicker } = DatePicker;

  // range presets
  const rangePresets = [
    { label: 'Today', value: [dayjs(), dayjs().endOf('day')] },
    { label: 'Last 7 Days', value: [dayjs().add(-6, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-13, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-29, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-89, 'd'), dayjs()] }
  ];

  const dataColumns = [
    {
      title: 'Date',
      dataIndex: 'created_at',
      render: (date) => dayjs(date).format('DD MMMM YYYY, HH:mm')
    },
    {
      title: 'Order Id',
      dataIndex: 'order_code',
      render: (value) => <Link href={`/order/detail/${value}`}>{value}</Link>
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      render: (value) => value?.name || '-'
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
      render: (value) => Currency.formatRp(value)
    },
    {
      title: 'Discount Coupon',
      dataIndex: 'discount',
      render: (value) => Currency.formatRp(value)
    }
  ];

  return (
    <section id='voucher-section'>
      {/* Breadcrumb */}
      <div className='row-container'>
        <Breadcrumb
          items={[
            { title: <Link href='/dealer-setting'>Dealer Setting</Link> },
            {
              title: summary?.name
            }
          ]}
        />
      </div>
      {/* Summary */}
      <Row gutter={[16, 16]} className='row-container'>
        <Col span={12}>
          <CardSummary title='Total Voucher' value={summary?.totalVoucher ?? 0} icon={<TagOutlined />} />
        </Col>
        <Col span={12}>
          <CardSummary title='Total Voucher Usage' value={summary?.totalUses ?? 0} icon={<PieChartOutlined />} />
        </Col>
        <Col span={12}>
          <CardSummary variant='secondary' title='Voucher Name' value={summary?.name} icon={<BookOutlined />} />
        </Col>
        <Col span={12}>
          <CardSummary
            variant='secondary'
            title='Conditions'
            value={summary?.conditions}
            icon={<IssuesCloseOutlined />}
          />
        </Col>
        <Col span={12}>
          <CardSummary variant='secondary' title='Voucher Code' value={summary?.code} icon={<BarcodeOutlined />} />
        </Col>
        <Col span={12}>
          <CardSummary variant='secondary' title='Visibility' value={summary?.visibility} icon={<StockOutlined />} />
        </Col>
        <Col span={12}>
          <CardSummary
            variant='secondary'
            title='Apply Discount To'
            value={summary?.applyDiscountTo}
            icon={<QuestionOutlined />}
          />
        </Col>
        <Col span={12}>
          <CardSummary variant='secondary' title='Type' value={summary?.type} icon={<UserSwitchOutlined />} />
        </Col>
        <Col span={12}>
          <CardSummary
            variant='secondary'
            title='Validity Period'
            value={
              summary?.valid_from && summary?.valid_until
                ? `${dayjs(summary.valid_from).format('DD MMM')} - ${dayjs(summary.valid_until).format('DD MMM YYYY')}`
                : '-'
            }
            icon={<CalendarOutlined />}
          />
        </Col>
        <Col span={12}>
          <CardSummary
            variant='secondary'
            title='Quantity'
            value={summary?.remainingQuantity}
            icon={<AppstoreAddOutlined />}
          />
        </Col>
      </Row>
      {/* Filter */}
      <Row gutter={16} className='row-container'>
        <Col lg={6}>
          <RangePicker
            allowClear={true}
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
  );
};

export default VoucherUsage;
