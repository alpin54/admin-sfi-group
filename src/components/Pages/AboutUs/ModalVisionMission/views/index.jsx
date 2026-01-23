import { useEffect } from 'react';
import { Button, Modal, Form, Input, notification } from 'antd';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- utils
import FormData from '@utils/formdata';

// -- elements
import UploadImage from '@components/Elements/UploadImage/views';
import TranslationTabs from '@components/Elements/TranslationTabs/views';

const ModalVisionMissionView = (props) => {
  const { method, open, onClose, initialValues, formInstance, notify, onSubmit, message, loading, refetch } = props;

  const methodType = method === 'edit' ? 'put' : 'post';
  const user = LocalStorage.get('user');
  const title = method === 'add' ? 'Add Mission' : method === 'edit' ? 'Edit Mission' : 'Detail Mission';
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
      const payload = {
        ...values,
        status: 1,
        ...(methodType === 'post' ? { created_by: user?.id } : { updated_by: user?.id })
      };

      // Validasi field multi bahasa
      const checkEn = payload.en && payload.en.title && !!payload.en.title.trim();
      const checkId = payload.id && payload.id.title && !!payload.id.title.trim();

      if (!checkEn) {
        notify({
          type: 'error',
          message: `${title} failed`,
          description: 'Please fill in Title at EN language tab'
        });
        return;
      }
      if (!checkId) {
        notify({
          type: 'error',
          message: `${title} failed`,
          description: 'Please fill in Title at ID language tab'
        });
        return;
      }

      // INTEGRASI: submit ke API (comment di sini saat static)
      const formData = FormData(payload);
      // const response = await onSubmit(formData, methodType);
      // if (response) {
      //   notify({
      //     type: 'success',
      //     message: `Data ${msg} successfully`
      //   });
      //   formInstance?.resetFields();
      //   onClose();
      //   refetch();
      // }
      // ----

      // Untuk versi static, langsung show sukses dialog
      notify({
        type: 'success',
        message: `Data ${msg} successfully`
      });
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
      <Button type='primary' htmlType='submit' form='form-about-us'>
        Save
      </Button>
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
      <Form form={formInstance} id='form-about-us' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>

        <TranslationTabs>
          {(lang) => (
            <>
              <Form.Item
                label='Title'
                name={['title', lang]}
                rules={[{ required: true, message: 'Please input title!' }]}>
                <Input />
              </Form.Item>
            </>
          )}
        </TranslationTabs>
      </Form>
    </Modal>
  );
};

export default ModalVisionMissionView;
