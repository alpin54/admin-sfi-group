// -- libraries
import { useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';

// -- utils
import LocalStorage from '@utils/localStorage';

const AdminModalView = (props) => {
  const { data, open, onClose, notify, onSubmit, message, loading, refetch } = props;
  const user = LocalStorage.get('user');
  const [formInstance] = Form.useForm();

  useEffect(() => {
    if (message) {
      notify({
        type: 'error',
        message: 'Edit Password Failed!',
        description: message
      });
    }
  }, [message, notify]);

  const handleFinish = async (values) => {
    try {
      const { password, repeatPassword, ...payloadValues } = values;
      const payload = {
        ...payloadValues,
        id: data?.id,
        updated_by: user?.id
      };

      // Submit form data
      const response = await onSubmit(payload);

      if (response) {
        notify({
          type: 'success',
          message: 'Edit Password Successfully!'
        });
        formInstance?.resetFields();
        onClose();
        refetch();
      }
    } catch (err) {
      notify({
        type: 'error',
        message: 'Edit Password Failed!',
        description: err?.message ?? 'Unknown error'
      });
    }
  };

  const footerComponent = (
    <>
      <Button color='primary' variant='outlined' onClick={onClose}>
        Cancel
      </Button>
      <Button type='primary' htmlType='submit' form='form-admin' loading={loading}>
        Save
      </Button>
    </>
  );

  return (
    <Modal
      title='Password'
      width={600}
      open={open}
      footer={footerComponent}
      onCancel={onClose}
      closable={true}
      className='modal-form'>
      <Form form={formInstance} id='form-admin' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}>
          <Input.Password allowClear />
        </Form.Item>
        <Form.Item
          label='Repeat Password'
          name='repeatPassword'
          rules={[
            {
              required: true,
              message: 'Please input your repeat password!'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              }
            })
          ]}>
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AdminModalView;
