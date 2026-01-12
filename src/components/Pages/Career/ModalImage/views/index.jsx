import { useEffect } from 'react';
import { Button, Modal, Form, Input, notification } from 'antd';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- utils
import FormData from '@utils/formdata';

// -- elements
import UploadImage from '@components/Elements/UploadImage/views';

const ModalImageView = (props) => {
  const { method, open, onClose, initialValues, formInstance, notify, onSubmit, message, loading, refetch } = props;

  const methodType = method === 'edit' ? 'put' : 'post';
  const user = LocalStorage.get('user');
  const title = method === 'add' ? 'Add Banner' : method === 'edit' ? 'Edit Banner' : 'Detail Banner';
  const msg = method === 'add' ? 'Added' : method === 'edit' ? 'changed' : '';

  useEffect(() => {
    if (open) {
      if (methodType === 'add') {
        formInstance?.resetFields();
      } else if (initialValues) {
        formInstance?.setFieldsValue(initialValues);
      }
    }
  }, [open, methodType, initialValues, formInstance]);

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
        status: 1,
        ...(methodType === 'post'
          ? {
              created_by: user?.id
            }
          : {
              updated_by: user?.id
            })
      };

      const formData = FormData(payload);

      // Submit form data
      const response = await onSubmit(formData, methodType);

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
      <Button type='primary' htmlType='submit' form='form-career'>
        Save
      </Button>
    </>
  );

  return (
    <Modal
      title={title}
      width={600}
      open={open}
      footer={footerComponent}
      onCancel={onClose}
      closable={true}
      className='modal-form'>
      <Form form={formInstance} id='form-career' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>
        <Form.Item label='Image' name='image' valuePropName='file' getValueFromEvent={(e) => e} help='1440px x 740px'>
          <UploadImage value={{ url: initialValues?.image ? initialValues?.image : '' }} />
        </Form.Item>
        <Form.Item name='title' label='Title ' rules={[{ required: true, message: 'Title is required' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalImageView;
