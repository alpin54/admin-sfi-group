// -- libraries
import { useEffect } from 'react';
import { Modal, Button, Form, Input } from 'antd';

// -- utils
import LocalStorage from '@utils/localStorage';
import FormData from '@utils/formdata';

const ModalPromotionsView = ({
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
  const title = 'Material';

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
      <Button type='primary' htmlType='submit' form='form-Promotions' loading={loading}>
        Save
      </Button>
    </>
  );

  return (
    <Modal
      title={method === 'add' ? `Add ${title}` : `Edit ${title}`}
      width={560}
      onClose={onClose}
      open={open}
      footer={footerComponent}
      onCancel={onClose}
      closable={true}
      className='modal-form'>
      <Form form={formInstance} id='form-promotions' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>
        <Form.Item
          name='name'
          label='Promotions Name'
          rules={[{ required: true, message: 'Please enter promotions name' }]}>
          <Input allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalPromotionsView;
