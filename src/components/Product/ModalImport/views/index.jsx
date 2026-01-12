// -- libraries
import { useEffect } from 'react';
import { Modal, Button, Form, Input, ColorPicker } from 'antd';

// -- utils
import LocalStorage from '@utils/localStorage';
import UploadFile from '@components/Elements/UploadFile/views';

const ModalImportView = ({ open, onClose, formInstance, notify, onSubmit, message, loading, refetch }) => {
  const user = LocalStorage.get('user');

  useEffect(() => {
    if (open) {
      formInstance.resetFields();
    }
  }, [open, formInstance]);

  useEffect(() => {
    if (message) {
      notify({
        type: 'error',
        message: 'Upload Failed',
        description: message
      });
    }
  }, [message, notify]);

  const handleFinish = async (values) => {
    try {
      const payload = {
        ...values,
        status: true,
        created_by: user?.id
      };

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
    <>
      <Button color='primary' variant='outlined' onClick={onClose}>
        Cancel
      </Button>
      <Button type='primary' htmlType='submit' form='form-import' loading={loading}>
        Import Product
      </Button>
    </>
  );

  return (
    <Modal
      title='Import Product'
      width={600}
      open={open}
      footer={footerComponent}
      onCancel={onClose}
      closable={true}
      className='modal-form'>
      <Form form={formInstance} id='form-import' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>

        <Form.Item name='file' valuePropName='file' getValueFromEvent={(e) => e}>
          <UploadFile accept='.csv, .xlsx, .xls' maxSize={40 * 1024 * 1024} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalImportView;
