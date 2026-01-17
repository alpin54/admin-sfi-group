// -- libraries
import { useEffect, useState } from 'react';
import { Button, Drawer, Form, Input, Space, Checkbox, Spin, Empty, Popover } from 'antd';
import Image from 'next/image';

// -- icons
import { SearchOutlined } from '@ant-design/icons';

// -- styles
import style from '@components/Voucher/ModalProduct/styles/style.module.scss';

// -- utils
import Currency from '@utils/currency';

const ModalProductView = (props) => {
  const { open, onClose, initialValues, notify, onSave, products, filters, loading, listRef, onFilterChange } = props;
  const [formInstance] = Form.useForm();
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    if (open) {
      setSelectedProducts(initialValues || []);
    }
  }, [open, initialValues]);

  const handleCheck = (checked, product) => {
    setSelectedProducts((prev) => (checked ? [...prev, product] : prev.filter((p) => p.id !== product.id)));
  };

  const handleFinish = async () => {
    try {
      onSave?.(selectedProducts, 'product');
      onClose?.();
      notify?.({
        type: 'success',
        message: `Data added successfully`
      });
    } catch (err) {
      notify?.({
        type: 'error',
        message: `Data failed to added`,
        description: err?.message ?? 'Unknown error'
      });
    }
  };

  const footerComponent = (
    <Space size={12}>
      <Button color='primary' variant='outlined' onClick={onClose}>
        Cancel
      </Button>
      <Button type='primary' htmlType='submit' form='form-selected-product'>
        Save
      </Button>
    </Space>
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

  return (
    <Drawer
      title='Product'
      width={600}
      onClose={onClose}
      open={open}
      footer={footerComponent}
      onCancel={onClose}
      closable={true}
      className='drawer-form'>
      <div className={style.search}>
        <Input
          placeholder='Search ...'
          suffix={<SearchOutlined />}
          allowClear
          value={filters?.keyword}
          onChange={(e) => onFilterChange({ keyword: e.target.value })}
        />
      </div>
      <Form form={formInstance} id='form-selected-product' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <div ref={listRef} className={style.list}>
          {products.map((product) => (
            <div className={style.item} key={product.id}>
              <div className={style.img}>
                <Image src={product.image} alt={product.name} width={72} height={72} />
              </div>
              <div className={style.text}>
                <p className={style.label}>{product.sku}</p>
                <p className={style.name}>{product.name}</p>
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
                      {product.sale_price > 0 && <del>{Currency.formatRp(product.price)}</del>}
                      <span>{Currency.formatRp(product.sale_price > 0 ? product.sale_price : product.price)}</span>
                    </>
                  )}
                </p> */}
              </div>
              <div className={style.checkbox}>
                <Checkbox
                  checked={selectedProducts.some((p) => p.id === product.id)}
                  onChange={(e) => handleCheck(e.target.checked, product)}
                />
              </div>
            </div>
          ))}
          {loading && (
            <div className={style.empty}>
              <Spin />
            </div>
          )}
          {!loading && products.length === 0 && (
            <div className={style.empty}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}
        </div>
      </Form>
    </Drawer>
  );
};

export default ModalProductView;
