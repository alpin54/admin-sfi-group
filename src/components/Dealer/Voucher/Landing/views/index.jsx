// -- libraries
import { useCallback } from 'react';
import { Button, Table, Space, Tooltip, Row, Col, Input, Select } from 'antd';
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
  BarChartOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';
import usePermission from '@hooks/usePermission';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- state
import useStateHeader from '@components/Sidebar/states';

// -- elements
import CardSummary from '@components/Elements/CardSummary/views';
import { render } from 'sass';
import Currency from '@utils/currency';

const VoucherLanding = (props) => {
  const { data, summary, loading, filters, pagination, totalPage, onDelete, onhide, onPageChange, onFilterChange } =
    props;

  // Hooks
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();
  const { canView, canCreate, canEdit, canDelete } = usePermission('/dealer-rewards');
  const { menu } = useStateHeader();
  const user = LocalStorage.get('user');
  const dataSummary = summary;
  const dataList = data;

  // transform summary
  const transformSummaryData = (summary) => {
    if (!summary || summary.length === 0) return [];

    const item = summary;

    const keys = [
      { key: 'active_voucher', icon: <CheckCircleOutlined />, title: 'Voucher Active' },
      { key: 'expired_voucher', icon: <ExclamationCircleOutlined />, title: 'Voucher Expired' },
      { key: 'total_voucher', icon: <TagsOutlined />, title: 'Total Voucher' }
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
        icon: <DeleteOutlined style={{ color: 'red' }} />,
        content: (
          <span>
            Are you sure you want to delete the voucher <strong>{record.name}</strong>?
          </span>
        ),
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

  const handleStatus = useCallback(
    (record) => {
      if (!canEdit) {
        notify({
          type: 'error',
          message: 'Permission denied',
          description: 'You do not have permission to hide/unhide'
        });
        return;
      }

      const title = record.status ? 'Hide' : 'Unhide';
      const hide = record.status ? false : true;
      const payload = { id: record.id, status: hide, updated_by: user.id };

      confirm({
        icon: record.status ? <EyeOutlined /> : <EyeInvisibleOutlined />,
        content: (
          <span>
            Are you sure you want to {title.toLowerCase()} the voucher <strong>{record.name}</strong>?
          </span>
        ),
        onSuccess: async () => {
          notify({
            type: 'success',
            message: `Data ${title.toLowerCase()} successfully`
          });
          await onhide(payload);
        }
      });
    },
    [confirm, notify, user, onhide, canEdit]
  );

  const dataColumns = [
    {
      title: 'Voucher',
      dataIndex: 'name'
    },
    {
      title: 'Code',
      dataIndex: 'code'
    },
    {
      title: 'Spending Target',
      dataIndex: 'type',
      render: (_, record) => {
        const from = Currency.formatRp(record.spending_from);
        const until = Currency.formatRp(record.spending_until);
        return `${from} - ${until}`;
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
            <Tooltip title={record.status ? 'Hide' : 'Unhide'} placement='left'>
              <Button
                size='small'
                variant='text'
                color='default'
                icon={record.status ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                onClick={() => handleStatus(record)}
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
        <div className='row-container'>
          <Space size={20}>
            <Button color={menu === 'dealer-rewards' ? 'primary' : ``} variant='outlined' href='/dealer-rewards'>
              Reward Points
            </Button>
            <Button color={menu === 'dealer-setting' ? 'primary' : ``} variant='outlined' href='/dealer-setting'>
              Setting Points
            </Button>
          </Space>
        </div>
        {/* Summary */}
        <Row gutter={[16, 16]} className='row-container'>
          {transformSummaryData(dataSummary).map((val, idx) => (
            <Col span={8} key={`summ-${idx}`}>
              <CardSummary {...val} />
            </Col>
          ))}
        </Row>

        {/* Filter */}
        <Row gutter={16} className='row-container'>
          {canCreate && (
            <Col span={4}>
              <Link href='/dealer-setting/add'>
                <Button type='primary' block>
                  Add voucher
                </Button>
              </Link>
            </Col>
          )}
          <Col span={6}>
            <Select
              showSearch
              allowClear
              placeholder='Type'
              optionFilterProp='label'
              options={[
                { label: 'Guest', value: 0 },
                { label: 'Member', value: 1 },
                { label: 'Dealer', value: 2 }
              ]}
              value={filters?.status}
              onChange={(value) => onFilterChange({ status: value })}
            />
          </Col>
          <Col span={6}>
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
