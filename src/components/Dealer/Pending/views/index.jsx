// -- libraries
import { useCallback, useState } from 'react';
import { Button, Table, Space, Tooltip, Row, Col, Input, DatePicker } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';

// -- icons
import {
  ZoomInOutlined,
  DeleteOutlined,
  SearchOutlined,
  UserAddOutlined,
  FileImageOutlined,
  CheckOutlined,
  RetweetOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

// -- style
import style from '@components/Dealer/Pending/styles/style.module.scss';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';
import usePermission from '@hooks/usePermission';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- elements
import CardSummary from '@components/Elements/CardSummary/views';

// -- components
import ModalRevisionWidget from '@components/Dealer/ModalRevision/widgets/Default';

const DealerPending = (props) => {
  const { data, summary, loading, filters, totalPage, pagination, onDelete, onApprove, onPageChange, onFilterChange } =
    props;

  // Hooks
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();
  const { canView, canEdit, canDelete } = usePermission('/dealer');
  const { menu } = useStateMenu();
  const { RangePicker } = DatePicker;
  const user = LocalStorage.get('user');
  const [openModalRevision, setOpenModalRevision] = useState(false);
  const [dataModalRevision, setDataModalRevision] = useState(null);

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
      { key: 'total_dealer', icon: <UserAddOutlined />, title: 'Total Dealer' },
      { key: 'total_revenue_dealer', icon: <UserAddOutlined />, title: 'Total Revenue Dealer' }
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

  const handleOpenRevision = useCallback((record) => {
    setDataModalRevision(record);
    setOpenModalRevision(true);
  }, []);

  const handleCloseRevision = useCallback(() => {
    setOpenModalRevision(false);
    setDataModalRevision(null);
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
              Are you sure you want to delete the dealer account named <strong>{record.name}</strong>?
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

  const handleApprove = useCallback(
    (record) => {
      if (!canEdit) {
        notify({
          type: 'error',
          message: 'Permission denied',
          description: 'You do not have permission to approve'
        });
        return;
      }

      const title = 'Are you sure you want to approve this dealer account?';
      const approve = record.status ? 0 : 1;
      const payload = { id: record.id, status: approve, updated_by: user.id };

      confirm({
        icon: <CheckCircleOutlined style={{ color: '#04805a' }} />,
        title: title,
        content: 'Once approved, the user will gain access to exclusive vouchers and special pricing.',
        onSuccess: async () => {
          notify({
            type: 'success',
            message: `Data approved successfully`
          });
          await onApprove(payload);
        }
      });
    },
    [confirm, notify, user, onApprove, canEdit]
  );

  const dataColumns = [
    {
      title: 'Date',
      dataIndex: 'created_at'
    },
    {
      title: 'Full Name',
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
    { title: 'Phone Number', dataIndex: 'phone' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'KTP', dataIndex: 'ktp', render: () => <FileImageOutlined /> },
    { title: 'NPWP', dataIndex: 'npwp', render: () => <FileImageOutlined /> },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      width: 200,
      render: (_, record) => (
        <Space>
          {canView && (
            <Tooltip title='View More' placement='left'>
              <Link href={`/dealer/detail/${record.id}`}>
                <Button size='small' variant='text' color='default' icon={<ZoomInOutlined />} />
              </Link>
            </Tooltip>
          )}
          {canEdit && (
            <Tooltip title='Revision' placement='left'>
              <Button
                size='small'
                variant='text'
                color='default'
                icon={<RetweetOutlined />}
                onClick={() => handleOpenRevision(record)}
              />
            </Tooltip>
          )}
          {canEdit && (
            <Tooltip title='Approve' placement='left'>
              <Button
                size='small'
                variant='text'
                color='default'
                icon={<CheckOutlined />}
                onClick={() => handleApprove(record)}
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
      <section id='dealer-section' className={style.dealer}>
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
          <Col span={24}>
            <Input
              placeholder='Search...'
              suffix={<SearchOutlined />}
              allowClear
              value={filters?.keyword}
              onChange={(e) => onFilterChange({ keyword: e.target.value })}
            />
          </Col>
        </Row>

        <div className='row-container'>
          <Space size={20}>
            <Button color={menu === 'dealer' ? 'primary' : ``} variant='outlined' href='/dealer'>
              Dealers
            </Button>
            <Button color={menu === 'dealer-pending' ? 'primary' : ``} variant='outlined' href='/dealer/pending'>
              Pending Dealers
            </Button>
          </Space>
        </div>

        {/* Table */}
        <Table
          columns={dataColumns}
          dataSource={data ?? []}
          rowKey='id'
          loading={loading}
          scroll={{ x: 1440 }}
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
      {openModalRevision && (
        <ModalRevisionWidget
          variant='multiple'
          open={openModalRevision}
          data={dataModalRevision}
          onClose={handleCloseRevision}
        />
      )}
    </>
  );
};

export default DealerPending;
