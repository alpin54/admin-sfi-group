// -- libraries
import { useCallback } from 'react';
import { Button, Table, Space, Tooltip, Row, Col, Input, Select, Flex, Popover } from 'antd';
import Link from 'next/link';
import Image from 'next/image';

// -- icons
import {
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  ZoomInOutlined,
  ShopOutlined,
  DollarCircleOutlined,
  PieChartOutlined,
  WarningOutlined
} from '@ant-design/icons';

// -- style
import style from '@components/Product/Landing/styles/style.module.scss';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';
import usePermission from '@hooks/usePermission';

// -- utils
import LocalStorage from '@utils/localStorage';
import FormData from '@utils/formdata';
import Currency from '@utils/currency';

// -- elements
import CardSummary from '@components/Elements/CardSummary/views';

const ProductLanding = (props) => {
  const {
    categoryOptions,
    brandOptions,
    summary,
    data,
    loading,
    filters,
    pagination,
    onDelete,
    onStatus,
    totalPage,
    onPageChange,
    onFilterChange
  } = props;

  // Hooks
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();
  const { canView, canCreate, canEdit, canDelete } = usePermission('/product');

  const user = LocalStorage.get('user');
  const dataSummary = summary;

  // transform summary
  const transformSummaryData = (summary) => {
    if (!summary || summary.length === 0) return [];

    const item = summary[0];

    const keys = [
      { key: 'product', icon: <ShopOutlined />, title: 'Total Product' },
      { key: 'revenue', icon: <DollarCircleOutlined />, title: 'Total Revenue' },
      { key: 'sold', icon: <PieChartOutlined />, title: 'Product Sold' }
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
        icon: <DeleteOutlined />,
        content: `Are you sure you want to delete ${record.name.toLocaleLowerCase()}?`,
        onSuccess: async () => {
          const response = await onDelete(record.id);
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
      const status = record.status ? 0 : 1;
      const payload = { id: record.id, status: status, updated_by: user.id };
      const formData = FormData(payload, 'status');

      confirm({
        icon: <WarningOutlined />,
        content: `Are you sure you want to ${title.toLowerCase()} ${record.name.toLocaleLowerCase()}?`,
        onSuccess: async () => {
          const response = await onStatus(formData);
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
    [confirm, notify, onStatus, user, canEdit]
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
      width: 150,
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
      width: 80,
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
      title: 'Revenue',
      dataIndex: 'revenue',
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
      title: 'Sold',
      dataIndex: 'sold'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size={1} align='center'>
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
      <section id='product-section'>
        {/* Summary */}
        <Row gutter={[16, 16]} className='row-container'>
          {transformSummaryData(dataSummary).map((val, idx) => (
            <Col span={8} key={`summ-${idx}`}>
              <CardSummary {...val} />
            </Col>
          ))}
        </Row>

        {/* Button */}
        <Space size={16} className='row-container'>
          {canCreate && (
            <Link href='/product/add'>
              <Button type='primary' block>
                Add Product
              </Button>
            </Link>
          )}
          <Link href='/product/category'>
            <Button color='primary' variant='outlined' block>
              Category
            </Button>
          </Link>
          <Link href='/product/import'>
            <Button color='primary' variant='outlined' block>
              Import Product
            </Button>
          </Link>
          <Link href='/product/brand'>
            <Button color='primary' variant='outlined' block>
              Brand
            </Button>
          </Link>
          <Link href='/product/color'>
            <Button color='primary' variant='outlined' block>
              Color
            </Button>
          </Link>
          <Link href='/product/promotions'>
            <Button color='primary' variant='outlined' block>
              Promotions
            </Button>
          </Link>
          {/* {selectedRows.length > 0 && (
            <>
              <Button color='primary' variant='outlined' block>
                Hide
              </Button>
              <Button color='danger' variant='solid' block>
                Delete
              </Button>
            </>
          )} */}
        </Space>

        {/* Filter */}
        <Row gutter={16} className='row-container'>
          <Col lg={6}>
            <Select
              showSearch
              allowClear
              placeholder='Category'
              optionFilterProp='label'
              options={categoryOptions?.map((category) => ({
                label: category.name,
                value: category.id
              }))}
              value={filters?.category_id}
              onChange={(value) => onFilterChange({ category_id: value })}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
            />
          </Col>
          <Col lg={6}>
            <Select
              showSearch
              allowClear
              placeholder='Brand'
              optionFilterProp='label'
              options={brandOptions?.map((brand) => ({
                label: brand.name,
                value: brand.id
              }))}
              value={filters?.brand_id}
              onChange={(value) => onFilterChange({ brand_id: value })}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
            />
          </Col>
          <Col lg={12}>
            <Input
              placeholder='Search.. .'
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
    </>
  );
};

export default ProductLanding;
