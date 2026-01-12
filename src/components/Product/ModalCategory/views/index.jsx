// -- libraries
import { useEffect, useState } from 'react';
import { Modal, Button, Form, Input, Switch, Select, Space } from 'antd';

// -- utils
import LocalStorage from '@utils/localStorage';
import FormData from '@utils/formdata';

// -- elements
import UploadImage from '@components/Elements/UploadImage/views';

const ModalCategoryView = ({
  open,
  onClose,
  method,
  mainCategories,
  initialValues,
  formInstance,
  notify,
  onSubmit,
  message,
  loading,
  refetch
}) => {
  const methodType = method === 'add' ? 'post' : 'put';
  const user = LocalStorage.get('user');
  const msg = method === 'add' ? `Added` : 'changed';
  const [isSub, setIsSub] = useState(false);
  const title = isSub ? 'Sub Category' : 'Category';

  useEffect(() => {
    if (open) {
      if (method === 'add') {
        formInstance.resetFields();
        setIsSub(false);
      } else {
        if (initialValues) {
          formInstance.setFieldsValue(initialValues);
          if (initialValues.category_id) {
            setIsSub(true);
          } else {
            setIsSub(false);
          }
        }
      }
    }
  }, [open, method, initialValues, formInstance]);

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
    const type = isSub ? 'subcategory' : 'category';

    try {
      const payload = {
        ...values,
        ...(methodType === 'post'
          ? {
              status: 1,
              created_by: user?.id
            }
          : {
              updated_by: user?.id
            })
      };

      const formData = FormData(payload);

      const response = await onSubmit(formData, methodType, type);

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

  const footerComponent = (
    <>
      <Button color='primary' variant='outlined' onClick={onClose}>
        Cancel
      </Button>
      <Button type='primary' htmlType='submit' form='form-category' loading={loading}>
        Save
      </Button>
    </>
  );

  return (
    <Modal
      title={method === 'add' ? `Add ${title}` : `Edit ${title}`}
      width={600}
      onClose={onClose}
      open={open}
      footer={footerComponent}
      onCancel={onClose}
      closable={true}
      className='modal-form'>
      <Form form={formInstance} id='form-category' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>

        {/* Switch to create sub-category */}
        <Form.Item hidden={initialValues ? true : false}>
          <Switch
            checked={isSub}
            onChange={(checked) => {
              setIsSub(checked);
            }}
            data-label='Create Sub-Category'
          />
        </Form.Item>

        {/* Parent select (disabled when switch is off) */}
        <Form.Item
          name='category_id'
          label='Main Category'
          hidden={initialValues ? (initialValues?.category_id ? false : true) : false}
          rules={
            isSub
              ? [
                  {
                    required: true,
                    message: 'Please choose main category!'
                  }
                ]
              : undefined
          }>
          <Select
            allowClear
            showSearch
            placeholder='Choose a main category'
            disabled={!isSub}
            options={mainCategories?.map((c) => ({ label: c.name, value: c.id }))}
          />
        </Form.Item>

        <Form.Item
          name='image'
          label='Cover Banner'
          valuePropName='file'
          getValueFromEvent={(e) => e}
          help='1440px x 800px'>
          <UploadImage value={{ url: initialValues?.image }} />
        </Form.Item>

        <Form.Item
          name='name'
          label='Category Name'
          rules={[{ required: true, message: 'Please enter Category name' }]}>
          <Input allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCategoryView;
