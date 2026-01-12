// -- libraries
import { useCallback, useState } from 'react';
import Link from 'next/link';
import { Button, Collapse, List, Space, Tooltip, Breadcrumb, Form } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  WarningOutlined,
  DownOutlined
} from '@ant-design/icons';

// -- styles
import style from '@components/Product/Category/styles/style.module.scss';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';

// -- utils
import LocalStorage from '@utils/localStorage';
import FormData from '@utils/formdata';

// -- elements
import CardUserLog from '@components/Elements/CardUserLog/widgets/Default';

// -- components
import ModalCategory from '@components/Product/ModalCategory/widgets/Default';

const ProductCategoryView = (props) => {
  const { data, loading, onStatus, onDelete, refetch } = props;
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

  // Close modal & reset form
  const handleCloseModal = useCallback(() => {
    formInstance.resetFields();
    setDataForm(undefined);
    setOpen(false);
  }, [formInstance]);

  // Table actions
  const handleDelete = useCallback(
    (type, item) => {
      confirm({
        title: 'Delete',
        icon: <DeleteOutlined />,
        content: `Are you sure you want to delete ${item.name.toLocaleLowerCase()}?`,
        onSuccess: async () => {
          const response = await onDelete(type, item.id);
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
    (type, item) => {
      const title = item.status ? 'Hide' : 'Unhide';
      const status = item.status ? 0 : 1;
      const payload = { id: item.id, status: status, updated_by: user.id };
      if (type === 'sub_category') {
        payload.category_id = item.category_id;
      }

      const formData = FormData(payload, 'status');
      confirm({
        icon: <WarningOutlined />,
        content: `Are you sure you want to ${title.toLowerCase()} ${item.name.toLocaleLowerCase()}?`,
        onSuccess: async () => {
          const response = await onStatus(type, formData);
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

  // Build Collapse items array (items prop style like AntD docs)
  const items = dataSource.map((rec) => {
    const header = (
      <div className={style.panelHeader}>
        <div className={style.headerLeft}>
          <span className={style.catName}>{rec.name || '-'}</span>
        </div>

        <div className={style.headerRight}>
          <Space size='small'>
            <Tooltip title='Edit'>
              <Button size='small' type='text' icon={<EditOutlined />} onClick={() => handleShowModal('edit', rec)} />
            </Tooltip>

            <Tooltip title={rec.status ? 'Unhide' : 'Hide'}>
              <Button
                size='small'
                type='text'
                icon={rec.status ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                onClick={() => handleStatus('category', rec)}
              />
            </Tooltip>

            <Tooltip title='Delete'>
              <Button
                size='small'
                type='text'
                icon={<DeleteOutlined />}
                onClick={() => handleDelete('category', rec)}
              />
            </Tooltip>
          </Space>
        </div>
      </div>
    );

    const childrenContent = Array.isArray(rec.subcategories) && rec.subcategories.length > 0 && (
      <List
        size='small'
        dataSource={rec.subcategories}
        split={false}
        loading={loading}
        renderItem={(child) => (
          <List.Item
            className={`${style.childItem} ${!child.status ? style.categoryStatused : ''}`}
            actions={[
              <Tooltip title='Edit' key='edit'>
                <Button
                  size='small'
                  type='text'
                  icon={<EditOutlined />}
                  onClick={() => handleShowModal('edit', child)}
                />
              </Tooltip>,
              <Tooltip title={child.status ? 'Unhide' : 'Hide'} key='status'>
                <Button
                  size='small'
                  type='text'
                  icon={child.status ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  onClick={() => handleStatus('sub_category', child)}
                />
              </Tooltip>,
              <Tooltip title='Delete' key='delete'>
                <Button
                  size='small'
                  type='text'
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete('sub_category', child)}
                />
              </Tooltip>
            ]}>
            <List.Item.Meta title={<span className={style.childName}>{child.name}</span>} />
          </List.Item>
        )}
      />
    );

    return {
      key: String(rec.id),
      label: header,
      children: childrenContent
    };
  });
  return (
    <>
      {confirmHolder}
      {notificationHolder}
      <section className={style.menu}>
        <div className='row-container'>
          <Breadcrumb items={[{ title: <Link href='/product'>Product</Link> }, { title: 'Category' }]} />
        </div>

        <div className='row-container'>
          <Button type='primary' icon={<PlusOutlined />} onClick={() => handleShowModal('add')}>
            Add New Category
          </Button>
        </div>

        <Collapse
          items={items}
          expandIconPosition='end'
          expandIcon={<DownOutlined />}
          className={style.categoryCollapse}
        />
      </section>

      {/* Modal add/edit */}
      {open && (
        <ModalCategory
          open={open}
          onClose={handleCloseModal}
          method={method}
          mainCategories={data}
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

export default ProductCategoryView;
