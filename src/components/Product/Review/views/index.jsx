// -- libraries
import { useCallback, useState } from 'react';
import { Button, Table, Space, Tooltip, Row, Col, Input, Select, Flex, Image as ImageAnt, Form } from 'antd';
import Image from 'next/image';
import dayjs from 'dayjs';

// -- icons
import {
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  WarningOutlined,
  StarOutlined,
  StarFilled,
  CommentOutlined
} from '@ant-design/icons';

// -- style
import style from '@components/Product/Review/styles/style.module.scss';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';
import usePermission from '@hooks/usePermission';

// -- utils
import LocalStorage from '@utils/localStorage';
import FormData from '@utils/formdata';

// -- elements
import CardSummary from '@components/Elements/CardSummary/views';

// -- components
import ModalReviewWidget from '@components/Product/ModalReview/widgets/Default';

const ProductReview = (props) => {
  const { summary, data, loading, filters, pagination, onDelete, onStatus, totalPage, onPageChange, onFilterChange } =
    props;

  // Hooks
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();
  const { canView, canCreate, canEdit, canDelete } = usePermission('/product');
  const [openModalReview, setOpenModalReview] = useState(false);
  const [dataReview, setDataReview] = useState(null);
  const user = LocalStorage.get('user');
  const dataSummary = summary;
  const [formInstance] = Form.useForm();

  const handleOpenModalReview = useCallback(
    (data) => {
      if (!canCreate) {
        notify({
          type: 'error',
          message: 'Permission denied',
          description: 'You do not have permission to create'
        });
        return;
      }
      setOpenModalReview(true);
      setDataReview(data);
      formInstance.resetFields();
    },
    [canCreate, notify, formInstance]
  );

  const handleCloseModalReview = useCallback(() => {
    formInstance.resetFields();
    setOpenModalReview(false);
    setDataReview(null);
  }, [formInstance]);

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
        content: (
          <span>
            Are you sure you want to delete the review by <strong>{record.customer.name}?</strong>
          </span>
        ),
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

      const title = record.status ? 'hide' : 'unhide';
      const status = record.status ? 0 : 1;
      const payload = { id: record.id, status: status, updated_by: user.id };
      const formData = FormData(payload, 'status');

      confirm({
        icon: <WarningOutlined />,
        content: (
          <span>
            Are you sure you want to {title} the review by <strong>{record.customer.name}?</strong>
          </span>
        ),
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

  const dataColumns = [
    {
      dataIndex: 'customer',
      width: 250,
      render: (customer) => (
        <Flex align='center' className={style.profile}>
          <Image src={customer.image} alt={customer.name} width={48} height={48} className={style.profileImage} />
          <div className={style.profileText}>
            <p className={style.profileName}>{customer.name}</p>
            <p className={style.profileDate}>{dayjs(customer.created_at).format('H:mm D MMM YYYY')}</p>
          </div>
        </Flex>
      )
    },
    {
      dataIndex: 'rating',
      render: (_, record) => (
        <>
          <Space className={style.rating}>
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return <span key={index}>{starValue <= record.rating ? <StarFilled /> : <StarOutlined />}</span>;
            })}
          </Space>
          <div className={style.review}>
            <div className={style.reviewVariant}>
              <span>Variant</span>
              <ul>
                {record.product.variant.map((variant, idx) => (
                  <li key={idx}>{variant.name}</li>
                ))}
              </ul>
            </div>
            <p className={style.reviewText}>{record.review}</p>
            {record.images && record.images.length > 0 && (
              <Space>
                {record.images.map((image, idx) => (
                  <ImageAnt
                    key={idx}
                    src={image}
                    alt='Product Image'
                    width={48}
                    height={48}
                    className={style.reviewImage}
                  />
                ))}
              </Space>
            )}
          </div>
        </>
      )
    },
    {
      dataIndex: 'action',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <Space size={1} align='center'>
          {canEdit && (
            <Tooltip title='Edit' placement='left'>
              <Button
                size='small'
                variant='text'
                color='default'
                icon={<EditOutlined />}
                onClick={() => handleOpenModalReview(record)}
              />
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
          <Col span={12}>
            <CardSummary
              icon={<StarOutlined />}
              title='Rating'
              value={
                <>
                  <strong>{summary?.rating?.total ?? 0}</strong>
                  <span> / 5.0</span>
                </>
              }
            />
          </Col>
          <Col span={12}>
            <CardSummary icon={<CommentOutlined />} title='Review' value={summary?.review?.total ?? 0} />
          </Col>
          {dataSummary?.stars?.map((star, idx) => (
            <Col key={`star-${idx}`} style={{ width: '20%' }}>
              <CardSummary
                variant='secondary'
                icon={<StarFilled />}
                title={
                  <>
                    <strong>{star.rating}</strong> <span>Rating</span>
                  </>
                }
                value={
                  <>
                    <strong>{star.review ?? 0}</strong> <span>Review</span>
                  </>
                }
              />
            </Col>
          ))}
        </Row>

        {/* Filter */}
        <Row gutter={16} className='row-container'>
          <Col lg={6}>
            <Select
              showSearch
              allowClear
              placeholder='Rating'
              options={[5, 4, 3, 2, 1]?.map((rating) => ({
                label: [...Array(5)].map((_, index) => {
                  const starValue = index + 1;
                  return (
                    <span key={index} className={style.star}>
                      {starValue <= rating ? <StarFilled /> : <StarOutlined />}
                    </span>
                  );
                }),
                value: rating
              }))}
              value={filters?.rating}
              onChange={(value) => onFilterChange({ rating: value })}
            />
          </Col>
          <Col lg={18}>
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
          className={style.table}
          columns={dataColumns}
          dataSource={data ?? []}
          rowKey='id'
          loading={loading}
          showHeader={false}
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
      {openModalReview && (
        <ModalReviewWidget
          open={openModalReview}
          onClose={handleCloseModalReview}
          initialValues={dataReview}
          notify={notify}
          formInstance={formInstance}
        />
      )}
    </>
  );
};

export default ProductReview;
