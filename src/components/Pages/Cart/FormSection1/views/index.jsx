// -- libraries
import { useCallback, useEffect, useState } from 'react';
import { Card, Button, Form, Input, Space, Row, Col } from 'antd';

// -- icons
import { WarningOutlined } from '@ant-design/icons';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- elements
import SectionHeader from '@elements/SectionHeader/views';
import TranslationTabs from '@components/Elements/TranslationTabs/views';

const FormCartSection1View = (props) => {
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
      const mappedFields = {
        en: {
          title: data?.title?.en || ''
        },
        id: {
          title: data?.title?.id || ''
        }
      };
      formInstance?.setFieldsValue(mappedFields);
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
      console.log('Error:', err);

      notify({
        type: 'error',
        message: 'Data failed to updated',
        description: err?.message ?? 'Unknown error'
      });
    }
  };

  return (
    <Card loading={ready}>
      <SectionHeader title='Product Recommendation ' />
      <Form form={formInstance} id='form-cart-section1' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>
        <TranslationTabs>
          {(lang) => (
            <>
              <Form.Item
                name={[lang, 'title']}
                label='Title'
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
                <Button type='primary' htmlType='submit' form='form-cart-section1' loading={loading}>
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

export default FormCartSection1View;
