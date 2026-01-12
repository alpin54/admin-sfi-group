// -- libraries
import { useEffect, useState } from 'react';
import { Card, Button, Form, Input, ColorPicker, Space } from 'antd';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- elements
import SectionHeader from '@elements/SectionHeader/views';

// -- styles
import style from '@components/Meta/FormSection3/styles/style.module.scss';

const FormMetaSection3View = (props) => {
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
      <SectionHeader title='Branding & Site Information' />
      <Form form={formInstance} id='form-branding-site' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>
        <Form.Item name={'site_name'} label='Site Name' rules={[{ required: true, message: 'Site Name is required' }]}>
          <Input allowClear readOnly={!isEdit} />
        </Form.Item>
        <Form.Item
          name={'domain_name'}
          label='Domain Name'
          rules={[{ required: true, message: 'Domain Name is required' }]}>
          <Input allowClear readOnly={!isEdit} />
        </Form.Item>
        <Form.Item name={'site_url'} label='Site URL' rules={[{ required: true, message: 'Site URL is required' }]}>
          <Input allowClear readOnly={!isEdit} />
        </Form.Item>
        <Form.Item
          name='theme_color'
          label='Theme Color'
          rules={[{ required: true, message: 'Please select a color' }]}
          valuePropName='value'
          trigger='onChange'
          getValueFromEvent={(color) => {
            try {
              return color ? color.toHexString() : '';
            } catch {
              return color;
            }
          }}>
          <ColorPicker
            showText
            allowClear
            disabled={!isEdit}
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              padding: '8px 16px',
              width: '100%'
            }}
          />
        </Form.Item>
        <Form.Item>
          <Space size={16}>
            {isEdit ? (
              <>
                <Button color='primary' variant='outlined' onClick={(e) => handleEnableForm(e, false)}>
                  Cancel
                </Button>
                <Button type='primary' htmlType='submit' form='form-branding-site' loading={loading}>
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

export default FormMetaSection3View;
