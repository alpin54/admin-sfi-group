import { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Space, Select } from 'antd';
import LocalStorage from '@utils/localStorage';

// Dummy data for demonstration. Replace with API calls as needed.
const provinces = [
  { value: 'Jawa Barat', label: 'Jawa Barat' },
  { value: 'Jawa Tengah', label: 'Jawa Tengah' }
];

const cities = {
  'Jawa Barat': [
    { value: 'Bandung', label: 'Bandung' },
    { value: 'Bekasi', label: 'Bekasi' }
  ],
  'Jawa Tengah': [
    { value: 'Semarang', label: 'Semarang' },
    { value: 'Solo', label: 'Solo' }
  ]
};

const districts = {
  Bandung: [
    { value: 'Cidadap', label: 'Cidadap' },
    { value: 'Cicendo', label: 'Cicendo' }
  ],
  Bekasi: [{ value: 'Bekasi Barat', label: 'Bekasi Barat' }],
  Semarang: [{ value: 'Candisari', label: 'Candisari' }],
  Solo: [{ value: 'Laweyan', label: 'Laweyan' }]
};

const villages = {
  Cidadap: [{ value: 'Ledeng', label: 'Ledeng' }],
  Cicendo: [{ value: 'Arjuna', label: 'Arjuna' }],
  BekasiBarat: [{ value: 'Bintara', label: 'Bintara' }],
  Candisari: [{ value: 'Jomblang', label: 'Jomblang' }],
  Laweyan: [{ value: 'Purwosari', label: 'Purwosari' }]
};

const ModalAddressView = (props) => {
  const { open, onClose, initialValues, notify, onSubmit, message, loading, refetch } = props;
  const [formInstance] = Form.useForm();
  const user = LocalStorage.get('user');

  const [province, setProvince] = useState(undefined);
  const [city, setCity] = useState(undefined);
  const [district, setDistrict] = useState(undefined);
  const [village, setVillage] = useState(undefined);

  useEffect(() => {
    if (open) {
      formInstance?.setFieldsValue(initialValues);
      setProvince(initialValues?.province);
      setCity(initialValues?.city);
      setDistrict(initialValues?.district);
      setVillage(initialValues?.village);
    }
  }, [open, initialValues, formInstance]);

  useEffect(() => {
    if (message) {
      notify({
        type: 'error',
        message: 'Edit Address Failed!',
        description: message
      });
    }
  }, [message, notify]);

  // Reset dependent fields
  useEffect(() => {
    setCity(undefined);
    setDistrict(undefined);
    setVillage(undefined);
    formInstance.setFieldsValue({ city: undefined, district: undefined, village: undefined });
  }, [province, formInstance]);

  useEffect(() => {
    setDistrict(undefined);
    setVillage(undefined);
    formInstance.setFieldsValue({ district: undefined, village: undefined });
  }, [city, formInstance]);

  useEffect(() => {
    setVillage(undefined);
    formInstance.setFieldsValue({ village: undefined });
  }, [district, formInstance]);

  const handleFinish = async (values) => {
    try {
      const payload = {
        ...values,
        updated_by: user?.id
      };
      const response = await onSubmit(payload);

      if (response) {
        notify({
          type: 'success',
          message: `Data saved successfully`
        });
        formInstance?.resetFields();
        onClose();
        refetch();
      }
    } catch (err) {
      notify({
        type: 'error',
        message: `Failed to save data`,
        description: err?.message ?? 'Unknown error'
      });
    }
  };

  const footerComponent = (
    <Space size={12}>
      <Button color='primary' variant='outlined' onClick={onClose}>
        Cancel
      </Button>
      <Button type='primary' htmlType='submit' form='form-address' loading={loading}>
        Save
      </Button>
    </Space>
  );

  return (
    <Modal
      title='Address'
      width={600}
      onClose={onClose}
      open={open}
      footer={footerComponent}
      onCancel={onClose}
      closable={true}
      className='modal-form'
      size='large'>
      <Form form={formInstance} id='form-address' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='province' rules={[{ required: true, message: 'Select province!' }]}>
          <Select
            placeholder='Select province'
            options={provinces}
            value={province}
            onChange={(value) => setProvince(value)}
            allowClear
          />
        </Form.Item>
        <Form.Item name='city' rules={[{ required: true, message: 'Select city!' }]}>
          <Select
            placeholder='Select city'
            options={province ? cities[province] : []}
            value={city}
            onChange={(value) => setCity(value)}
            disabled={!province}
            allowClear
          />
        </Form.Item>
        <Form.Item name='district' rules={[{ required: true, message: 'Select district!' }]}>
          <Select
            placeholder='Select district'
            options={city ? districts[city] : []}
            value={district}
            onChange={(value) => setDistrict(value)}
            disabled={!city}
            allowClear
          />
        </Form.Item>
        <Form.Item name='village' rules={[{ required: true, message: 'Select village!' }]}>
          <Select
            placeholder='Select village'
            options={district ? villages[district.replace(/\s/g, '')] : []}
            value={village}
            onChange={(value) => setVillage(value)}
            disabled={!district}
            allowClear
          />
        </Form.Item>
        <Form.Item name='postal_code' rules={[{ required: true, message: 'Enter postal code!' }]}>
          <Input placeholder='Enter postal code' />
        </Form.Item>
        <Form.Item name='address' rules={[{ required: true, message: 'Enter full address!' }]}>
          <Input.TextArea placeholder='Input address' autoSize={{ minRows: 5 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddressView;
