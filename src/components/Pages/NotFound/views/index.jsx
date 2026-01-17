// -- libraries
import { useEffect, useState } from 'react';
import { Breadcrumb, Card, Button, Form, Input, Space } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- elements
import CardUserLogWidget from '@components/Elements/CardUserLog/views';
import UploadImage from '@elements/UploadImage/views';
import TranslationTabs from '@components/Elements/TranslationTabs/views';

const NotFoundView = (props) => {
  const { method, data, ready, loading, message, onSubmit } = props;
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();
  const [isEdit, setIsEdit] = useState(false);
  const [formInstance] = Form.useForm();
  const { TextArea } = Input;
  const router = useRouter();
  const user = LocalStorage.get('user');

  useEffect(() => {
    if (method === 'edit') {
      setIsEdit(true);
    }
  }, [method]);

  useEffect(() => {
    if (data) {
      const mappedFields = {
        ...data,
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
        notify({
          type: 'success',
          message: 'Data updated successfully'
        });

        router.push('/pages');
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
      <section>
        <div className='row-container'>
          <Breadcrumb
            items={[
              { title: <Link href='/pages'>Pages</Link> },
              { title: method === 'edit' ? 'Edit Not Found' : 'Not Found' }
            ]}
          />
        </div>

        <div className='row-container'>
          <Card loading={ready}>
            <Form form={formInstance} id='form-not-found' layout='vertical' onFinish={handleFinish} autoComplete='off'>
              <Form.Item name='id' hidden>
                <Input />
              </Form.Item>
              <Form.Item
                name='image'
                label='Image'
                valuePropName='file'
                getValueFromEvent={(e) => e}
                help='1440px x 800px'>
                <UploadImage value={{ url: data?.image }} disabled={!isEdit} />
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
                  <Button color='primary' variant='outlined' href='/pages'>
                    Cancel
                  </Button>
                  {isEdit ? (
                    <Button type='primary' htmlType='submit' form='form-not-found' loading={loading}>
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
        </div>
      </section>
      <CardUserLogWidget
        created_by={data?.created_by || 1}
        updated_by={data?.updated_by || 1}
        created_at={data?.created_at || '2025-08-15T06:06:51.338Z'}
        updated_at={data?.updated_at || '2025-08-15T06:06:51.338Z'}
      />
    </>
  );
};

export default NotFoundView;
