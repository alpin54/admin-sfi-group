// -- libraries
import { useEffect, useState } from 'react';
import { Card, Button, Form, Input, Space } from 'antd';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- elements
import SectionHeader from '@elements/SectionHeader/views';

const FormFaqSection2View = (props) => {
  const { method, confirm, notify, data, ready, loading, message, onSubmit } = props;
  const [formInstance] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
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

  const handleEnableForm = (e, value) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEdit(value);
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
        notify({
          type: 'success',
          message: 'Data updated successfully'
        });
      } else {
        notify({
          type: 'error',
          message: 'Data failed to updated'
        });
      }
    } catch (err) {
      notify({
        type: 'error',
        message: 'Data failed to updated',
        description: err?.message ?? 'Unknown error'
      });
    }
  };

  return (
    <Card loading={ready}>
      <SectionHeader title='FAQ Empty' />
      <Form form={formInstance} id='form-faq-section2' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>
        <Form.Item name='title' label='Title' rules={[{ required: true, message: 'Title is required' }]}>
          <Input allowClear readOnly={!isEdit} />
        </Form.Item>
        <Form.Item name='title' label='Title' rules={[{ required: true, message: 'Title is required' }]}>
          <Input allowClear readOnly={!isEdit} />
        </Form.Item>
        <Form.Item
          name='description'
          label='Description'
          rules={[{ required: true, message: 'Description is required' }]}>
          <Input.TextArea allowClear readOnly={!isEdit} />
        </Form.Item>

        <Form.Item>
          <Space size={16}>
            {isEdit ? (
              <>
                <Button color='primary' variant='outlined' onClick={(e) => handleEnableForm(e, false)}>
                  Cancel
                </Button>
                <Button type='primary' htmlType='submit' form='form-faq-section2' loading={loading}>
                  Save
                </Button>
              </>
            ) : (
              <Button type='primary' htmlType='button' onClick={(e) => handleEnableForm(e, true)}>
                Edit
              </Button>
            )}
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default FormFaqSection2View;
