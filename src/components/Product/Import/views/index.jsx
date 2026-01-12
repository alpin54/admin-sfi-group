// -- libraries
import { useCallback, useState } from 'react';
import { Button, Row, Col, Table, Space, Tooltip, Breadcrumb, Form, Flex, Popover } from 'antd';

// -- link
import Link from 'next/link';

// -- icons
import {
  EditOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  WarningOutlined,
  ZoomInOutlined,
  DownloadOutlined,
  CheckOutlined
} from '@ant-design/icons';

// -- styles
import style from '@components/Product/Brand/styles/style.module.scss';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';
import usePermission from '@hooks/usePermission';

// -- utils
import LocalStorage from '@utils/localStorage';
import Currency from '@utils/currency';

// -- components
import ModalImport from '@components/Product/ModalImport/widgets/Default';
import Image from 'next/image';

const ProductImportView = (props) => {
  const { data, loading, totalPage, pagination, onDelete, onStatus, onPageChange, refetch } = props;
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();
  const { canView, canCreate, canEdit, canDelete } = usePermission('/product');
  const [open, setOpen] = useState(false);
  const [formInstance] = Form.useForm();
  const user = LocalStorage.get('user');

  // Show modal (Add, Edit, View)
  const handleShowModal = () => {
    formInstance.resetFields();
    setOpen(true);
  };

  // Close modal & reset form
  const handleCloseModal = () => {
    formInstance.resetFields();
    setOpen(false);
  };

  // Table actions
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

  const handleSelected = useCallback(
    (item) => {
      const status = item.status ? false : true;
      const payload = { id: item.id, status: status, updated_by: user.id };

      confirm({
        icon: <WarningOutlined />,
        content: `Are you sure you want to change the selection of ${item.name.toLocaleLowerCase()}?`,
        onSuccess: async () => {
          const response = await onStatus(payload);
          if (response && !response.error) {
            notify({
              type: 'success',
              message: `Data selected successfully`
            });
          } else {
            notify({
              type: 'error',
              message: response.error || `Failed to select data`
            });
          }
        }
      });
    },
    [confirm, notify, onStatus, user]
  );

  // Helper to render variants inside a Popover
  const renderVariantsPopoverContent = (variants) => {
    if (!variants || variants.length === 0) return null;

    return (
      <div className={style.popover}>
        <ul className={style.popoverHead}>
          <li className={style.popoverHeadText}>SKU</li>
          <li className={style.popoverHeadText}>Price</li>
          <li className={style.popoverHeadText}>Stock</li>
        </ul>
        {variants.map((variant, idx) => (
          <div key={`variant-row-${idx}`} className={style.popoverRow}>
            <li className={style.popoverRowText}>{variant.sku ?? '-'}</li>
            <li className={style.popoverRowText}>
              {variant.sale_price > 0 ? (
                <>
                  {Currency.formatRp(variant.sale_price)} <del>{Currency.formatRp(variant.price)}</del>
                </>
              ) : (
                Currency.formatRp(variant.price)
              )}
            </li>
            <li className={style.popoverRowText}>{variant.stock ?? 0}</li>
          </div>
        ))}
      </div>
    );
  };

  const dataColumns = [
    {
      title: 'Product',
      dataIndex: 'name',
      width: 200,
      render: (_, record) => (
        <Flex align='center'>
          <Image src={record.image} alt={record.name} width={40} height={40} style={{ marginRight: '8px' }} />
          <span className='ant-ellipsis'>{record.name}</span>
        </Flex>
      )
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      render: (_, record) => {
        const variants = record?.variants;
        if (variants && variants.length > 0) {
          const content = renderVariantsPopoverContent(variants);
          const display = `${variants[0].sku ?? '-'}${variants.length > 1 ? ` (+${variants.length - 1})` : ''}`;
          return (
            <Popover content={content} title='Variants' trigger='click'>
              <a>{display}</a>
            </Popover>
          );
        } else {
          return record.sku ?? '-';
        }
      }
    },
    {
      title: 'Category',
      dataIndex: 'categories',
      width: 150,
      render: (categories) => categories.map((category) => category.name ?? '-').join(', ')
    },
    {
      title: 'Brand',
      width: 150,
      dataIndex: 'brands',
      render: (brands) => brands.map((brand) => brand.name ?? '-').join(', ')
    },
    {
      title: 'Member Price',
      width: 150,
      dataIndex: 'price',
      render: (val) => Currency.formatRp(val)
    },
    {
      title: 'Dealer Price',
      dataIndex: 'dealer_price',
      render: (val) => Currency.formatRp(val)
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      render: (_, record) => {
        const variants = record?.variants;
        if (variants && variants.length > 0) {
          const content = renderVariantsPopoverContent(variants);
          const totalStock = variants.reduce((acc, v) => acc + (v.stock ?? 0), 0);
          return (
            <Popover content={content} title='Variants' trigger='click'>
              <a>{totalStock}</a>
            </Popover>
          );
        } else {
          return record.stock ?? 0;
        }
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      width: 180,
      render: (_, record) => (
        <Space size={4} align='center'>
          {canView && (
            <Tooltip title='View More' placement='left'>
              <Link href={`/product/detail/${record.id}`}>
                <Button size='small' variant='text' color='default' icon={<ZoomInOutlined />} />
              </Link>
            </Tooltip>
          )}
          {canEdit && (
            <Tooltip title='Edit' placement='left'>
              <Link href={`/product/edit/${record.id}`}>
                <Button size='small' variant='text' color='default' icon={<EditOutlined />} />
              </Link>
            </Tooltip>
          )}
          {canEdit && (
            <Tooltip title='Selected' placement='left'>
              <Button
                size='small'
                variant='text'
                color='default'
                icon={<CheckOutlined />}
                onClick={() => handleSelected(record)}
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
      <section className={style.menu}>
        <div className='row-container'>
          <Breadcrumb items={[{ title: <Link href='/product'>Product</Link> }, { title: 'Import Product' }]} />
        </div>

        <Row gutter={[16, 16]} className='row-container'>
          <Col>
            <Button type='primary' icon={<DownloadOutlined />} onClick={handleShowModal}>
              Upload
            </Button>
          </Col>
          <Col>
            <Button color='primary' variant='outlined' icon={<DownloadOutlined />}>
              Download Template
            </Button>
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
      {/* Modal add/edit */}
      {open && (
        <ModalImport
          open={open}
          onClose={handleCloseModal}
          formInstance={formInstance}
          notify={notify}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default ProductImportView;
