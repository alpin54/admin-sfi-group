// -- libraries
import { useEffect } from 'react';
import { Modal, Button, Form, Input, ColorPicker } from 'antd';

// -- utils
import LocalStorage from '@utils/localStorage';
import UploadImage from '@components/Elements/UploadImage/views';

const ModalBrandView = ({
  open,
  onClose,
  method,
  initialValues,
  formInstance,
  notify,
  onSubmit,
  message,
  loading,
  refetch
}) => {
  const methodType = method === 'add' ? 'post' : 'put';
  const user = LocalStorage.get('user');
  const msg = method === 'add' ? `Added` : 'changed';
  const title = 'Brand';

  useEffect(() => {
    if (open) {
      if (method === 'add') {
        formInstance.resetFields();
      } else {
        if (initialValues) {
          formInstance.setFieldsValue(initialValues);
        }
      }
    }
  }, [open, method, initialValues, formInstance]);

  useEffect(() => {
    if (message) {
      notify({
        type: 'error',
        message: `${title} Failed`,
        description: message
      });
    }
  }, [message, notify, title]);

  const handleFinish = async (values) => {
    try {
      const payload = {
        ...values,
        ...(methodType === 'post'
          ? {
              status: true,
              created_by: user?.id
            }
          : {
              updated_by: user?.id
            })
      };

      const response = await onSubmit(payload, methodType);

      if (response) {
        notify({
          type: 'success',
          message: `Data ${msg} successfully`
        });
        formInstance?.resetFields();
        onClose();
        refetch();
      }
    } catch (err) {
      notify({
        type: 'error',
        message: `Data failed to ${msg}`,
        description: err?.message ?? 'Unknown error'
      });
    }
  };

  const footerComponent = (
    <>
      <Button color='primary' variant='outlined' onClick={onClose}>
        Cancel
      </Button>
      <Button type='primary' htmlType='submit' form='form-brand' loading={loading}>
        Save
      </Button>
    </>
  );

  return (
    <Modal
      title={method === 'add' ? `Add ${title}` : `Edit ${title}`}
      width={600}
      open={open}
      footer={footerComponent}
      onCancel={onClose}
      closable={true}
      className='modal-form'>
      <Form form={formInstance} id='form-brand' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>

        <Form.Item name='image' label='Brand Logo' valuePropName='file' getValueFromEvent={(e) => e} help='80px x 40px'>
          <UploadImage value={{ url: initialValues?.image }} />
        </Form.Item>
        <Form.Item name='name' label='Brand Name' rules={[{ required: true, message: 'Please enter brand name' }]}>
          <Input allowClear />
        </Form.Item>
        <Form.Item name='tagline' label='Tagline' rules={[{ required: true, message: 'Please enter tagline' }]}>
          <Input allowClear />
        </Form.Item>
        <Form.Item
          name='code'
          label='Color'
          rules={[{ required: true, message: 'Please select a color' }]}
          valuePropName='value'
          trigger='onChange'
          getValueFromEvent={(code) => {
            try {
              return code ? code.toHexString() : '';
            } catch {
              return code;
            }
          }}>
          <ColorPicker
            showText
            allowClear
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              padding: '8px 16px',
              width: '100%'
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalBrandView;
