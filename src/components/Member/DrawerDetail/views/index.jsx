// -- libraries
import { useEffect } from 'react';
import { Button, Radio, Col, Drawer, Form, Input, Row, Space, DatePicker } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, GiftOutlined, ManOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/id';

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.locale('id');

// -- utils
import LocalStorage from '@utils/localStorage';
import FormData from '@utils/formdata';

// -- elements
import UploadImage from '@components/Elements/UploadImage/views';

const DrawerDetailView = (props) => {
  const { method, setMethod, open, onClose, data, notify, onSubmit, message, loading, refetch } = props;
  const user = LocalStorage.get('user');
  const isDetailMode = method === 'detail';
  const isEditMode = method === 'edit';
  const title = isEditMode ? 'Edit User Information' : 'User Information';
  const [formInstance] = Form.useForm();

  // Set value dari string ke dayjs instance ketika data berubah
  useEffect(() => {
    if (open) {
      formInstance?.resetFields();
      const newData = {
        ...data,
        date_of_birth: data?.date_of_birth ? dayjs(data.date_of_birth, 'YYYY-MM-DD') : null
      };
      formInstance?.setFieldsValue(newData);
    }
  }, [open, data, formInstance]);

  useEffect(() => {
    if (message) {
      notify({
        type: 'error',
        message: `${title} Failed`,
        description: message
      });
    }
  }, [message, notify, title]);

  // Pastikan date_of_birth dikirim sebagai string 'YYYY-MM-DD'
  const handleFinish = async (values) => {
    try {
      const payload = {
        ...values,
        date_of_birth: values.date_of_birth ? dayjs(values.date_of_birth).format('YYYY-MM-DD') : null,
        updated_by: user?.id
      };
      const formData = FormData(payload);

      // Submit form data
      const response = await onSubmit(formData);

      if (response) {
        notify({
          type: 'success',
          message: `Data berhasil disimpan`
        });
        formInstance?.resetFields();
        onClose();
        refetch();
      }
    } catch (err) {
      notify({
        type: 'error',
        message: `Data gagal disimpan`,
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
        <Button type='primary' htmlType='submit' form='form-user-information' loading={loading}>
          Save
        </Button>
      )}
    </>
  );

  return (
    <Drawer
      title={title}
      width={600}
      open={open}
      footer={footerComponent}
      onClose={onClose}
      closable={true}
      className='drawer-form'>
      <Form form={formInstance} id='form-user-information' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='id' hidden initialValue={data?.id}>
          <Input />
        </Form.Item>

        <Form.Item
          label={
            <Space>
              <UserOutlined />
              Full Name
            </Space>
          }
          name='image'
          valuePropName='file'
          getValueFromEvent={(e) => e}>
          <UploadImage disabled={isDetailMode} value={{ url: data?.image ? data?.image : '' }} />
        </Form.Item>

        <Form.Item
          name='name'
          rules={[
            {
              required: !isDetailMode,
              message: 'Please input your full name!'
            }
          ]}>
          <Input disabled={isDetailMode} allowClear placeholder='Full Name' />
        </Form.Item>

        <Form.Item
          label={
            <Space>
              <PhoneOutlined />
              Phone Number
            </Space>
          }
          name='phone'
          rules={[
            {
              required: !isDetailMode,
              message: 'Please enter a valid phone number!'
            }
          ]}>
          <Input disabled={isDetailMode} allowClear />
        </Form.Item>

        <Form.Item
          label={
            <Space>
              <MailOutlined />
              Email
            </Space>
          }
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
          label={
            <Space>
              <GiftOutlined />
              Date of Birth
            </Space>
          }
          name='date_of_birth'
          rules={[
            {
              required: !isDetailMode,
              message: 'Please pick your date of birth!'
            }
          ]}>
          <DatePicker
            format='DD MMMM YYYY'
            style={{ width: '100%' }}
            allowClear={!isDetailMode}
            disabled={isDetailMode}
            placeholder='Select date'
            inputReadOnly
          />
        </Form.Item>

        <Form.Item
          label={
            <Space>
              <ManOutlined />
              Gender
            </Space>
          }
          name='gender'
          rules={[
            {
              required: !isDetailMode,
              message: 'Please select gender!'
            }
          ]}>
          <Radio.Group disabled={isDetailMode}>
            <Radio value='male' checked={data?.gender === 'Male'}>
              Male
            </Radio>
            <Radio value='female' checked={data?.gender === 'Female'}>
              Female
            </Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default DrawerDetailView;
