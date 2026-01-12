import { useEffect, useState } from 'react';
import { Card, Button, Form, Input, Row, Col, Space } from 'antd';

// -- utils
import LocalStorage from '@utils/localStorage';
import FormData from '@utils/formdata';

// -- elements
import UploadImage from '@components/Elements/UploadImage/views';
import SectionHeader from '@components/Elements/SectionHeader/views';

// -- styles
import style from '@components/Meta/FormSection2/styles/style.module.scss';

const FormMetaSection2View = (props) => {
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
      const formData = FormData(payload);
      // Submit form data
      const response = await onSubmit(formData);

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
      <SectionHeader title='Social Media & Sharing Settings' />
      <Form
        form={formInstance}
        id='form-social-media-sharing'
        layout='vertical'
        onFinish={handleFinish}
        autoComplete='off'>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>
        <Form.Item name={'facebook'} label='Facebook' rules={[{ required: true, message: 'Facebook is required' }]}>
          <Input allowClear readOnly={!isEdit} />
        </Form.Item>
        <Form.Item name={'twitter'} label='Twitter' rules={[{ required: true, message: 'Twitter is required' }]}>
          <Input allowClear readOnly={!isEdit} />
        </Form.Item>

        <Row gutter={8} align='top'>
          <Col flex='360px'>
            <Form.Item
              name='og_image'
              label='Default OG Image'
              valuePropName='file'
              getValueFromEvent={(e) => e}
              help='1200px x 630px'>
              <UploadImage value={{ url: data?.og_image }} disabled={!isEdit} />
            </Form.Item>
          </Col>

          <Col flex='360px'>
            <Form.Item
              name='twitter_image'
              label='Default Twitter Image'
              valuePropName='file'
              getValueFromEvent={(e) => e}
              help='800px x 418px'>
              <UploadImage value={{ url: data?.twitter_image }} disabled={!isEdit} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Space size={16} style={{ marginTop: 24 }}>
            {isEdit ? (
              <>
                <Button color='primary' variant='outlined' onClick={(e) => handleEnableForm(e, false)}>
                  Cancel
                </Button>
                <Button type='primary' htmlType='submit' form='form-social-media-sharing' loading={loading}>
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

export default FormMetaSection2View;
