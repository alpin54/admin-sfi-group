// -- libraries
import { useCallback, useEffect, useState } from 'react';
import { Card, Button, Form, Input, Breadcrumb, Space } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// -- icons
import { WarningOutlined } from '@ant-design/icons';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- elements
import CardUserLogWidget from '@components/Elements/CardUserLog/views';
import TextEditor from '@components/Elements/TextEditor/views';
import SectionHeader from '@components/Elements/SectionHeader/views';

const TermsConditionView = (props) => {
  const { method, data, ready, loading, message, onPublish, onSubmit } = props;
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();
  const [formInstance] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();
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

  const handlePublish = useCallback(
    (record) => {
      const title = record.status ? 'Unpublish' : 'Publish';
      const status = record.status ? false : true;
      const payload = { id: record.id, status: status, updated_by: user?.id };
      confirm({
        icon: <WarningOutlined />,
        content: `Are you sure you want to ${title.toLowerCase()} ${record.title.toLocaleLowerCase()}?`,
        onSuccess: async () => {
          const response = await onPublish(payload);
          if (response && !response.error) {
            notify({
              type: 'success',
              message: `Data ${title.toLowerCase()} successfully`
            });
          } else {
            notify({
              type: 'error',
              message: response.error || `Failed to ${title.toLowerCase()} data`
            });
          }
        }
      });
    },
    [confirm, notify, onPublish, user]
  );

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
              { title: method === 'edit' ? 'Edit Detail Terms Condition' : 'Detail Terms Condition' }
            ]}
          />
        </div>

        <div className='row-container'>
          <Card loading={ready}>
            <SectionHeader title='Main Section' publish={data?.status} onPublish={() => handlePublish(data)} />
            <Form
              form={formInstance}
              id='form-terms-condition'
              layout='vertical'
              onFinish={handleFinish}
              autoComplete='off'>
              <Form.Item name='id' hidden>
                <Input />
              </Form.Item>
              <Form.Item name='title' label='Title' rules={[{ required: true, message: 'Title is required' }]}>
                <Input allowClear readOnly={!isEdit} />
              </Form.Item>

              <Form.Item
                name='description'
                label='Description'
                rules={[{ required: true, message: 'Description is required' }]}>
                <TextEditor readOnly={!isEdit} />
              </Form.Item>

              <Form.Item>
                <Space size={16}>
                  <Button color='primary' variant='outlined' href='/pages'>
                    Cancel
                  </Button>
                  {isEdit ? (
                    <Button type='primary' htmlType='submit' form='form-terms-condition' loading={loading}>
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

export default TermsConditionView;
