// --library
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Button, Row, Col, Table, Space, Tooltip, Input, DatePicker, Breadcrumb, Tag, Card } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/id';

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.locale('id');

import {
  ZoomInOutlined,
  DeleteOutlined,
  SearchOutlined,
  DownloadOutlined,
  StarOutlined,
  StarFilled,
  BookOutlined,
  PieChartOutlined,
  ClockCircleOutlined,
  BankTwoTone
} from '@ant-design/icons';

// -- styles
import style from '@components/Career/Application/styles/style.module.scss';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- elements
import CardSummary from '@components/Elements/CardSummary/views';

// -- components
import CareerModal from '@components/Career/ModalApplication/widgets/Default';

const CareerApplicationView = (props) => {
  const {
    summary,
    data,
    loading,
    filters,
    pagination,
    totalPage,
    onDelete,
    onPageChange,
    onFilterChange,
    onSelected,
    dateRange,
    setDateRange,
    categoryJobTypeOptions = [],
    categoryWorkplaceOptions = []
  } = props;

  const { RangePicker } = DatePicker;
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();

  // range presets
  const rangePresets = [
    { label: 'Today', value: [dayjs(), dayjs().endOf('day')] },
    { label: 'Last 7 Days', value: [dayjs().add(-6, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-13, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-29, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-89, 'd'), dayjs()] }
  ];

  const [dataForm, setDataForm] = useState(undefined);
  const user = LocalStorage.get('user');
  const [open, setOpen] = useState(false);
  const dataSummary = summary;

  const handleShowModal = (record) => {
    setDataForm(record);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setDataForm(undefined);
    setOpen(false);
  };

  // normalize summary and extract position title + total applicants
  const buildSummaryCards = (summary) => {
    if (!summary) {
      return [
        { icon: <BookOutlined />, title: 'Position Title', value: '—' },
        { icon: <PieChartOutlined />, title: 'Total Applicants', value: 0 }
      ];
    }
    const maybe = summary?.data ?? summary;
    // support array envelope or object
    let position = '—';
    let total = 0;
    if (Array.isArray(maybe) && maybe.length > 0) {
      const item = maybe[0] || {};
      position = item?.title?.text ?? item?.title ?? position;
      total = item?.application?.total ?? item?.application ?? item?.total ?? total;
    } else if (typeof maybe === 'object') {
      position = maybe?.title?.text ?? maybe?.title ?? maybe?.position_title ?? position;
      total = maybe?.application?.total ?? maybe?.total ?? maybe?.application_total ?? total;
    }
    return [
      { icon: <BookOutlined />, title: 'Position Title', value: position },
      { icon: <PieChartOutlined />, title: 'Total Applicants', value: Number(total) || 0 }
    ];
  };

  const summaryCards = buildSummaryCards(dataSummary);

  const handleDelete = useCallback(
    (record) => {
      confirm({
        title: 'Delete',
        icon: <DeleteOutlined style={{ color: 'red' }} />,
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
    [confirm, notify, onDelete]
  );

  const handleSelected = useCallback(
    (record) => {
      const title = record.pinned ? 'Not Selected' : 'Selected';
      const selected = record.pinned ? 0 : 1;
      const payload = { id: record.id, pinned: selected, updated_by: user.id };

      confirm({
        title: title,
        icon: record.pinned ? <StarFilled style={{ color: 'gold' }} /> : <StarOutlined />,
        content: `Are you sure you want to ${title.toLowerCase()} ${record.full_name.toLocaleLowerCase()}?`,
        onSuccess: async () => {
          notify({
            type: 'success',
            message: `Data ${title.toLowerCase()} successfully`
          });
          await onSelected(payload);
        }
      });
    },
    [confirm, notify, user, onSelected]
  );

  const dataColumns = [
    {
      title: 'Date',
      dataIndex: 'created_at',
      render: (val) => dayjs(val).format('DD MMM YYYY, HH:mm')
    },
    { title: 'Full Name', dataIndex: 'full_name' },
    { title: 'Phone Number', dataIndex: 'phone' },
    { title: 'Email', dataIndex: 'email' },
    {
      title: 'Resume/CV',
      dataIndex: 'resume',
      render: (resume) => {
        // resume can be null, a string (url) or an object { url, name }
        if (!resume) return '-';

        const href = typeof resume === 'string' ? resume : resume?.url;

        // helper: extract filename from URL (remove query/hash) and decode
        const filenameFromUrl = (url) => {
          try {
            const clean = url.split('?')[0].split('#')[0];
            const parts = clean.split('/');
            const last = parts[parts.length - 1] || '';
            return decodeURIComponent(last.replace(/\+/g, ' '));
          } catch (e) {
            return '';
          }
        };

        const extracted = href ? filenameFromUrl(href) : '';

        // Derive extension from filename (either resume.name or URL filename)
        const getExt = (name) => {
          if (!name) return '';
          const m = name.split('.').pop();
          return m && m !== name ? m.toLowerCase() : '';
        };

        const ext = getExt(typeof resume === 'string' ? extracted : (resume?.name ?? extracted));
        const label = ext ? `resume.${ext}` : 'resume';

        if (!href) return '-';

        return (
          <Link href={href} target='_blank' download style={{ color: '#e60013', textDecoration: 'underline' }}>
            {label}
          </Link>
        );
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      width: 120,
      render: (_, record) => (
        <Space>
          <Tooltip title={record.pinned ? 'Selected' : 'Not Selected'} placement='left'>
            <Button
              size='small'
              variant='text'
              color='default'
              icon={record.pinned ? <StarFilled style={{ color: 'gold' }} /> : <StarOutlined />}
              onClick={() => handleSelected(record)}
            />
          </Tooltip>
          <Tooltip title={record.resume ? 'Download' : 'No file'} placement='left'>
            {(() => {
              // resume may be null, a string (url) or an object { url, name }
              const resume = record?.resume;
              const href = typeof resume === 'string' ? resume : resume?.url;

              if (!href) {
                return <Button size='small' variant='text' color='default' icon={<DownloadOutlined />} disabled />;
              }

              return (
                <Link href={href} target='_blank' download>
                  <Button size='small' variant='text' color='default' icon={<DownloadOutlined />} />
                </Link>
              );
            })()}
          </Tooltip>
          <Tooltip title='Detail' placement='left'>
            <Button
              size='small'
              variant='text'
              color='default'
              icon={<ZoomInOutlined />}
              onClick={() => handleShowModal(record)}
            />
          </Tooltip>
          <Tooltip title='Delete' placement='left'>
            <Button
              size='small'
              variant='text'
              color='default'
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const dataSource = (() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.list)) return data.list;
    return [];
  })();

  const totalItems = typeof totalPage === 'number' ? totalPage : dataSource.length;

  // compute display values for Job Type and Workplace:
  // prefer filters value (filters.job_type / filters.workplace), fallback to first option name
  const displayJobType = filters?.job_type ?? categoryJobTypeOptions[0]?.name ?? '';
  const displayWorkplace = filters?.workplace ?? categoryWorkplaceOptions[0]?.name ?? '';

  return (
    <>
      {confirmHolder}
      {notificationHolder}

      <section className={style.menu}>
        <div className='row-container'>
          <Breadcrumb items={[{ title: <Link href='/career'>Career</Link> }, { title: 'Applicants' }]} />
        </div>

        {/* Summary cards */}
        <Row gutter={[16, 16]} className='row-container'>
          <Col xs={24} sm={12}>
            <CardSummary icon={summaryCards[0]?.icon} title={summaryCards[0]?.title} value={summaryCards[0]?.value} />
            {/* <CardSummary icon={<BookOutlined />} title='Position Title' value={dataSummary?.total} /> */}
          </Col>

          <Col xs={24} sm={12}>
            <CardSummary icon={summaryCards[1]?.icon} title={summaryCards[1]?.title} value={summaryCards[1]?.value} />
            {/* <CardSummary icon={<PieChartOutlined />} title='Total Applicants' value={dataSummary?.total} /> */}
          </Col>
        </Row>
        <Row gutter={[16, 16]} className='row-container' style={{ marginTop: 12 }}>
          <Col span={12}>
            <Card>
              <div className={style.summaryWork}>
                <div className={style.summaryWorkItem}>
                  <span>
                    <ClockCircleOutlined style={{ color: '#fa8c16' }} />
                  </span>{' '}
                  Job Type
                </div>
                {displayJobType || '—'}
              </div>
            </Card>
          </Col>

          <Col span={12}>
            <Card>
              <div className={style.summaryWork}>
                <div className={style.summaryWorkItem}>
                  <span>
                    <BankTwoTone twoToneColor='#fa8c16' />
                  </span>{' '}
                  Workplace
                </div>
                {displayWorkplace || '—'}
              </div>
            </Card>
          </Col>
        </Row>

        {/* Row 2: Date range + Search */}
        <Row gutter={[16, 16]} className='row-container'>
          <Col flex='320px'>
            <RangePicker
              allowClear={false}
              placeholder='Date'
              format='DD MMMM YYYY'
              presets={rangePresets}
              value={[
                dateRange && dateRange[0] ? dayjs(dateRange[0]) : null,
                dateRange && dateRange[1] ? dayjs(dateRange[1]) : null
              ]}
              onChange={(date) => {
                const start = date ? dayjs(date[0]).format('YYYY-MM-DD') : null;
                const end = date ? dayjs(date[1]).format('YYYY-MM-DD') : null;
                if (typeof setDateRange === 'function')
                  setDateRange(date ? [dayjs(date[0]), dayjs(date[1])] : [null, null]);
                onFilterChange({ start_date: start, end_date: end });
              }}
            />
          </Col>
          <Col flex='auto'>
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
          dataSource={dataSource}
          rowKey='id'
          loading={loading ?? false}
          pagination={{
            current: pagination.page,
            pageSize: pagination.limit,
            total: totalItems,
            onChange: (page, pageSize) => onPageChange(page, pageSize),
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100']
          }}
          // pagination={
          //   totalPage > pagination.limit && {
          //     current: pagination.page,
          //     pageSize: pagination.limit,
          //     total: totalPage,
          //     onChange: (page, pageSize) => onPageChange(page, pageSize),
          //     showSizeChanger: true,
          //     pageSizeOptions: ['10', '20', '50', '100']
          //   }
          // }
        />
      </section>

      {/* Modal */}
      {open && <CareerModal open={open} onClose={handleCloseModal} data={dataForm} />}
    </>
  );
};

export default CareerApplicationView;
