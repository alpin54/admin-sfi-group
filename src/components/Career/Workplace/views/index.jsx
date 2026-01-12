// -- libraries
import { useState, useCallback } from 'react';
import { Button, Row, Col, Table, Space, Tooltip, Breadcrumb, Form } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  WarningOutlined
} from '@ant-design/icons';

import Link from 'next/link';

// -- styles
import style from '@components/Career/Workplace/styles/style.module.scss';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- elements
import CardUserLog from '@components/Elements/CardUserLog/widgets/Default';

// -- components modal
import ModalWorkplace from '@components/Career/ModalWorkplace/widgets/Default';

const CareerWorkplaceView = (props) => {
  const { data, loading, totalPage, pagination, onDelete, onStatus, onPageChange, refetch } = props;
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState('add');
  const [dataForm, setDataForm] = useState(undefined);
  const [formInstance] = Form.useForm();
  const user = LocalStorage.get('user');

  // Show modal (Add, Edit, View)
  const handleShowModal = useCallback(
    (method, item) => {
      formInstance.resetFields();
      setMethod(method);
      setDataForm(method === 'add' ? undefined : item);
      setOpen(true);
    },
    [formInstance]
  );

  const handleCloseModal = useCallback(() => {
    formInstance.resetFields();
    setDataForm(undefined);
    setOpen(false);
  }, [formInstance]);

  const handleDelete = useCallback(
    (item) => {
      confirm({
        icon: <DeleteOutlined />,
        content: `Are you sure you want to delete ${item.name.toLocaleLowerCase()}?`,
        onSuccess: async () => {
          const response = await onDelete(item.id);
          if (response && !response.error) {
            notify({
              type: 'success',
              message: 'Data deleted successfully'
            });
          } else {
            notify({
              type: 'error',
              message: response.error || 'Failed to delete data'
            });
          }
        }
      });
    },
    [confirm, notify, onDelete]
  );

  const handleStatus = useCallback(
    (item) => {
      const title = item.status ? 'Hide' : 'Unhide';
      const status = item.status ? false : true;
      const payload = { id: item.id, status: status, updated_by: user.id };

      confirm({
        icon: <WarningOutlined />,
        content: `Are you sure you want to ${title.toLowerCase()} ${item.name.toLocaleLowerCase()}?`,
        onSuccess: async () => {
          const response = await onStatus(payload);
          if (response && !response.error) {
            notify({
              type: 'success',
              message: `Data ${title.toLowerCase()} successfully`
            });
          } else {
            notify({
              type: 'error',
              message: response.error || `Failed to ${title.toLowerCase()} data`
            });
          }
        }
      });
    },
    [confirm, notify, onStatus, user]
  );

  const dataSource = Array.isArray(data) ? data : [];

  const columns = [
    {
      title: 'Job Type',
      dataIndex: 'name',
      key: 'name',
      render: (v) => v || '-'
    },
    {
      title: 'Total Careers',
      dataIndex: 'count',
      key: 'count',
      align: 'left',
      width: 140,
      render: (c) => (typeof c === 'number' ? `${c} Career` : '-')
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      width: 180,
      render: (_, record) => (
        <Space>
          <Tooltip title='Edit'>
            <Button size='small' type='text' icon={<EditOutlined />} onClick={() => handleShowModal('edit', record)} />
          </Tooltip>
          <Tooltip title={record.status ? 'Unhide' : 'Hide'}>
            <Button
              size='small'
              type='text'
              icon={record.status ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              onClick={() => handleStatus(record)}
            />
          </Tooltip>
          <Tooltip title='Delete'>
            <Button size='small' type='text' danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <>
      {confirmHolder}
      {notificationHolder}
      <section className={style.menu}>
        <div className='row-container' style={{ marginBottom: 12 }}>
          <Breadcrumb items={[{ title: <Link href='/career'>Career</Link> }, { title: 'Workplace' }]} />
        </div>

        <Row gutter={[16, 16]} className='row-container' style={{ marginBottom: 12, alignItems: 'center' }}>
          <Col>
            <Button type='primary' icon={<PlusOutlined />} onClick={() => handleShowModal('add')}>
              Add Workplace
            </Button>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey='id'
          loading={loading}
          pagination={
            totalPage > pagination.limit && {
              current: pagination.page,
              pageSize: pagination.limit,
              total: totalPage,
              onChange: (page, pageSize) => onPageChange?.(page, pageSize)
            }
          }
          showHeader={false}
        />
      </section>
      {open && (
        <ModalWorkplace
          open={open}
          onClose={handleCloseModal}
          method={method}
          initialValues={dataForm}
          formInstance={formInstance}
          notify={notify}
          refetch={refetch}
        />
      )}
      {/* User Log */}
      <CardUserLog
        created_by={1}
        updated_by={1}
        created_at='2025-08-15T06:06:51.338Z'
        updated_at='2025-08-15T06:06:51.338Z'
      />
    </>
  );
};

export default CareerWorkplaceView;
