// -- libraries
import { useEffect, useState } from 'react';
import { Card, Button, Form, Input, Space, message } from 'antd';

// -- elements
import TranslationTabsWidget from '@components/Elements/TranslationTabs/views';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- elements
import TranslationTabs from '@components/Elements/TranslationTabs/views';

const FormForgotPasswordView = (props) => {
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
          description: data?.description?.en || ''
        },
        id: {
          title: data?.title?.id || '',
          description: data?.description?.id || ''
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
      const response = await props.onSubmit(payload);

      if (response && response.data) {
        formInstance?.setFieldsValue(response.data);
        setIsEdit(false);
        notify({
          type: 'success',
          message: 'Data updated successfully'
        });
      } else {
        notify({
          type: 'error',
          message: 'Failed to update data'
        });
      }
    } catch (err) {
      notify({
        type: 'error',
        message: 'Failed to update data',
        description: err?.message ?? 'Unknown error'
      });
    }
  };

  return (
    <>
      {confirmHolder}
      {notificationHolder}
      <Card>
        <Form
          form={formInstance}
          id='form-forgot-password'
          layout='vertical'
          onFinish={handleFinish}
          autoComplete='off'>
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
                  <TextArea allowClear readOnly={!isEdit} />
                </Form.Item>
              </>
            )}
          </TranslationTabs>
          <Form.Item>
            <Space size={16}>
              {isEdit ? (
                <Button type='primary' htmlType='submit' form='form-forgot-password' loading={loading}>
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

export default FormForgotPasswordView;
