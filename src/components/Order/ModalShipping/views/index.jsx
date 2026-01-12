// -- libraries
import { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Space, Checkbox, Spin, Empty } from 'antd';
import Image from 'next/image';

// -- styles
import style from '@components/Order/ModalShipping/styles/style.module.scss';

// -- utils
import Currency from '@utils/currency';

const ModalShippingView = (props) => {
  const { open, onClose, initialValues, notify, onSave, shipping, loading } = props;
  const [formInstance] = Form.useForm();
  const [selectedShipping, setSelectedShipping] = useState();

  useEffect(() => {
    if (open) {
      setSelectedShipping(initialValues);
    }
  }, [open, initialValues]);

  const handleCheck = (checked, code) => {
    setSelectedShipping(checked ? code : undefined);
  };

  const handleFinish = async () => {
    const selected = shipping.find((s) => s.code === selectedShipping);
    try {
      onSave?.(selected);
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
      <Button type='primary' htmlType='submit' form='form-selected-shipping'>
        Save
      </Button>
    </Space>
  );

  return (
    <Modal
      title='shipping'
      width={600}
      onClose={onClose}
      open={open}
      footer={footerComponent}
      onCancel={onClose}
      closable={true}
      className='modal-form'
      size='large'>
      <Form
        form={formInstance}
        id='form-selected-shipping'
        layout='vertical'
        onFinish={handleFinish}
        autoComplete='off'>
        <div className={style.list}>
          {shipping.map((item) => (
            <div className={style.item} key={item.code}>
              <div className={style.img}>
                <Image src={item.image} alt={item.name} width={56} height={56} />
              </div>
              <div className={style.text}>
                <div className={style.row}>
                  <p className={style.name}>{item.name}</p>
                  <p className={style.price}>
                    <span>{Currency.formatRp(item.price)}</span>
                  </p>
                </div>
                <div className={style.row}>
                  <p className={style.desc}>Estimasi {item.estimate}</p>
                </div>
              </div>
              <div className={style.checkbox}>
                <Checkbox
                  checked={selectedShipping === item.code}
                  onChange={(e) => handleCheck(e.target.checked, item.code)}
                  disabled={selectedShipping && selectedShipping !== item.code}
                />
              </div>
            </div>
          ))}
          {loading && (
            <div className={style.empty}>
              <Spin />
            </div>
          )}
          {!loading && shipping.length === 0 && (
            <div className={style.empty}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}
        </div>
      </Form>
    </Modal>
  );
};

export default ModalShippingView;
