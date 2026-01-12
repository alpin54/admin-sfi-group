// --library
import { useEffect, useState } from 'react';
import { Card, Button, Form, Input, Space } from 'antd';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- elements
import TranslationTabs from '@components/Elements/TranslationTabs/views';

const FormNewPasswordView = (props) => {
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
        <Form form={formInstance} id='form-new-password' layout='vertical' onFinish={handleFinish} autoComplete='off'>
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
              </>
            )}
          </TranslationTabs>

          <Form.Item>
            <Space size={16}>
              {isEdit ? (
                <Button type='primary' htmlType='submit' form='form-new-password' loading={loading}>
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

export default FormNewPasswordView;
