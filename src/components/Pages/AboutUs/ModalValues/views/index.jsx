// -- libraries
import { useEffect } from 'react';
import { Button, Modal, Input, Form } from 'antd';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- utils
import FormData from '@utils/formdata';

// -- elements
import UploadImage from '@components/Elements/UploadImage/views';
import TextEditor from '@components/Elements/TextEditor/views';

const ModalImageView = (props) => {
  const { method, open, onClose, initialValues, formInstance, notify, onSubmit, message, loading, refetch } = props;
  const user = LocalStorage.get('user');
  const methodType = method === 'edit' ? 'put' : 'post';
  const title = method === 'add' ? 'Add Value' : 'Edit Value';
  const msg = method === 'add' ? 'Added' : method === 'edit' ? 'changed' : '';

  useEffect(() => {
    if (open) {
      if (methodType === 'add') {
        formInstance.resetFields();
      } else if (initialValues) {
        formInstance.setFieldsValue(initialValues);
      }
    } else {
      // reset saat modal ditutup agar form internal bersih
      formInstance.resetFields();
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
        ...(methodType === 'post' ? { status: 1, created_by: user?.id } : { updated_by: user?.id })
      };

      const formData = FormData(payload);
      // Submit form data
      const response = await onSubmit(formData, methodType);

      if (response && response.data) {
        notify({
          type: 'success',
          message: `Data ${msg} successfully`
        });
        formInstance.resetFields();
        onClose();
        refetch();
      } else {
        notify({
          type: 'error',
          message: `Data failed to ${msg}`
        });
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
      <Button onClick={() => onClose()}>Cancel</Button>
      <Button type='primary' htmlType='submit' form='form-modal-values' loading={loading} disabled={loading}>
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
      onCancel={() => {
        formInstance.resetFields();
        onClose();
      }}
      closable={true}
      className='modal-form'>
      <Form form={formInstance} id='form-modal-values' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>

        <Form.Item name='image' label='Image' valuePropName='file' getValueFromEvent={(e) => e} help='1120px x 800px'>
          <UploadImage value={{ url: initialValues?.image }} />
        </Form.Item>
        <Form.Item name='title' label='Title ' rules={[{ required: true, message: 'Title is required' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='description'
          label='Description '
          rules={[{ required: true, message: 'Description is required' }]}>
          <TextEditor rows='3' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalImageView;
