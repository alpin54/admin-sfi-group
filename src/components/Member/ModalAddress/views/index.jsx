// -- libraries
import { useEffect } from 'react';
import { Button, Radio, Modal, Form, Input, Select, Space, DatePicker } from 'antd';

// -- utils
import LocalStorage from '@utils/localStorage';

const ModalAddressView = (props) => {
  const {
    open,
    onClose,
    data,
    notify,
    onSubmit,
    message,
    loading,
    refetch,
    provinceOptions,
    cityOptions,
    districtOptions,
    subdistrictOptions
  } = props;
  const user = LocalStorage.get('user');
  const [formInstance] = Form.useForm();

  // Set value dari string ke dayjs instance ketika data berubah
  useEffect(() => {
    if (open) {
      formInstance?.resetFields();
      formInstance?.setFieldsValue(data);
    }
  }, [open, data, formInstance]);

  useEffect(() => {
    if (message) {
      notify({
        type: 'error',
        message: 'Update Address Failed!',
        description: message
      });
    }
  }, [message, notify]);

  // Pastikan date_of_birth dikirim sebagai string 'YYYY-MM-DD'
  const handleFinish = async (values) => {
    try {
      const payload = {
        ...values,
        updated_by: user?.id
      };

      // Submit form data
      const response = await onSubmit(payload);

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

  const footerComponent = (
    <>
      <Button color='primary' variant='outlined' onClick={onClose}>
        Cancel
      </Button>
      <Button type='primary' htmlType='submit' form='form-address' loading={loading}>
        Save
      </Button>
    </>
  );

  return (
    <Modal
      title='Address'
      width={600}
      open={open}
      footer={footerComponent}
      onCancel={onClose}
      closable={true}
      className='modal-form'>
      <Form form={formInstance} id='form-address' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='id' hidden initialValue={data?.id}>
          <Input />
        </Form.Item>
        <Form.Item
          label='Full Name'
          name='name'
          rules={[
            {
              required: true,
              message: 'Please input your full name!'
            }
          ]}>
          <Input allowClear placeholder='Full Name' />
        </Form.Item>
        <Form.Item
          label='Phone Number'
          name='phone'
          rules={[
            {
              required: true,
              message: 'Please input your phone number!'
            },
            { pattern: /^\d+$/, message: 'Phone number must contain only digits' }
          ]}>
          <Input allowClear placeholder='Phone Number' />
        </Form.Item>
        <Form.Item
          label='Label'
          name='label'
          rules={[
            {
              required: true,
              message: 'Please input your label!'
            }
          ]}>
          <Input allowClear placeholder='Label' />
        </Form.Item>
        <Form.Item label='Province' name='province_id' rules={[{ required: true, message: 'Please select province!' }]}>
          <Select
            showSearch
            allowClear
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            options={provinceOptions.map((province) => ({
              label: province.provinsi_name,
              value: province.id
            }))}
          />
        </Form.Item>
        <Form.Item label='City' name='city_id' rules={[{ required: true, message: 'Please select city!' }]}>
          <Select
            showSearch
            allowClear
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            options={cityOptions.map((city) => ({
              label: city.kabupaten_name,
              value: city.id
            }))}
          />
        </Form.Item>
        <Form.Item label='District' name='district_id' rules={[{ required: true, message: 'Please select district!' }]}>
          <Select
            showSearch
            allowClear
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            options={districtOptions.map((district) => ({
              label: district.kecamatan_name,
              value: district.id
            }))}
          />
        </Form.Item>
        <Form.Item
          label='Sub-District'
          name='subdistrict_id'
          rules={[{ required: true, message: 'Please select sub district!' }]}>
          <Select
            showSearch
            allowClear
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            options={subdistrictOptions.map((subdistrict) => ({
              label: subdistrict.kelurahan_name,
              value: subdistrict.id
            }))}
          />
        </Form.Item>
        <Form.Item
          label='Street Address'
          name='address'
          rules={[
            {
              required: true,
              message: 'Please input your street address!'
            }
          ]}>
          <Input.TextArea allowClear placeholder='Street Address' rows={4} />
        </Form.Item>
        <Form.Item
          label='Postal Code'
          name='postal_code'
          rules={[
            {
              required: true,
              message: 'Please input your postal code!'
            }
          ]}>
          <Input allowClear placeholder='Postal Code' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddressView;
