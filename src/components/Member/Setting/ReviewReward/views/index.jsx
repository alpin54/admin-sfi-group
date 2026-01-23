// --library
import { useEffect, useState } from 'react';
import { Card, Button, Form, Input, Space } from 'antd';

// -- utils
import LocalStorage from '@utils/localStorage';

const ReviewRewardView = (props) => {
  const { method, notify, data, ready, loading, message, onSubmit } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [formInstance] = Form.useForm();
  const user = LocalStorage.get('user');

  useEffect(() => {
    if (method === 'edit') {
      setIsEdit(true);
    }
  }, [method]);

  useEffect(() => {
    if (data) {
      formInstance?.setFieldsValue(data);
    }
  }, [data, formInstance]);

  useEffect(() => {
    if (message) {
      notify({
        type: 'error',
        message: `Failed`,
        description: message
      });
    }
  }, [message, notify]);

  const handleEnableForm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEdit(true);
  };

  const handleFinish = async (values) => {
    try {
      const payload = {
        ...values,
        updated_by: user?.id
      };
      // Submit form data
      const response = await onSubmit(payload);

      if (response && response.data) {
        formInstance?.setFieldsValue(response.data);
        setIsEdit(false);
        notify({
          type: 'success',
          message: 'Data updated successfully'
        });

        // router.push('/pages/review-reward');
      } else {
        notify({
          type: 'error',
          message: 'Data failed to updated'
        });
      }
    } catch (err) {
      console.log('Error:', err);

      notify({
        type: 'error',
        message: 'Data failed to updated',
        description: err?.message ?? 'Unknown error'
      });
    }
  };

  return (
    <Card title='Review Reward Points'>
      <Form form={formInstance} id='form-review-reward' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>
        <Form.Item
          name='total_points_earned'
          label='Total Points Earned'
          rules={[{ required: true, message: 'Total points earned is required' }]}>
          <Input allowClear readOnly={!isEdit} />
        </Form.Item>
        <Form.Item>
          <Space size={16}>
            {isEdit ? (
              <Button type='primary' htmlType='submit' form='form-review-reward' loading={loading}>
                Save
              </Button>
            ) : (
              <Button type='primary' htmlType='button' onClick={handleEnableForm}>
                Edit
              </Button>
            )}
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ReviewRewardView;
