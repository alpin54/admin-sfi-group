// -- libraries
import { useEffect } from 'react';
import { Button, Modal, Form, Input, Tabs } from 'antd';

// -- utils
import LocalStorage from '@utils/localStorage';
import UploadImage from '@components/Elements/UploadImage/views';

const ModalRevisionView = (props) => {
  const { variant = 'multiple', data, open, onClose, notify, onSubmit, message, loading, refetch } = props;
  const user = LocalStorage.get('user');
  const [formInstance] = Form.useForm();
  const title = variant === 'ktp' ? 'Revision KTP' : variant === 'npwp' ? 'Revision NPWP' : 'Revision';

  useEffect(() => {
    if (message) {
      notify({
        type: 'error',
        message: 'Revision Failed!',
        description: message
      });
    }
  }, [message, notify]);

  const handleFinish = async (values) => {
    try {
      const payload = {
        ...values,
        id: data?.id,
        updated_by: user?.id
      };

      // Submit form data
      const response = await onSubmit(payload);

      if (response) {
        notify({
          type: 'success',
          message: 'Revision Successfully!'
        });
        formInstance?.resetFields();
        onClose();
        refetch();
      }
    } catch (err) {
      notify({
        type: 'error',
        message: 'Revision Failed!',
        description: err?.message ?? 'Unknown error'
      });
    }
  };

  const footerComponent = (
    <>
      <Button color='primary' variant='outlined' onClick={onClose}>
        Cancel
      </Button>
      <Button type='primary' htmlType='submit' form='form-revision' loading={loading}>
        Save
      </Button>
    </>
  );

  const ktpComponent = (
    <>
      <Form.Item
        label='KTP'
        name='ktp_image'
        rules={[
          {
            required: true,
            message: 'Please upload KTP image!'
          }
        ]}>
        <UploadImage />
      </Form.Item>
      <Form.Item
        label='Remark'
        name='ktp_remark'
        rules={[
          {
            required: true,
            message: 'Please input KTP revision note!'
          }
        ]}>
        <Input allowClear />
      </Form.Item>
    </>
  );

  const npwpComponent = (
    <>
      <Form.Item
        label='NPWP'
        name='npwp_image'
        rules={[
          {
            required: true,
            message: 'Please upload NPWP image!'
          }
        ]}>
        <UploadImage />
      </Form.Item>
      <Form.Item
        label='Remark'
        name='npwp_remark'
        rules={[
          {
            required: true,
            message: 'Please input NPWP revision note!'
          }
        ]}>
        <Input allowClear />
      </Form.Item>
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
      <Form form={formInstance} id='form-revision' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        {variant === 'multiple' && (
          <Tabs
            defaultActiveKey='1'
            items={[
              {
                key: '1',
                label: 'KTP',
                children: ktpComponent
              },
              {
                key: '2',
                label: 'NPWP',
                children: npwpComponent
              }
            ]}
          />
        )}
        {variant === 'ktp' && ktpComponent}
        {variant === 'npwp' && npwpComponent}
      </Form>
    </Modal>
  );
};

export default ModalRevisionView;
