// -- libraries
import { useCallback, useState } from 'react';
import { Button, Table, Space, Tooltip, Row, Col, Input, DatePicker } from 'antd';
import Link from 'next/link';
import dayjs from 'dayjs';

// -- icons
import { ZoomInOutlined, DeleteOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';

// -- style
import style from '@components/Guest/Landing/styles/style.module.scss';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';
import usePermission from '@hooks/usePermission';

// -- utils
import Currency from '@utils/currency';
import LocalStorage from '@utils/localStorage';

// -- elements
import CardSummary from '@components/Elements/CardSummary/views';

// -- components
import GuestModal from '@components/Guest/Modal/views';

const GuestLanding = (props) => {
  const { data, summary, loading, filters, totalPage, pagination, onDelete, onPageChange, onFilterChange } = props;

  // Hooks
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();
  const { canView, canDelete } = usePermission('/guest');
  const { RangePicker } = DatePicker;
  const user = LocalStorage.get('user');
  const [dataForm, setDataForm] = useState(undefined);
  const [open, setOpen] = useState(false);

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

    const item = summary;
    const label = item.label || '';

    const keys = [
      { key: 'total_guest', icon: <UserAddOutlined />, title: 'Total Guest' },
      { key: 'total_revenue_guest', icon: <UserAddOutlined />, title: 'Total Revenue Guest' }
    ];

    return keys.map((entry) => {
      const value = item[entry.key] ?? { total: 0, previous: 0, percentage_change: 0 };

      const baseData = {
        icon: entry.icon,
        title: entry.title,
        value: value.total ?? 0
      };

      return {
        ...baseData,
        description: `From the last ${label}`,
        percentage: Math.abs(value.percentage_change ?? 0),
        traffic: (value.percentage_change ?? 0) >= 0
      };
    });
  };

  // Show modal
  const handleShowModal = useCallback(
    (record) => {
      if (!canView) {
        notify({
          type: 'error',
          message: 'Permission denied',
          description: 'You do not have permission to view details'
        });
        return;
      }
      setDataForm(record);
      setOpen(true);
    },
    [canView, notify]
  );

  // Close modal & reset form
  const handleCloseModal = useCallback(() => {
    setDataForm(undefined);
    setOpen(false);
  }, []);

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

      let passwordInput = '';

      confirm({
        icon: <DeleteOutlined />,
        content: (
          <>
            <p>
              Are you sure you want to delete the guest named <strong>{record.name}</strong>?
            </p>
            <Input.Password
              allowClear
              placeholder='Enter your password'
              onChange={(e) => {
                passwordInput = e.target.value;
              }}
            />
          </>
        ),
        onSuccess: async () => {
          if (!passwordInput) {
            notify({
              type: 'error',
              message: 'Password required',
              description: 'Please enter your password to confirm deletion'
            });
            return;
          }

          try {
            await onDelete(record.id, passwordInput);
            notify({
              type: 'success',
              message: 'Data deleted successfully'
            });
          } catch (error) {
            notify({
              type: 'error',
              message: 'Failed to delete data',
              description: error.message || 'An error occurred'
            });
          }
        }
      });
    },
    [confirm, notify, onDelete, canDelete]
  );

  const dataColumns = [
    {
      title: 'Date',
      dataIndex: 'created_at',
      width: 200
    },
    {
      title: 'Full Name',
      dataIndex: 'name'
    },
    { title: 'Phone Number', dataIndex: 'phone', width: 200 },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Order ID', dataIndex: 'order_code', render: (val) => <Link href={`/order/detail/${val}`}>{val}</Link> },
    { title: 'Total Order', dataIndex: 'total_order', render: (val) => Currency.formatRp(val) },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      render: (_, record) => (
        <Space>
          {canView && (
            <Tooltip title='Detail' placement='left'>
              <Button size='small' type='text' icon={<ZoomInOutlined />} onClick={() => handleShowModal(record)} />
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
      <section id='guest-section' className={style.guest}>
        {/* Filter */}
        <div className='row-container'>
          <RangePicker
            className='custom-range-picker'
            allowClear={false}
            defaultValue={[dayjs(), dayjs()]}
            format='DD MMM YYYY'
            presets={rangePresets}
          />
        </div>

        {/* Summary */}
        <Row gutter={[16, 16]} className='row-container'>
          {transformSummaryData(summary).map((val, idx) => (
            <Col span={12} key={`summ-${idx}`}>
              <CardSummary {...val} />
            </Col>
          ))}
        </Row>

        {/* Search */}
        <Row gutter={[16, 16]} className='row-container'>
          <Col lg={24}>
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
      {/* Modal Form */}
      {open && <GuestModal open={open} onClose={handleCloseModal} data={dataForm} notify={notify} />}
    </>
  );
};

export default GuestLanding;
