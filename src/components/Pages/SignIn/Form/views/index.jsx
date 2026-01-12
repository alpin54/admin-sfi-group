// --library
import { useEffect, useState } from 'react';
import { Card, Button, Form, Input, Space, Row, Col } from 'antd';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- elements
import TranslationTabs from '@components/Elements/TranslationTabs/views';

const FormSignInView = (props) => {
  const { method, data, ready, loading, message, onSubmit } = props;
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();
  const [isEdit, setIsEdit] = useState(false);
  const [formInstance] = Form.useForm();
  const { TextArea } = Input;
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
          title: data?.title?.en || '',
          description: data?.description?.en || '',
          cta_member: data?.cta_member?.en || '',
          cta_dealer: data?.cta_dealer?.en || ''
        },
        id: {
          title: data?.title?.id || '',
          description: data?.description?.id || '',
          cta_member: data?.cta_member?.id || '',
          cta_dealer: data?.cta_dealer?.id || ''
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

        // router.push('/pages/sign-in');
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
    <>
      {confirmHolder}
      {notificationHolder}
      <Card>
        <Form form={formInstance} id='form-sign-in' layout='vertical' onFinish={handleFinish} autoComplete='off'>
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
                <Form.Item
                  name={[lang, 'description']}
                  label='Description'
                  rules={[{ required: true, message: 'Description is required' }]}>
                  <TextArea allowClear rows={3} readOnly={!isEdit} />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name={[lang, 'cta_member']} label='Call to Action Member'>
                      <Input allowClear readOnly={!isEdit} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name={[lang, 'cta_dealer']} label='Call to Action Dealer'>
                      <Input allowClear readOnly={!isEdit} />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
          </TranslationTabs>

          <Form.Item>
            <Space size={16}>
              {isEdit ? (
                <Button type='primary' htmlType='submit' form='form-sign-in' loading={loading}>
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
    </>
  );
};

export default FormSignInView;
