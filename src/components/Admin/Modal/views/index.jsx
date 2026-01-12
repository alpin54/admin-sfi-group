// -- libraries
import { useEffect } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';

// -- utils
import LocalStorage from '@utils/localStorage';
import FormData from '@utils/formdata';

// -- elements
import UploadImage from '@components/Elements/UploadImage/views';

const AdminModalView = (props) => {
  const {
    roleOptions,
    method,
    setMethod,
    open,
    onClose,
    initialValues,
    formInstance,
    notify,
    onSubmit,
    message,
    loading,
    refetch
  } = props;
  const user = LocalStorage.get('user');
  const isDetailMode = method === 'detail';
  const isEditMode = method === 'edit';
  const methodType = method === 'edit' ? 'put' : 'post';
  const title = method === 'add' ? 'Add Admin' : method === 'edit' ? 'Edit Admin' : 'Detail Admin';
  const msg = method === 'add' ? 'Added' : method === 'edit' ? 'changed' : '';

  useEffect(() => {
    if (open) {
      if (methodType === 'add') {
        formInstance?.resetFields();
      } else if (initialValues) {
        formInstance?.setFieldsValue(initialValues);
      }
    }
  }, [open, methodType, initialValues, formInstance]);

  useEffect(() => {
    if (message) {
      notify({
        type: 'error',
        message: `${title} Failed`,
        description: message
      });
    }
  }, [message, notify, title]);

  const handleFinish = async (values) => {
    try {
      const { password, repeatPassword, ...payloadValues } = values;
      const payload = {
        ...payloadValues,
        ...(methodType === 'post'
          ? {
              created_by: user?.id
            }
          : {
              updated_by: user?.id
            })
      };

      const formData = FormData(payload);
      if (password || repeatPassword) {
        if (password) {
          formData.append('password', password);
        }
        if (repeatPassword) {
          formData.append('repeatPassword', repeatPassword);
        }
      }

      // Submit form data
      const response = await onSubmit(formData, methodType);

      if (response) {
        notify({
          type: 'success',
          message: `Data ${msg} successfully`
        });
        formInstance?.resetFields();
        onClose();
        refetch();
      }
    } catch (err) {
      notify({
        type: 'error',
        message: `Data failed to ${msg}`,
        description: err?.message ?? 'Unknown error'
      });
    }
  };

  const handleEnableForm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMethod('edit');
  };

  const footerComponent = (
    <>
      <Button color='primary' variant='outlined' onClick={onClose}>
        Cancel
      </Button>
      {isDetailMode ? (
        <Button type='primary' htmlType='button' onClick={handleEnableForm}>
          Edit
        </Button>
      ) : (
        <Button type='primary' htmlType='submit' form='form-admin' loading={loading}>
          Save
        </Button>
      )}
    </>
  );

  return (
    <Modal
      title={title}
      width={600}
      open={open}
      footer={footerComponent}
      onCancel={onClose}
      closable={true}
      className='modal-form'>
      <Form form={formInstance} id='form-admin' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='id' hidden initialValue={initialValues?.id}>
          <Input />
        </Form.Item>
        <Form.Item label='Image' name='image' valuePropName='file' getValueFromEvent={(e) => e}>
          <UploadImage disabled={isDetailMode} value={{ url: initialValues?.image ? initialValues?.image : '' }} />
        </Form.Item>
        <Form.Item
          label='Full Name'
          name='name'
          rules={[
            {
              required: !isDetailMode,
              message: 'Please input your full name!'
            }
          ]}>
          <Input disabled={isDetailMode} allowClear />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: !isDetailMode,
              type: 'email',
              message: 'Please enter a valid email!'
            }
          ]}>
          <Input disabled={isDetailMode} allowClear />
        </Form.Item>
        <Form.Item
          label='Role'
          name='role_id'
          rules={[{ required: !isDetailMode, message: 'Please select your role!' }]}>
          <Select
            showSearch
            disabled={isDetailMode}
            allowClear
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            options={roleOptions.map((role) => ({
              label: role.roleName,
              value: role.role_id
            }))}
          />
        </Form.Item>
        {!isDetailMode && (
          <>
            <Form.Item
              label='Password'
              name='password'
              rules={[
                {
                  required: !isEditMode,
                  message: 'Please input your password!'
                }
              ]}>
              <Input.Password allowClear />
            </Form.Item>
            <Form.Item
              label='Repeat Password'
              name='repeatPassword'
              rules={[
                {
                  required: !isEditMode,
                  message: 'Please input your repeat password!'
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  }
                })
              ]}>
              <Input.Password />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default AdminModalView;
