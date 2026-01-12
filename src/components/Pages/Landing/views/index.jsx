// --library
import { useMemo } from 'react';
import { Button, Table, Tooltip, DatePicker } from 'antd';
import Link from 'next/link';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/id';

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.locale('id');

// -- icons
import { EditOutlined, ZoomInOutlined } from '@ant-design/icons';

// -- elements
import CardSummary from '@components/Elements/CardSummary/views';

const PagesLanding = (props) => {
  const { data = [], loading } = props;
  const { RangePicker } = DatePicker;

  // range presets
  const rangePresets = [
    { label: 'Today', value: [dayjs(), dayjs().endOf('day')] },
    { label: 'Last 7 Days', value: [dayjs().add(-6, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-13, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-29, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-89, 'd'), dayjs()] }
  ];

  // columns used for each group's table (no visitor shown)
  const dataColumns = [
    {
      title: 'Pages',
      dataIndex: 'name',
      render: (text) => <div>{text}</div>
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      width: 120,
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          {/* Detail */}
          <Link href={`/pages/${record.alias}`} legacyBehavior>
            <Tooltip title='Detail' placement='top'>
              <Button size='small' type='text' icon={<ZoomInOutlined />} />
            </Tooltip>
          </Link>

          {/* Edit */}

          <Link href={`/pages/${record.alias}/edit`} legacyBehavior>
            <Tooltip title='Edit' placement='top'>
              <Button size='small' type='text' icon={<EditOutlined />} />
            </Tooltip>
          </Link>
        </div>
      )
    }
  ];

  // group order to match design
  const sectionsOrder = [
    'Authentication & Accounts',
    'Shopping & Orders',
    'Company & Information',
    'Styles & Error Pages'
  ];

  // group data by 'group' field
  const grouped = useMemo(() => {
    const map = {};
    data.forEach((it) => {
      const g = it.group || 'Other Pages';
      if (!map[g]) map[g] = [];
      map[g].push(it);
    });
    return map;
  }, [data]);

  const totalItems = useMemo(() => data.length, [data]);

  return (
    <section id='pages-section'>
      {/* Filter */}
      <div className='row-container' style={{ marginBottom: 12 }}>
        <RangePicker allowClear={false} defaultValue={[dayjs(), dayjs()]} format='DD MMM YYYY' presets={rangePresets} />
      </div>

      <div className='row-container' style={{ marginBottom: 16 }}>
        {/* CardSummary left unchanged; pass totalItems as value if you want number */}
        <CardSummary
          title='Total Pages'
          icon={null}
          value={totalItems}
          percentage={0}
          traffic={0}
          description='From the selected range'
        />
      </div>

      {/* Per-group tables */}
      <div>
        {sectionsOrder.map((section) => {
          const items = grouped[section] || [];
          if (!items.length) return null;

          return (
            <div key={section} style={{ marginBottom: 24 }}>
              <div style={{ fontWeight: 700, marginBottom: 16 }}>{section}</div>
              <Table columns={dataColumns} dataSource={items} rowKey='id' loading={loading} pagination={false} />
            </div>
          );
        })}

        {/* render any other groups not in sectionsOrder (optional) */}
        {Object.keys(grouped)
          .filter((g) => !sectionsOrder.includes(g))
          .map((other) => {
            const items = grouped[other] || [];
            if (!items.length) return null;
            return (
              <div key={other} style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>{other}</div>
                <Table
                  columns={dataColumns}
                  dataSource={items}
                  rowKey='id'
                  loading={loading}
                  pagination={false}
                  size='small'
                />
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default PagesLanding;
