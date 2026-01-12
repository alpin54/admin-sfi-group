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

const ModalHighlightView = (props) => {
  const { open, onClose, initialValues, formInstance, notify, onSubmit, message, loading, refetch } = props;
  const user = LocalStorage.get('user');

  useEffect(() => {
    if (open) {
      if (initialValues) {
        formInstance.setFieldsValue(initialValues);
      }
    } else {
      // reset saat modal ditutup agar form internal bersih
      formInstance.resetFields();
    }
  }, [open, initialValues, formInstance]);

  useEffect(() => {
    if (message) {
      notify({
        type: 'error',
        message: 'Edit Highlight Failed',
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

      const formData = FormData(payload);
      // Submit form data
      const response = await onSubmit(formData);

      if (response && response.data) {
        notify({
          type: 'success',
          message: 'Data updated successfully'
        });
        formInstance.resetFields();
        onClose();
        refetch();
      } else {
        notify({
          type: 'error',
          message: 'Data update failed'
        });
      }
    } catch (err) {
      notify({
        type: 'error',
        message: 'Data update failed',
        description: err?.message ?? 'Unknown error'
      });
    }
  };

  const footerComponent = (
    <>
      <Button onClick={() => onClose()}>Cancel</Button>
      <Button type='primary' htmlType='submit' form='form-modal-highlight' loading={loading} disabled={loading}>
        Save
      </Button>
    </>
  );

  return (
    <Modal
      title='Edit Highlight'
      width={600}
      open={open}
      footer={footerComponent}
      onCancel={() => {
        formInstance.resetFields();
        onClose();
      }}
      closable={true}
      className='modal-form'>
      <Form form={formInstance} id='form-modal-highlight' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>

        <Form.Item name='image' label='Image' valuePropName='file' getValueFromEvent={(e) => e} help='1320px x 1600px'>
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
        <Form.Item
          name='url'
          label='Link Button'
          rules={[{ required: true, message: 'Link button is required' }]}
          placeholder='shop/category'>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalHighlightView;
