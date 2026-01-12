// -- libraries
import { useEffect } from 'react';
import { Button, Modal, Form, Input, Space } from 'antd';

// -- utils
import LocalStorage from '@utils/localStorage';

const ModalCustomerView = (props) => {
  const { open, onClose, initialValues, notify, onSubmit, message, loading, refetch } = props;
  const [formInstance] = Form.useForm();
  const user = LocalStorage.get('user');

  useEffect(() => {
    if (open) {
      formInstance?.setFieldsValue(initialValues);
    }
  }, [open, initialValues, formInstance]);

  useEffect(() => {
    if (message) {
      notify({
        type: 'error',
        message: 'Edit Customer Failed!',
        description: message
      });
    }
  }, [message, notify]);

  const handleFinish = async (values) => {
    try {
      const payload = {
        ...values,
        updated_by: user?.id
      };

      // Submit form data
      const response = await onSubmit(payload);

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
    <Space size={12}>
      <Button color='primary' variant='outlined' onClick={onClose}>
        Cancel
      </Button>
      <Button type='primary' htmlType='submit' form='form-customers' loading={loading}>
        Save
      </Button>
    </Space>
  );

  return (
    <Modal
      title='Customers'
      width={600}
      onClose={onClose}
      open={open}
      footer={footerComponent}
      onCancel={onClose}
      closable={true}
      className='modal-form'
      size='large'>
      <Form form={formInstance} id='form-customers' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='name' rules={[{ required: true, message: 'Please input customer name!' }]}>
          <Input placeholder='Input customer name' />
        </Form.Item>
        <Form.Item
          name='phone'
          rules={[
            { required: true, message: 'Please input customer phone!' },
            { pattern: /^\d+$/, message: 'Phone must be numeric!' },
            { min: 10, message: 'Phone must be at least 10 digits!' }
          ]}>
          <Input placeholder='Input customer phone' />
        </Form.Item>
        <Form.Item
          name='email'
          rules={[
            { required: true, message: 'Please input customer email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}>
          <Input placeholder='Input customer email' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCustomerView;
