import { useEffect } from 'react';
import { Modal, Button, Form, Input } from 'antd';

// -- utils
import LocalStorage from '@utils/localStorage';

// elements
import TranslationTabs from '@components/Elements/TranslationTabs/views';

const ModalMenuView = ({
  open,
  onClose,
  method, // sekarang hanya 'edit'
  initialValues,
  formInstance,
  notify,
  onSubmit,
  message,
  loading,
  refetch
}) => {
  const title = 'Menu';
  const user = LocalStorage.get('user');

  // Autofill value pada edit
  useEffect(() => {
    if (open && initialValues) {
      formInstance.setFieldsValue(initialValues);
    }
    if (open && !initialValues) {
      formInstance.resetFields();
    }
  }, [open, initialValues, formInstance]);

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
        updated_by: user?.id
      };
      // Hanya edit ('put')
      const response = await onSubmit(payload, 'put');

      if (response) {
        notify({
          type: 'success',
          message: 'Data edited successfully'
        });
        formInstance?.resetFields();
        onClose();
        refetch();
      }
    } catch (err) {
      notify({
        type: 'error',
        message: 'Data failed to edit',
        description: err?.message ?? 'Unknown error'
      });
    }
  };

  return (
    <Modal
      title={`Edit ${title}`}
      width={560}
      open={!!open}
      footer={[
        <Button key='cancel' color='primary' variant='outlined' onClick={onClose}>
          Cancel
        </Button>,
        <Button key='save' type='primary' htmlType='submit' form='form-job-type' loading={loading}>
          Save
        </Button>
      ]}
      onCancel={onClose}
      closable
      className='modal-form'>
      <Form
        form={formInstance}
        id='form-job-type'
        layout='vertical'
        initialValues={initialValues} // <-- agar form title langsung terisi saat modal muncul
        onFinish={handleFinish}
        autoComplete='off'>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>
        <TranslationTabs>
          {(lang) => (
            <Form.Item name={['title', lang]} label='Title' rules={[{ required: true, message: 'Please enter title' }]}>
              <Input />
            </Form.Item>
          )}
        </TranslationTabs>
      </Form>
    </Modal>
  );
};

export default ModalMenuView;
