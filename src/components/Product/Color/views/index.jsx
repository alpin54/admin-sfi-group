// -- libraries
import { useCallback, useState } from 'react';
import { Button, Row, Col, Table, Space, Tooltip, Breadcrumb, Form } from 'antd';

// -- link
import Link from 'next/link';

// -- icons
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  WarningOutlined
} from '@ant-design/icons';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';

// -- elements
import CardUserLog from '@components/Elements/CardUserLog/widgets/Default';

// -- styles
import style from '@components/Product/Color/styles/style.module.scss';

// -- components modal (add/edit Color)
import ModalColor from '@components/Product/ModalColor/widgets/Default';

// -- hooks
import LocalStorage from '@utils/localStorage';

const ProductColorView = (props) => {
  const { data, loading, totalPage, pagination, onDelete, onStatus, onPageChange, refetch } = props;
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState('add');
  const [dataForm, setDataForm] = useState(undefined);
  const [formInstance] = Form.useForm();
  const user = LocalStorage.get('user');

  const handleShowModal = useCallback(
    (method, item) => {
      formInstance.resetFields();
      setMethod(method);
      setDataForm(method === 'add' ? undefined : item);
      setOpen(true);
    },
    [formInstance]
  );

  // Close modal & reset form
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
      const suspend = item.status ? false : true;
      const payload = { id: item.id, status: suspend, updated_by: user?.id ?? 0 };
      confirm({
        title: title,
        icon: <WarningOutlined />,
        content: `Are you sure you want to ${title.toLowerCase()} ${item.name?.toLowerCase() || '-'}?`,
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
      title: 'Color',
      dataIndex: 'name',
      key: 'name',
      render: (_, item) => {
        const hex = item.code || '#FFFFFF';
        return (
          <div className={style.rowWrapper}>
            <div className={style.colorInfo}>
              <div
                className={style.swatch}
                style={{
                  background: hex,
                  border: '1px solid rgba(0,0,0,0.08)',
                  width: 28,
                  height: 28,
                  borderRadius: 4
                }}
              />
              <div className={style.texts}>
                <div className={style.hexText}>{hex}</div>
                <div className={style.nameText}>{item.name || '-'}</div>
              </div>
            </div>
          </div>
        );
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      width: 160,
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
            <Button size='small' type='text' icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
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
          <Breadcrumb items={[{ title: <Link href='/product'>Product</Link> }, { title: 'Color' }]} />
        </div>

        <Row gutter={[16, 16]} className='row-container' style={{ marginBottom: 12, alignItems: 'center' }}>
          <Col>
            <Button type='primary' icon={<PlusOutlined />} onClick={() => handleShowModal('add')}>
              Add New Color
            </Button>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey='id'
          loading={loading}
          pagination={{
            current: pagination.page,
            pageSize: pagination.limit,
            total: totalPage,
            onChange: (page, pageSize) => onPageChange?.(page, pageSize),
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100']
          }}
          showHeader={false}
        />
      </section>
      {open && (
        <ModalColor
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
        created_at={'2025-08-15T06:06:51.338Z'}
        updated_at={'2025-08-15T06:06:51.338Z'}
      />
    </>
  );
};

export default ProductColorView;
