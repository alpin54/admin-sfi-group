// -- libraries
import { useCallback, useEffect, useState } from 'react';
import { Card, Button, Form, Select, Space, Input } from 'antd';

// -- icons
import { WarningOutlined } from '@ant-design/icons';

// -- styles
import style from '@components/Pages/Home/FormSection3/styles/style.module.scss';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- elements
import SectionHeader from '@components/Elements/SectionHeader/views';

const FormHomeSection3View = (props) => {
  const { method, confirm, notify, data, ready, loading, message, productOptions, onPublish, onSubmit } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [formInstance] = Form.useForm();
  const user = LocalStorage.get('user');

  useEffect(() => {
    if (method === 'edit') {
      setIsEdit(true);
    }
  }, [method]);

  useEffect(() => {
    if (data) {
      formInstance?.setFieldsValue(data);
      formInstance?.setFieldsValue({ product: data?.list.map((item) => ({ label: item.name, value: item.id })) });
    }
  }, [data, formInstance]);

  useEffect(() => {
    if (method === 'edit') {
      setIsEdit(true);
    }
  }, [method]);

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
        content: `Are you sure you want to ${title.toLowerCase()} category?`,
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
      const selectedProducts = values.product || [];
      const payload = selectedProducts.map((item) => ({
        product_id: item,
        status: true,
        created_by: user?.id
      }));

      const section = {
        id: data?.id,
        title: values.title,
        status: data?.status,
        updated_by: user?.id
      };

      // Call onSubmit with the new payload
      const response = await onSubmit(payload, section);

      if (response?.data) {
        notify({
          type: 'success',
          message: `Data submitted successfully`
        });
        setIsEdit(false);
      } else {
        notify({
          type: 'error',
          message: `Failed to submit data`
        });
      }
    } catch (err) {
      notify({
        type: 'error',
        message: `Data failed to submit`,
        description: err?.message ?? 'Unknown error'
      });
    }
  };

  return (
    <Card loading={ready}>
      <SectionHeader title='Product' publish={data?.status} onPublish={() => handlePublish(data)} />
      <Form form={formInstance} id='form-product' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='title' label='Title' rules={[{ required: true, message: 'Title is required' }]}>
          <Input allowClear readOnly={!isEdit} />
        </Form.Item>
        <Form.Item name='product' label='Product' rules={[{ required: true, message: 'Product is required' }]}>
          <Select
            mode='multiple'
            options={productOptions?.map((item) => ({ label: item.name, value: item.id })) || []}
            allowClear
            placeholder='Select product(s)'
            className={style.customSelect}
            disabled={!isEdit}
          />
        </Form.Item>
        <Space size={16}>
          {isEdit ? (
            <>
              <Button color='primary' variant='outlined' onClick={(e) => handleEnableForm(e, false)}>
                Cancel
              </Button>
              <Button type='primary' htmlType='submit' form='form-product' loading={loading}>
                Save
              </Button>
            </>
          ) : (
            <Button type='primary' onClick={(e) => handleEnableForm(e, true)}>
              Edit
            </Button>
          )}
        </Space>
      </Form>
    </Card>
  );
};

export default FormHomeSection3View;
