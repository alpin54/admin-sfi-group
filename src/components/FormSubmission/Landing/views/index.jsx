// --library
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Button, Row, Col, Table, Space, Tooltip, Input, DatePicker, Breadcrumb } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/id';

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.locale('id');

// -- icons
import { ZoomInOutlined, DeleteOutlined, SearchOutlined, FileDoneOutlined } from '@ant-design/icons';

// -- styles
import style from '@components/FormSubmission/Landing/styles/style.module.scss';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';
import usePermission from '@hooks/usePermission';

// -- elements
import CardSummary from '@components/Elements/CardSummary/views';

// -- components
import FormSubmissionModal from '@components/FormSubmission/Modal/widgets/Default';

const FormSubmissionView = (props) => {
  const {
    data,
    loading,
    filters,
    pagination,
    totalPage,
    onDelete,
    onPageChange,
    onFilterChange,
    dateRange,
    setDateRange,
    summaryData
  } = props;

  // Hooks
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();
  const { canView, canDelete } = usePermission('/form-submission');

  const [dataForm, setDataForm] = useState(undefined);
  const [open, setOpen] = useState(false);

  const { RangePicker } = DatePicker;

  const rangePresets = [
    { label: 'Today', value: [dayjs(), dayjs().endOf('day')] },
    { label: 'Last 7 Days', value: [dayjs().add(-6, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-13, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-29, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-89, 'd'), dayjs()] }
  ];

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
        icon: <DeleteOutlined />,
        content: `Are you sure you want to delete ${record.full_name.toLocaleLowerCase()}?`,
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

  const dataColumns = [
    {
      title: 'Date',
      dataIndex: 'created_at',
      width: 180,
      render: (date) => dayjs(date).format('DD MMMM YYYY HH:mm')
    },
    { title: 'Full Name', dataIndex: 'full_name', width: 150 },
    { title: 'Phone Number', dataIndex: 'phone', width: 180 },
    { title: 'Email', dataIndex: 'email', width: 160 },
    {
      title: 'Message',
      dataIndex: 'message',
      width: 200,
      ellipsis: true,
      render: (text) => <span title={text}>{text}</span>
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      width: 120,
      render: (_, record) => (
        <Space>
          {canView && (
            <Tooltip title='Detail' placement='left'>
              <Button size='small' type='text' icon={<ZoomInOutlined />} onClick={() => handleShowModal(record)} />
            </Tooltip>
          )}
          {canDelete && (
            <Tooltip title='Delete' placement='left'>
              <Button size='small' type='text' icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
            </Tooltip>
          )}
        </Space>
      )
    }
  ];

  const dataSource = data?.data ?? [];

  return (
    <>
      {confirmHolder}
      {notificationHolder}
      <section className={style.menu}>
        {/* Breadcrumb */}
        <div className='row-container' style={{ marginBottom: 12 }}>
          <Breadcrumb items={[{ title: <Link href='/'>Home</Link> }, { title: 'Form Submissions' }]} />
        </div>

        {/* Card Summary - Looping */}
        <Row gutter={[16, 16]} className='row-container'>
          <Col lg={12}>
            <CardSummary
              title='Total Form Submission Today'
              value={summaryData.total_today}
              icon={<FileDoneOutlined />}
            />
          </Col>
          <Col lg={12}>
            <CardSummary title='Total Form Submission' value={summaryData.total_all} icon={<FileDoneOutlined />} />
          </Col>
        </Row>

        {/* Filters: DateRange (left) + Search (right) */}
        <Row gutter={[12, 12]} className='row-container' style={{ marginTop: 12, marginBottom: 6 }}>
          <Col flex='320px'>
            <RangePicker
              allowClear={false}
              placeholder='Date'
              format='DD MMMM YYYY'
              presets={rangePresets}
              style={{ width: '100%' }}
              value={[
                dateRange && dateRange[0] ? dayjs(dateRange[0]) : null,
                dateRange && dateRange[1] ? dayjs(dateRange[1]) : null
              ]}
              onChange={(date) => {
                if (typeof setDateRange === 'function')
                  setDateRange(date ? [dayjs(date[0]), dayjs(date[1])] : [null, null]);
              }}
            />
          </Col>

          <Col flex='auto'>
            <Input
              placeholder='Search.. .'
              suffix={<SearchOutlined />}
              allowClear
              value={filters?.keyword}
              onChange={(e) => onFilterChange({ keyword: e.target.value })}
              style={{ width: '100%' }}
            />
          </Col>
        </Row>

        {/* Table */}
        <Table
          columns={dataColumns}
          dataSource={dataSource}
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

        {/* Modal Form */}
        {open && (
          <FormSubmissionModal open={open} onClose={handleCloseModal} initialValues={dataForm} notify={notify} />
        )}
      </section>
    </>
  );
};

export default FormSubmissionView;
