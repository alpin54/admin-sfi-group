// -- libraries
import { Breadcrumb, Table, Row, Col, Input, DatePicker } from 'antd';
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
  TagsOutlined,
  BookOutlined,
  BarcodeOutlined,
  CalendarOutlined
} from '@ant-design/icons';

// -- elements
import CardSummary from '@components/Elements/CardSummary/views';
import Currency from '@utils/currency';

const VoucherUsage = (props) => {
  const { data, loading, filters, pagination, totalPage, onPageChange, onFilterChange } = props;
  const dataSummary = data?.summary;
  const dataList = data?.data;
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
            { title: <Link href='/voucher'>Voucher</Link> },
            {
              title: dataSummary?.name
            }
          ]}
        />
      </div>
      {/* Summary */}
      <Row gutter={[16, 16]} className='row-container'>
        <Col span={8}>
          <CardSummary title='Voucher' value={dataSummary?.name} icon={<BookOutlined />} />
        </Col>
        <Col span={8}>
          <CardSummary title='Code' value={dataSummary?.code} icon={<BarcodeOutlined />} />
        </Col>
        <Col span={8}>
          <CardSummary
            title='Validity Period'
            value={
              dataSummary?.valid_from && dataSummary?.valid_until
                ? `${dayjs(dataSummary.valid_from).format('DD MMM')} - ${dayjs(dataSummary.valid_until).format('DD MMM YYYY')}`
                : '-'
            }
            icon={<CalendarOutlined />}
          />
        </Col>
        <Col span={12}>
          <CardSummary title='Total Voucher' value={dataSummary?.totalVoucher ?? 0} icon={<TagOutlined />} />
        </Col>
        <Col span={12}>
          <CardSummary title='Total Voucher Usage' value={dataSummary?.totalUses ?? 0} icon={<TagsOutlined />} />
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
        dataSource={dataList ?? []}
        rowKey='id'
        loading={loading}
        pagination={
          totalPage > pagination.limit && {
            current: pagination.page,
            pageSize: pagination.limit,
            total: totalPage,
            position: ['bottomCenter'],
            onChange: (page, pageSize) => onPageChange(page, pageSize)
          }
        }
      />
    </section>
  );
};

export default VoucherUsage;
