// -- libraries
import { useCallback } from 'react';
import { Button, Table, Space, Tooltip, Row, Col, Input, Select, DatePicker } from 'antd';
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
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  ZoomInOutlined,
  TagOutlined,
  TagsOutlined,
  BarChartOutlined
} from '@ant-design/icons';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';
import usePermission from '@hooks/usePermission';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- elements
import CardSummary from '@components/Elements/CardSummary/views';

const VoucherLanding = (props) => {
  const { data, summary, loading, filters, pagination, totalPage, onDelete, onSuspend, onPageChange, onFilterChange } =
    props;

  // Hooks
  const { RangePicker } = DatePicker;
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();
  const { canView, canCreate, canEdit, canDelete } = usePermission('/voucher');
  const user = LocalStorage.get('user');
  const dataSummary = summary;
  const dataList = data;

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

    const item = summary[0];

    const keys = [
      { key: 'total_voucher', icon: <TagOutlined />, title: 'Total Voucher' },
      { key: 'total_voucher_usage', icon: <TagsOutlined />, title: 'Total Voucher Usage' }
    ];

    return keys.map((entry) => {
      return {
        icon: entry.icon,
        title: entry.title,
        value: item[entry.key].total ?? 0
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

      confirm({
        title: 'Delete',
        icon: <DeleteOutlined style={{ color: 'red' }} />,
        content: `Are you sure you want to delete ${record.name.toLocaleLowerCase()}?`,
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
          message: 'Permission denied',
          description: 'You do not have permission to suspend/unsuspend'
        });
        return;
      }

      const title = record.status ? 'Suspend' : 'Unsuspend';
      const suspend = record.status ? false : true;
      const payload = { id: record.id, status: suspend, updated_by: user.id };

      confirm({
        title: title,
        icon: record.status ? <EyeOutlined /> : <EyeInvisibleOutlined />,
        content: `Are you sure you want to ${title.toLowerCase()} ${record.name.toLocaleLowerCase()}?`,
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
      title: 'Voucher',
      dataIndex: 'name'
    },
    {
      title: 'Validity Period',
      dataIndex: 'valid_from',
      render: (valid_from, record) => {
        if (!valid_from || !record.valid_until) return '-';
        const startDate = dayjs(valid_from, 'YYYY-MM-DD HH:mm:ss.SSS');
        const endDate = dayjs(record.valid_until, 'YYYY-MM-DD HH:mm:ss.SSS');
        return `${startDate.format('DD MMM YYYY')} - ${endDate.format('DD MMM YYYY')}`;
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, record) => {
        const isAfterStart =
          !record.valid_from || dayjs().isAfter(dayjs(record.valid_from, 'YYYY-MM-DD HH: mm:ss.SSS'));
        const isBeforeEnd =
          !record.valid_until || dayjs().isBefore(dayjs(record.valid_until, 'YYYY-MM-DD HH:mm:ss.SSS'));
        return isAfterStart && isBeforeEnd ? 'Active' : 'Expired';
      }
    },
    {
      title: 'Usage',
      dataIndex: 'issued'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      width: 80,
      render: (_, record) => (
        <Space>
          {canView && (
            <Tooltip title='View Usage' placement='left'>
              <Link href={`/voucher/usage/${record.id}`}>
                <Button size='small' variant='text' color='default' icon={<BarChartOutlined />} />
              </Link>
            </Tooltip>
          )}
          {canView && (
            <Tooltip title='View More' placement='left'>
              <Link href={`/voucher/detail/${record.id}`}>
                <Button size='small' variant='text' color='default' icon={<ZoomInOutlined />} />
              </Link>
            </Tooltip>
          )}
          {canEdit && (
            <Tooltip title='Edit' placement='left'>
              <Link href={`/voucher/edit/${record.id}`}>
                <Button size='small' variant='text' color='default' icon={<EditOutlined />} />
              </Link>
            </Tooltip>
          )}
          {canEdit && (
            <Tooltip title={record.status ? 'Suspend' : 'Unsuspend'} placement='left'>
              <Button
                size='small'
                variant='text'
                color='default'
                icon={record.status ? <EyeOutlined /> : <EyeInvisibleOutlined />}
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
      <section id='voucher-section'>
        {/* Summary */}
        <Row gutter={[16, 16]} className='row-container'>
          {transformSummaryData(dataSummary).map((val, idx) => (
            <Col span={12} key={`summ-${idx}`}>
              <CardSummary {...val} />
            </Col>
          ))}
        </Row>

        {/* Filter */}
        <Row gutter={16} className='row-container'>
          {canCreate && (
            <Col span={4}>
              <Link href='/voucher/add'>
                <Button type='primary' block>
                  Add voucher
                </Button>
              </Link>
            </Col>
          )}
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
          <Col lg={6}>
            <Select
              showSearch
              allowClear
              placeholder='Status'
              optionFilterProp='label'
              options={[
                { label: 'Active', value: 1 },
                { label: 'Expired', value: 0 }
              ]}
              value={filters?.status}
              onChange={(value) => onFilterChange({ status: value })}
            />
          </Col>
          <Col lg={8}>
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

export default VoucherLanding;
