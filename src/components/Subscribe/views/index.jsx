// -- libraries
import { useCallback } from 'react';
import { Button, Table, Space, Tooltip, Row, Col, Input, DatePicker } from 'antd';
import dayjs from 'dayjs';

// -- icons
import { SearchOutlined, BookOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';
import usePermission from '@hooks/usePermission';

// -- elements
import CardSummary from '@components/Elements/CardSummary/views';
import CardUserLogWidget from '@components/Elements/CardUserLog/views';

const SubscribeView = ({
  data,
  summary,
  loading,
  filters,
  pagination,
  totalPage,
  onPageChange,
  onFilterChange,
  onDelete,
  onDownload
}) => {
  // Hooks
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();
  const { canView, canCreate, canDelete } = usePermission('/subscribe'); // Sesuaikan dengan route Anda
  const { RangePicker } = DatePicker;

  const rangePresets = [
    { label: 'Today', value: [dayjs(), dayjs().endOf('day')] },
    { label: 'Last 7 Days', value: [dayjs().add(-6, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-13, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-29, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-89, 'd'), dayjs()] }
  ];

  const transformSummaryData = (summaryInput) => {
    const items = summaryInput?.data?.subscriberItems || summaryInput?.subscriberItems || [];
    return items.map((item, index) => ({
      icon: <BookOutlined />,
      title: item.label,
      value: item.total,
      description: item.periodLabel,
      percentage: Math.abs(item.percentChange),
      traffic: item.percentChange >= 0,
      lg: 24,
      xl: 24
    }));
  };

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
        icon: <DeleteOutlined />,
        content: `Are you sure you want to delete ${record.email.toLowerCase()}?`,
        onSuccess: async () => {
          notify({ type: 'success', message: 'Data deleted successfully' });
          await onDelete(record.id);
        }
      });
    },
    [confirm, notify, onDelete, canDelete]
  );

  const handleExport = useCallback(() => {
    if (!canCreate) {
      notify({
        type: 'error',
        message: 'Permission denied',
        description: 'You do not have permission to export'
      });
      return;
    }
    // Trigger download
    if (onDownload) {
      window.location.href = onDownload;
    }
  }, [canCreate, notify, onDownload]);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'created_at',
      render: (val) => (val ? dayjs(val).format('DD MMM YYYY, HH. mm') : '-')
    },
    { title: 'Email', dataIndex: 'email' },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      width: 120,
      render: (_, record) => (
        <Space>
          {canDelete && (
            <Tooltip title='Delete'>
              <Button size='small' type='text' icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
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

      <section id='subscribe-section'>
        <div className='row-container'>
          <RangePicker
            allowClear={false}
            defaultValue={[dayjs(), dayjs()]}
            format='DD MMM YYYY'
            presets={rangePresets}
          />
        </div>

        <Row gutter={[16, 16]} className='row-container'>
          {transformSummaryData(summary).map((item) => (
            <Col lg={item.lg} xl={item.xl} key={`summary-col-${item.label}`}>
              <CardSummary {...item} />
            </Col>
          ))}
        </Row>

        <Row gutter={[16, 16]} className='row-container'>
          {canCreate && (
            <Col lg={4}>
              <Button type='primary' block icon={<DownloadOutlined />} onClick={handleExport}>
                Export
              </Button>
            </Col>
          )}
          <Col lg={canCreate ? 20 : 24}>
            <Input
              placeholder='Search...'
              suffix={<SearchOutlined />}
              allowClear
              value={filters.keyword}
              onChange={(e) => onFilterChange({ keyword: e.target.value })}
            />
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={data}
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

      {/* Log */}
      <CardUserLogWidget
        created_by={data?.created_by}
        updated_by={data?.updated_by}
        created_at={data?.created_at}
        updated_at={data?.updated_at}
      />
    </>
  );
};

export default SubscribeView;
