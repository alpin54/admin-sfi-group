// -- libraries
import { Table, Row, Col, Select, DatePicker } from 'antd';
import Image from 'next/image';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/id';

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.locale('id');

// -- style
import style from '@components/Admin/Landing/styles/style.module.scss';
import { render } from 'sass';

const UserLog = (props) => {
  const {
    roleOptions,
    data,
    loading,
    pagination,
    filters,
    totalPage,
    dateRange,
    setDateRange,
    onPageChange,
    onFilterChange
  } = props;
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
    { dataIndex: 'created_at', align: 'right', render: (value) => dayjs(value).format('DD MMM YYYY, HH:mm') }
  ];

  return (
    <>
      <section id='user-log-section'>
        {/* Filter */}
        <Row gutter={[16, 16]} className='row-container'>
          <Col span={8}>
            <RangePicker
              allowClear={false}
              defaultValue={[dayjs(), dayjs()]}
              format='DD MMM YYYY'
              presets={rangePresets}
              value={dateRange}
              onChange={(date) => {
                setDateRange([date ? date[0] : null, date ? date[1] : null]);
              }}
            />
          </Col>
          <Col span={5}>
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
        </Row>

        {/* Table */}
        <Table
          showHeader={false}
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

export default UserLog;
