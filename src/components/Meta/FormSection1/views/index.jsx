// -- libraries
import { useEffect, useState } from 'react';
import { Card, Button, Form, Input, Space } from 'antd';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- elements
import SectionHeader from '@elements/SectionHeader/views';
import TranslationTabs from '@components/Elements/TranslationTabs/views';

const FormMetaSection1View = (props) => {
  const { method, confirm, notify, data, ready, loading, message, onSubmit } = props;
  const [formInstance] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const user = LocalStorage.get('user');
  const { TextArea } = Input;

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
    <Card>
      <SectionHeader title='Seo & Meta Settings' />
      <Form form={formInstance} id='form-seo-meta' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>
        <TranslationTabs>
          {(lang) => (
            <>
              <Form.Item
                name={['title', lang]}
                label='Title'
                rules={[{ required: true, message: 'Title is required' }]}>
                <Input allowClear readOnly={!isEdit} />
              </Form.Item>
              <Form.Item
                name={['description', lang]}
                label='Description'
                rules={[{ required: true, message: 'Description is required' }]}>
                <TextArea allowClear rows={3} readOnly={!isEdit} />
              </Form.Item>
              <Form.Item
                name={['keyword', lang]}
                label='Keywords'
                rules={[{ required: true, message: 'Title is required' }]}>
                <Input allowClear readOnly={!isEdit} />
              </Form.Item>

              <Form.Item
                name={['robots', lang]}
                label='Robots'
                rules={[{ required: true, message: 'Title is required' }]}>
                <Input allowClear readOnly={!isEdit} />
              </Form.Item>

              <Form.Item
                name={['refresh', lang]}
                label='Refresh'
                rules={[{ required: true, message: 'Title is required' }]}>
                <Input allowClear readOnly={!isEdit} />
              </Form.Item>
              <Form.Item
                name={['author', lang]}
                label='Author'
                rules={[{ required: true, message: 'Title is required' }]}>
                <Input allowClear readOnly={!isEdit} />
              </Form.Item>
            </>
          )}
        </TranslationTabs>

        <Form.Item>
          <Space size={16}>
            {isEdit ? (
              <>
                <Button color='primary' variant='outlined' onClick={(e) => handleEnableForm(e, false)}>
                  Cancel
                </Button>
                <Button type='primary' htmlType='submit' form='form-seo-meta' loading={loading}>
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

export default FormMetaSection1View;
