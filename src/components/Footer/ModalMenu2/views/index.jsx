import { useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';

// -- utils
import LocalStorage from '@utils/localStorage';

const ModalMenu2View = (props) => {
  const {
    method = 'edit',
    open,
    onClose,
    initialValues,
    formInstance,
    notify,
    onSubmit,
    message,
    loading,
    refetch
  } = props;
  const user = LocalStorage.get('user');
  const methodType = method === 'edit' ? 'put' : 'post';
  const msg = method === 'edit' ? 'changed' : 'created';
  const title = method === 'edit' ? 'Edit Menu' : 'New Menu';

  useEffect(() => {
    if (!formInstance) return;

    if (open) {
      if (methodType === 'post') {
        formInstance.resetFields();
      } else if (initialValues) {
        // normalisasi simple: content adalah string
        const normalized = {
          ...initialValues,
          content: typeof initialValues?.content === 'string' ? initialValues.content : (initialValues?.content ?? '')
        };
        formInstance.setFieldsValue(normalized);
      }
    } else {
      // reset saat modal ditutup agar form internal bersih
      formInstance.resetFields();
    }
  }, [open, methodType, initialValues, formInstance]);

  useEffect(() => {
    if (message && notify) {
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
          ? { created_by: Number(user?.id) || 0, status: 1 }
          : { updated_by: Number(user?.id) || 0 }),
        sorting: Number(values.sorting ?? initialValues?.sorting ?? 0),
        ...((values.id ?? initialValues?.id) ? { id: Number(values.id ?? initialValues?.id) } : {})
      };
      const response = await onSubmit(payload, methodType);

      if (response && response.data) {
        if (notify) {
          notify({
            type: 'success',
            message: `Data ${msg} successfully`
          });
        }
        formInstance.resetFields();
        onClose();
        if (typeof refetch === 'function') refetch();
      } else {
        if (notify) {
          notify({
            type: 'error',
            message: `Data failed to ${msg}`
          });
        }
      }
    } catch (err) {
      if (notify) {
        notify({
          type: 'error',
          message: `Data failed to ${msg}`,
          description: err?.message ?? 'Unknown error'
        });
      }
    }
  };

  const footerComponent = (
    <>
      <Button
        onClick={() => {
          formInstance.resetFields();
          onClose();
        }}>
        Cancel
      </Button>
      <Button type='primary' htmlType='submit' form='form-menu-2' loading={loading} disabled={loading}>
        Save
      </Button>
    </>
  );

  return (
    <Modal
      title={title}
      width={700}
      open={open}
      footer={footerComponent}
      onCancel={() => {
        formInstance.resetFields();
        onClose();
      }}
      closable
      className='modal-form'>
      <Form form={formInstance} id='form-menu-2' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>

        <Form.Item name='title' label='Title' rules={[{ required: true, message: 'Title is required' }]}>
          <Input />
        </Form.Item>
        <Form.Item name='alias' label='Alias' rules={[{ required: true, message: 'Alias is required' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalMenu2View;
