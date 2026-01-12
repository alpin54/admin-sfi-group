// -- libraries
import { useCallback, useEffect, useState } from 'react';
import { Card, Button, Form, Input, Space } from 'antd';

// -- icons
import { WarningOutlined } from '@ant-design/icons';

// -- utils
import LocalStorage from '@utils/localStorage';
import FormData from '@utils/formdata';

// -- elements
import SectionHeader from '@elements/SectionHeader/views';
import UploadImage from '@elements/UploadImage/views';

const FormAboutUsSection5View = (props) => {
  const { method, confirm, notify, data, ready, loading, message, onPublish, onSubmit } = props;
  const { TextArea } = Input;
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
      <SectionHeader title='Our Story' publish={data?.status} onPublish={() => handlePublish(data)} />
      <Form
        form={formInstance}
        id='form-about-us-section5'
        layout='vertical'
        onFinish={handleFinish}
        autoComplete='off'>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>
        <Form.Item name='image' label='Image' valuePropName='file' getValueFromEvent={(e) => e} help='1136px x 1120px'>
          <UploadImage value={{ url: data?.image }} disabled={!isEdit} />
        </Form.Item>
        <Form.Item name='title' label='Title' rules={[{ required: true, message: 'Title is required' }]}>
          <Input allowClear readOnly={!isEdit} />
        </Form.Item>
        <Form.Item
          name='description'
          label='Description'
          rules={[{ required: true, message: 'Description is required' }]}>
          <TextArea allowClear rows={3} readOnly={!isEdit} />
        </Form.Item>

        <Form.Item>
          <Space size={16}>
            {isEdit ? (
              <>
                <Button color='primary' variant='outlined' onClick={(e) => handleEnableForm(e, false)}>
                  Cancel
                </Button>
                <Button type='primary' htmlType='submit' form='form-about-us-section5' loading={loading}>
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

export default FormAboutUsSection5View;
