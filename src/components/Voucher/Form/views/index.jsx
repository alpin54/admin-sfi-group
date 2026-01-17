// -- libraries
import { useEffect, useState } from 'react';
import {
  Breadcrumb,
  Form,
  Button,
  Input,
  InputNumber,
  Flex,
  Collapse,
  Col,
  Row,
  Card,
  Checkbox,
  DatePicker,
  Empty,
  Popover,
  Space
} from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

// -- icons
import { DeleteOutlined, DownOutlined } from '@ant-design/icons';

// -- styles
import style from '@components/Voucher/Form/styles/style.module.scss';

// -- hooks
import useNotification from '@hooks/useNotification';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- utils
import Currency from '@utils/currency';

// -- components
import ModalProductWidget from '@components/Voucher/ModalProduct/widgets/Default';
import ModalCategoryWidget from '@components/Voucher/ModalCategory/widgets/Default';

// -- elements
import CardUserLog from '@components/Elements/CardUserLog/widgets/Default';

const VoucherFormView = (props) => {
  const { slug, action, data, loading, message, onSubmit } = props;
  const { notify, contextHolder: notificationHolder } = useNotification();
  const [formInstance] = Form.useForm();
  const [viewOnly, setViewOnly] = useState(action === 'detail');
  const [voucherQuantityType, setVoucherQuantityType] = useState('unlimited');
  const [voucherVisibility, setVoucherVisibility] = useState('public');
  const [voucherType, setVoucherType] = useState('guest');
  const [discountTarget, setDiscountTarget] = useState('all');
  const [validityType, setValidityType] = useState('unlimited');
  const [conditionType, setConditionType] = useState('');
  const [openModalProduct, setOpenModalProduct] = useState(false);
  const [openModalCategory, setOpenModalCategory] = useState(false);
  const [dataProduct, setDataProduct] = useState([]);
  const [productIds, setProductIds] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const user = LocalStorage.get('user');
  const router = useRouter();

  // -- NEW: generate code helpers
  // Generates a human-friendly voucher code and sets it into the form
  const generateRandomCode = (length = 8, separator = '-', group = 4) => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let raw = '';
    for (let i = 0; i < length; i++) {
      raw += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (group > 0 && separator && raw.length > group) {
      const parts = [];
      for (let i = 0; i < raw.length; i += group) {
        parts.push(raw.substr(i, group));
      }
      return parts.join(separator);
    }
    return raw;
  };

  const handleGenerateCode = async (opts = {}) => {
    try {
      const length = opts.length ?? 8;
      const separator = opts.separator ?? '-';
      const group = opts.group ?? 4;
      const copy = opts.copyToClipboard ?? true;

      const code = generateRandomCode(length, separator, group);

      // langsung isi ke field form 'code'
      formInstance.setFieldsValue({ code });

      if (copy && typeof navigator !== 'undefined' && navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(code);
          notify({ type: 'success', message: 'Kode dibuat & disalin', description: `Kode: ${code}` });
        } catch {
          notify({ type: 'success', message: 'Kode dibuat', description: `Kode: ${code} (gagal salin otomatis)` });
        }
      } else {
        notify({ type: 'success', message: 'Kode dibuat', description: `Kode: ${code}` });
      }
    } catch (err) {
      notify({ type: 'error', message: 'Gagal membuat kode', description: err?.message ?? 'Unknown error' });
    }
  };

  // Initialize form and local states when `data` is provided
  useEffect(() => {
    if (data && formInstance) {
      // Map API data to form fields
      const initial = {
        id: data.id,
        name: data.name,
        code: data.code,
        voucher_quantity: data.quantity || undefined
      };

      // Voucher quantity type
      if (data.hasOwnProperty('is_unlimited_qty')) {
        setVoucherQuantityType(data.is_unlimited_qty ? 'unlimited' : 'set');
      }

      // Apply to
      if (data.apply_to === 'ALL') setDiscountTarget('all');
      else if (data.apply_to === 'PRODUCT') setDiscountTarget('product');
      else if (data.apply_to === 'CATEGORY') setDiscountTarget('category');

      // Validity
      if (data.hasOwnProperty('is_valid_unlimited')) {
        setValidityType(data.is_valid_unlimited ? 'unlimited' : 'date');
        if (!data.is_valid_unlimited) {
          if (data.valid_from) initial.start_date = dayjs(data.valid_from);
          if (data.valid_until) initial.end_date = dayjs(data.valid_until);
        }
      }

      // Conditions / discount mapping
      // Determine conditionType based on presence of min_spend and discount_type
      if (
        data.discount_type === 'NOMINAL' &&
        (data.min_spend || data.min_spend === 0) &&
        (data.discount_value || data.discount_value === 0)
      ) {
        setConditionType('min_spend_amount');
        initial.min_spend_amount = data.min_spend;
        initial.min_spend_discount = data.discount_value;
      } else if (
        data.discount_type === 'PERCENTAGE' &&
        (data.min_spend || data.min_spend === 0) &&
        (data.discount_value || data.discount_value === 0)
      ) {
        setConditionType('min_spend_percentage');
        initial.min_spend_amount = data.min_spend;
        initial.min_spend_percentage = data.discount_value;
      } else if (data.discount_type === 'NOMINAL') {
        setConditionType('discount_amount');
        initial.discount_amount = data.discount_value;
      } else if (data.discount_type === 'PERCENTAGE') {
        setConditionType('percentage');
        initial.percentage = data.discount_value;
      }

      // Products & categories:
      // Support both arrays of objects and arrays of ids.
      if (Array.isArray(data.products)) {
        if (data.products.length > 0 && typeof data.products[0] === 'object') {
          setDataProduct(data.products);
          setProductIds(data.products.map((p) => p.id));
        } else {
          setDataProduct([]);
          setProductIds(data.products);
        }
      }

      if (Array.isArray(data.categories)) {
        if (data.categories.length > 0 && typeof data.categories[0] === 'object') {
          setDataCategory(data.categories);
          setCategoryIds(data.categories.map((c) => c.id));
        } else {
          setDataCategory([]);
          setCategoryIds(data.categories);
        }
      }

      formInstance.setFieldsValue(initial);
    }
  }, [data, formInstance]);

  useEffect(() => {
    if (message) {
      notify({
        type: 'error',
        message: `Data failed!`,
        description: message
      });
    }
  }, [message, notify]);

  const handleSaveItems = (selectedData, type) => {
    if (type === 'product') {
      // selectedData can be array of objects or array of ids
      if (selectedData && selectedData.length > 0 && typeof selectedData[0] === 'object') {
        setDataProduct(selectedData);
        setProductIds(selectedData.map((d) => d.id));
      } else {
        // array of ids
        setDataProduct([]); // no rich data available
        setProductIds(selectedData || []);
      }
      setOpenModalProduct(false);
    } else {
      if (selectedData && selectedData.length > 0 && typeof selectedData[0] === 'object') {
        setDataCategory(selectedData);
        setCategoryIds(selectedData.map((d) => d.id));
      } else {
        setDataCategory([]);
        setCategoryIds(selectedData || []);
      }
      setOpenModalCategory(false);
    }
  };

  // Fungsi Delete
  const handleDeleteItems = (product, type) => {
    if (type === 'product') {
      setDataProduct((prev) => prev.filter((item) => item.id !== product.id));
      setProductIds((prev) => prev.filter((id) => id !== product.id));
    } else {
      setDataCategory((prev) => prev.filter((item) => item.id !== product.id));
      setCategoryIds((prev) => prev.filter((id) => id !== product.id));
    }
  };

  // Submit form
  const handleFinish = async (values) => {
    try {
      // Build payload according to the required shape
      // Map apply_to
      const applyToMap = {
        all: 'ALL',
        product: 'PRODUCT',
        category: 'CATEGORY'
      };

      // Determine discount type and values
      let discount_type = null;
      let discount_value = null;
      let min_spend = null;
      let min_spend_percent = null;

      if (conditionType === 'discount_amount') {
        discount_type = 'NOMINAL';
        discount_value = values.discount_amount ?? null;
      } else if (conditionType === 'percentage') {
        discount_type = 'PERCENTAGE';
        discount_value = values.percentage ?? null;
      } else if (conditionType === 'min_spend_amount') {
        discount_type = 'NOMINAL';
        discount_value = values.min_spend_discount ?? null;
        min_spend = values.min_spend_amount ?? null;
      } else if (conditionType === 'min_spend_percentage') {
        discount_type = 'PERCENTAGE';
        discount_value = values.min_spend_percentage ?? null;
        min_spend = values.min_spend_amount ?? null;
      }

      // Dates
      const valid_from =
        validityType === 'date' && values.start_date ? dayjs(values.start_date).startOf('day').toISOString() : null;
      const valid_until =
        validityType === 'date' && values.end_date ? dayjs(values.end_date).endOf('day').toISOString() : null;

      const payload = {
        id: values.id,
        name: values.name,
        code: data ? data.code : generateRandomCode(),
        is_unlimited_qty: voucherQuantityType === 'unlimited',
        quantity: voucherQuantityType === 'set' ? (values.voucher_quantity ?? 0) : 0,
        issued: data?.issued ?? 0,
        apply_to: applyToMap[discountTarget] ?? 'ALL',
        discount_type,
        discount_value,
        min_spend,
        min_spend_percent: min_spend_percent ?? null,
        is_valid_unlimited: validityType === 'unlimited',
        valid_from,
        valid_until,
        products: productIds,
        categories: categoryIds,
        ...(slug
          ? {
              updated_by: user?.id ?? null
            }
          : {
              status: data?.status ?? true,
              created_by: user?.id ?? null
            })
      };

      const response = await onSubmit(payload, slug ? 'put' : 'post');

      if (response) {
        notify({
          type: 'success',
          message: `Data saved successfully`
        });
        // Redirect to voucher list after save
        router.push('/voucher');
      }
    } catch (err) {
      notify({
        type: 'error',
        message: `Data failed to save`,
        description: err?.message ?? 'Unknown error'
      });
    }
  };

  // Enable form edit
  const handleEnableForm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setViewOnly(false);
  };

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

  // UI render
  return (
    <>
      {notificationHolder}
      <section id='voucher-form' className='section-form'>
        <div className='row-container'>
          <Breadcrumb
            items={[
              { title: <Link href='/voucher'>Voucher</Link> },
              {
                title:
                  action === 'add'
                    ? 'Add Voucher'
                    : action === 'edit'
                      ? `Edit ${data?.name ?? ''}`
                      : `Details ${data?.name ?? ''}`
              }
            ]}
          />
        </div>
        <Form form={formInstance} id='form-voucher' layout='vertical' onFinish={handleFinish} autoComplete='off'>
          {/* Product ID */}
          <Form.Item name='id' hidden>
            <Input />
          </Form.Item>
          <Row gutter={24}>
            {/* LEFT SIDE */}
            <Col span={15}>
              {/* General Information */}
              <Collapse
                expandIconPosition='end'
                expandIcon={() => <DownOutlined />}
                defaultActiveKey={['general-information', 'discount-details']}
                items={[
                  {
                    key: 'general-information',
                    label: 'General Information',
                    children: (
                      <>
                        <Form.Item
                          label='Voucher Name'
                          name='name'
                          rules={[{ required: true, message: 'Please input voucher name!' }]}>
                          <Input placeholder='Enter voucher name' disabled={viewOnly} />
                        </Form.Item>
                        <Form.Item
                          label='Voucher Code'
                          name='code'
                          rules={[{ required: true, message: 'Please input voucher code!' }]}>
                          <Flex gap={12}>
                            <Input placeholder='Enter voucher code' disabled={viewOnly} />
                            <Button type='primary' disabled={viewOnly} onClick={() => handleGenerateCode()}>
                              Generate Code
                            </Button>
                          </Flex>
                        </Form.Item>
                      </>
                    )
                  },
                  {
                    key: 'discount-details',
                    label: 'Discount Details',
                    children: (
                      <>
                        {/* Validity Period */}
                        <Form.Item label='Validity Period'>
                          <Card className={style.card}>
                            <Row gutter={[16, 16]}>
                              <Col span={12}>
                                <Checkbox
                                  checked={validityType === 'unlimited'}
                                  onChange={() => setValidityType('unlimited')}
                                  disabled={viewOnly}>
                                  Unlimited
                                </Checkbox>
                              </Col>
                              <Col span={12}>
                                <Checkbox
                                  checked={validityType === 'date'}
                                  onChange={() => setValidityType('date')}
                                  disabled={viewOnly}>
                                  Start and Expiry Date
                                </Checkbox>
                              </Col>
                              {validityType === 'date' && (
                                <>
                                  <Col span={12}>
                                    <Form.Item name='start_date'>
                                      <DatePicker
                                        allowClear={false}
                                        format='DD MMM YYYY'
                                        placeholder='start date'
                                        disabled={viewOnly}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item name='end_date'>
                                      <DatePicker
                                        allowClear={false}
                                        format='DD MMM YYYY'
                                        placeholder='end date'
                                        disabled={viewOnly}
                                      />
                                    </Form.Item>
                                  </Col>
                                </>
                              )}
                            </Row>
                          </Card>
                        </Form.Item>
                        {/* Conditions */}
                        <Form.Item label='Conditions'>
                          <Card>
                            <Row gutter={[16, 16]}>
                              <Col span={12}>
                                <Checkbox
                                  checked={conditionType === 'discount_amount'}
                                  onChange={() => setConditionType('discount_amount')}
                                  disabled={viewOnly}>
                                  Discount Amount (Rp)
                                </Checkbox>
                              </Col>
                              <Col span={12}>
                                <Checkbox
                                  checked={conditionType === 'percentage'}
                                  onChange={() => setConditionType('percentage')}
                                  disabled={viewOnly}>
                                  Discount Percentage (%)
                                </Checkbox>
                              </Col>
                              <Col span={12}>
                                <Checkbox
                                  checked={conditionType === 'min_spend_amount'}
                                  onChange={() => setConditionType('min_spend_amount')}
                                  disabled={viewOnly}>
                                  Min. Spend & Discount (Rp)
                                </Checkbox>
                              </Col>
                              <Col span={12}>
                                <Checkbox
                                  checked={conditionType === 'min_spend_percentage'}
                                  onChange={() => setConditionType('min_spend_percentage')}
                                  disabled={viewOnly}>
                                  Min. Spend & Discount (%)
                                </Checkbox>
                              </Col>
                              {conditionType === 'discount_amount' && (
                                <Col span={24}>
                                  <Form.Item name='discount_amount'>
                                    <InputNumber
                                      min={0}
                                      step={1000}
                                      placeholder='Rp'
                                      disabled={viewOnly}
                                      formatter={(value) => {
                                        if (value) {
                                          return Currency.formatRp(value);
                                        }
                                        return '';
                                      }}
                                      parser={(value) => {
                                        const parsed = Currency.removeRp(value || '');
                                        return parsed !== undefined && parsed !== null ? Number(parsed) : 0;
                                      }}
                                    />
                                  </Form.Item>
                                </Col>
                              )}
                              {conditionType === 'percentage' && (
                                <Col span={24}>
                                  <Form.Item name='percentage'>
                                    <InputNumber min={1} max={100} suffix='%' disabled={viewOnly} />
                                  </Form.Item>
                                </Col>
                              )}
                              {conditionType === 'min_spend_amount' && (
                                <>
                                  <Col span={12}>
                                    <Form.Item name='min_spend_amount'>
                                      <InputNumber
                                        min={0}
                                        step={1000}
                                        placeholder='Rp'
                                        disabled={viewOnly}
                                        formatter={(value) => {
                                          if (value) {
                                            return Currency.formatRp(value);
                                          }
                                          return '';
                                        }}
                                        parser={(value) => {
                                          const parsed = Currency.removeRp(value || '');
                                          return parsed !== undefined && parsed !== null ? Number(parsed) : 0;
                                        }}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item name='min_spend_discount'>
                                      <InputNumber
                                        min={0}
                                        step={1000}
                                        placeholder='Rp'
                                        disabled={viewOnly}
                                        formatter={(value) => {
                                          if (value) {
                                            return Currency.formatRp(value);
                                          }
                                          return '';
                                        }}
                                        parser={(value) => {
                                          const parsed = Currency.removeRp(value || '');
                                          return parsed !== undefined && parsed !== null ? Number(parsed) : 0;
                                        }}
                                      />
                                    </Form.Item>
                                  </Col>
                                </>
                              )}
                              {conditionType === 'min_spend_percentage' && (
                                <>
                                  <Col span={12}>
                                    <Form.Item name='min_spend_amount'>
                                      <InputNumber
                                        min={0}
                                        step={1000}
                                        placeholder='Rp'
                                        disabled={viewOnly}
                                        formatter={(value) => {
                                          if (value) {
                                            return Currency.formatRp(value);
                                          }
                                          return '';
                                        }}
                                        parser={(value) => {
                                          const parsed = Currency.removeRp(value || '');
                                          return parsed !== undefined && parsed !== null ? Number(parsed) : 0;
                                        }}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                    <Form.Item name='min_spend_percentage'>
                                      <InputNumber min={1} max={100} suffix='%' disabled={viewOnly} />
                                    </Form.Item>
                                  </Col>
                                </>
                              )}
                            </Row>
                          </Card>
                        </Form.Item>
                        {/* Apply Discount to */}
                        <Form.Item label='Apply Discount to'>
                          <Card className={style.card}>
                            <Row className={style.row} gutter={[16, 16]}>
                              <Col span={8}>
                                <Checkbox
                                  checked={discountTarget === 'all'}
                                  onChange={() => setDiscountTarget('all')}
                                  disabled={viewOnly}>
                                  All Product
                                </Checkbox>
                              </Col>
                              <Col span={8}>
                                <Checkbox
                                  checked={discountTarget === 'product'}
                                  onChange={() => setDiscountTarget('product')}
                                  disabled={viewOnly}>
                                  Selected Product
                                </Checkbox>
                              </Col>
                              <Col span={8}>
                                <Checkbox
                                  checked={discountTarget === 'category'}
                                  onChange={() => setDiscountTarget('category')}
                                  disabled={viewOnly}>
                                  Selected Category
                                </Checkbox>
                              </Col>
                            </Row>

                            {discountTarget === 'product' && (
                              <Row className={style.row} gutter={[16, 16]}>
                                {dataProduct && dataProduct.length > 0 ? (
                                  dataProduct.map((product) => (
                                    <Col span={12} key={product.id}>
                                      <div className={style.item}>
                                        <div className={style.box}>
                                          <div className={style.img}>
                                            {/* guard image props to avoid error if missing */}
                                            <Image
                                              src={product.image ?? ''}
                                              alt={product.name ?? ''}
                                              width={96}
                                              height={96}
                                            />
                                          </div>
                                          <div className={style.text}>
                                            <p className={style.label}>{product.sku ?? ''}</p>
                                            <p className={style.name}>{product.name ?? ''}</p>
                                            {/* <p className={style.price}>
                                              {product.variants && product.variants.length > 0 ? (
                                                (() => {
                                                  const content = renderVariantsPopoverContent(product.variants);
                                                  const display = `${product.variants[0].sku ?? '-'}${product.variants.length > 1 ? ` (+${product.variants.length - 1})` : ''}`;
                                                  return (
                                                    <Popover content={content} title='Variants' trigger='click'>
                                                      <a>{display}</a>
                                                    </Popover>
                                                  );
                                                })()
                                              ) : (
                                                <>
                                                  {product.sale_price > 0 && (
                                                    <del>{Currency.formatRp(product.price)}</del>
                                                  )}
                                                  <span>
                                                    {Currency.formatRp(
                                                      product.sale_price > 0 ? product.sale_price : product.price
                                                    )}
                                                  </span>
                                                </>
                                              )}
                                            </p> */}
                                          </div>
                                        </div>
                                        <button
                                          className={style.button}
                                          type='button'
                                          onClick={() => handleDeleteItems(product, 'product')}>
                                          <DeleteOutlined />
                                        </button>
                                      </div>
                                    </Col>
                                  ))
                                ) : productIds && productIds.length > 0 ? (
                                  // If only ids are present, show simple list of ids
                                  productIds.map((id) => (
                                    <Col span={12} key={id}>
                                      <div className={style.item}>
                                        <div className={style.box}>
                                          <div className={style.text}>
                                            <p className={style.name}>Product ID: {id}</p>
                                          </div>
                                        </div>
                                        <button
                                          className={style.button}
                                          type='button'
                                          onClick={() => {
                                            // remove by id
                                            setProductIds((prev) => prev.filter((pid) => pid !== id));
                                          }}>
                                          <DeleteOutlined />
                                        </button>
                                      </div>
                                    </Col>
                                  ))
                                ) : (
                                  <Col span={24}>
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                  </Col>
                                )}
                                <Col span={24}>
                                  <Button
                                    htmlType='button'
                                    color='primary'
                                    variant='outlined'
                                    onClick={() => setOpenModalProduct(true)}
                                    size='small'>
                                    Add Product
                                  </Button>
                                </Col>
                              </Row>
                            )}
                            {discountTarget === 'category' && (
                              <Row className={style.row} gutter={[16, 16]}>
                                {dataCategory && dataCategory.length > 0 ? (
                                  dataCategory.map((category) => (
                                    <Col span={12} key={category.id}>
                                      <div className={style.item}>
                                        <div className={style.box}>
                                          <div className={style.text}>
                                            <p className={style.name}>{category.name}</p>
                                          </div>
                                        </div>
                                        <button
                                          className={style.button}
                                          type='button'
                                          onClick={() => handleDeleteItems(category, 'category')}>
                                          <DeleteOutlined />
                                        </button>
                                      </div>
                                    </Col>
                                  ))
                                ) : categoryIds && categoryIds.length > 0 ? (
                                  categoryIds.map((id) => (
                                    <Col span={12} key={id}>
                                      <div className={style.item}>
                                        <div className={style.box}>
                                          <div className={style.text}>
                                            <p className={style.name}>Category ID: {id}</p>
                                          </div>
                                        </div>
                                        <button
                                          className={style.button}
                                          type='button'
                                          onClick={() => {
                                            setCategoryIds((prev) => prev.filter((cid) => cid !== id));
                                          }}>
                                          <DeleteOutlined />
                                        </button>
                                      </div>
                                    </Col>
                                  ))
                                ) : (
                                  <Col span={24}>
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                  </Col>
                                )}
                                <Col span={24}>
                                  <Button
                                    htmlType='button'
                                    color='primary'
                                    variant='outlined'
                                    size='small'
                                    onClick={() => setOpenModalCategory(true)}>
                                    Add Category
                                  </Button>
                                </Col>
                              </Row>
                            )}
                          </Card>
                        </Form.Item>
                      </>
                    )
                  }
                ]}
              />
            </Col>
            {/* RIGHT SIDE */}
            <Col span={9}>
              <Card>
                <Form.Item label='Visibility'>
                  <Card>
                    <Space direction='vertical' size={16}>
                      <Checkbox
                        checked={voucherVisibility === 'public'}
                        onChange={() => setVoucherVisibility('public')}
                        disabled={viewOnly}>
                        Public
                      </Checkbox>
                      <Checkbox
                        checked={voucherVisibility === 'private'}
                        onChange={() => setVoucherVisibility('private')}
                        disabled={viewOnly}>
                        Private
                      </Checkbox>
                    </Space>
                  </Card>
                </Form.Item>
              </Card>
              <Card>
                <Form.Item label='Type'>
                  <Card>
                    <Space direction='vertical' size={16}>
                      <Checkbox
                        checked={voucherType === 'guest'}
                        onChange={() => setVoucherType('guest')}
                        disabled={viewOnly}>
                        Guest
                      </Checkbox>
                      <Checkbox
                        checked={voucherType === 'member'}
                        onChange={() => setVoucherType('member')}
                        disabled={viewOnly}>
                        Member
                      </Checkbox>
                      <Checkbox
                        checked={voucherType === 'dealer'}
                        onChange={() => setVoucherType('dealer')}
                        disabled={viewOnly}>
                        Dealer
                      </Checkbox>
                    </Space>
                  </Card>
                </Form.Item>
              </Card>
              <Card>
                <Form.Item label='Voucher Quantity'>
                  <Card>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Checkbox
                          checked={voucherQuantityType === 'unlimited'}
                          onChange={() => setVoucherQuantityType('unlimited')}
                          disabled={viewOnly}>
                          Unlimited
                        </Checkbox>
                      </Col>
                      <Col span={12}>
                        <Checkbox
                          checked={voucherQuantityType === 'set'}
                          onChange={() => setVoucherQuantityType('set')}
                          disabled={viewOnly}>
                          Set Quantity
                        </Checkbox>
                      </Col>
                      {voucherQuantityType === 'set' && (
                        <Col span={24}>
                          <Form.Item name='voucher_quantity'>
                            <InputNumber min={1} disabled={viewOnly} />
                          </Form.Item>
                        </Col>
                      )}
                    </Row>
                  </Card>
                </Form.Item>
              </Card>
            </Col>
          </Row>
          {/* Submit Button */}
          <Form.Item shouldUpdate className='floating-btn'>
            <Flex justify='end' gap={16}>
              <Link href='/voucher'>
                <Button color='primary' variant='outlined'>
                  Cancel
                </Button>
              </Link>
              {viewOnly ? (
                <Button type='primary' htmlType='button' onClick={handleEnableForm}>
                  Edit
                </Button>
              ) : (
                <Button type='primary' htmlType='submit' form='form-voucher' loading={loading}>
                  Save
                </Button>
              )}
            </Flex>
          </Form.Item>
        </Form>
        {slug && (
          <CardUserLog
            created_by={data?.created_by}
            updated_by={data?.updated_by}
            created_at={data?.created_at}
            updated_at={data?.updated_at}
          />
        )}
        {/* Modal */}
        {openModalProduct && (
          <ModalProductWidget
            open={openModalProduct}
            onClose={() => setOpenModalProduct(false)}
            initialValues={dataProduct.length > 0 ? dataProduct : productIds}
            notify={notify}
            onSave={handleSaveItems}
          />
        )}
        {openModalCategory && (
          <ModalCategoryWidget
            open={openModalCategory}
            onClose={() => setOpenModalCategory(false)}
            initialValues={dataCategory.length > 0 ? dataCategory : categoryIds}
            notify={notify}
            onSave={handleSaveItems}
          />
        )}
      </section>
    </>
  );
};

export default VoucherFormView;
