// -- libraries
import { useEffect } from 'react';
import { Modal, Button, Form, Input } from 'antd';

// -- utils
import LocalStorage from '@utils/localStorage';

const ModalJobTypeView = ({
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
  const title = 'Job Type';

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
      <Button type='primary' htmlType='submit' form='form-job-type' loading={loading}>
        Save
      </Button>
    </>
  );

  return (
    <Modal
      title={method === 'add' ? `Add ${title}` : `Edit ${title}`}
      width={560}
      open={!!open}
      footer={footerComponent}
      onCancel={onClose}
      closable
      className='modal-form'>
      <Form form={formInstance} id='form-job-type' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>

        <Form.Item
          name='name'
          label='Job Type Name'
          rules={[{ required: true, message: 'Please enter job type name' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalJobTypeView;
