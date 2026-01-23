import { useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';

// -- utils
import LocalStorage from '@utils/localStorage';
import FormData from '@utils/formdata';

// -- elements
import UploadImage from '@components/Elements/UploadImage/views';
import TranslationTabs from '@components/Elements/TranslationTabs/views';

const ModalFeatureView = (props) => {
  const { method, open, onClose, initialValues, formInstance, notify, onSubmit, message, loading, refetch } = props;

  const methodType = method === 'edit' ? 'put' : 'post';
  const user = LocalStorage.get('user');
  const title =
    method === 'add' ? 'Add Reward Points' : method === 'edit' ? 'Edit Reward Points' : 'Detail Reward Points';
  const msg = method === 'add' ? 'Added' : method === 'edit' ? 'Changed' : '';

  useEffect(() => {
    if (open) {
      if (methodType === 'add') {
        formInstance?.resetFields();
      } else {
        if (initialValues) {
          formInstance?.setFieldsValue(initialValues);
        }
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

  // VALIDASI: Title di EN dan ID wajib diisi.
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
          description: 'Please fill in Form Input at ID language tab'
        });
        return;
      }
      if (!checkId) {
        notify({
          type: 'error',
          message: `${title} failed`,
          description: 'Please fill in Form Input at EN language tab'
        });
        return;
      }

      // INTEGRASI: submit ke API (comment di sini saat static)
      const formData = FormData(payload);
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

  const footerComponent = (
    <>
      <Button color='primary' variant='outlined' onClick={onClose}>
        Cancel
      </Button>
      <Button type='primary' htmlType='submit' form='form-reward-points' loading={loading}>
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
      <Form form={formInstance} id='form-reward-points' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>
        {/* Translation Tabs */}
        <Form.Item label='Icon' name='image' valuePropName='file' getValueFromEvent={(e) => e} help='Size 1:1'>
          <UploadImage value={{ url: initialValues?.image ? initialValues?.image : '' }} />
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
              <Form.Item
                label='Description'
                name={['description', lang]}
                rules={[{ required: true, message: 'Please input description!' }]}>
                <Input />
              </Form.Item>
            </>
          )}
        </TranslationTabs>
      </Form>
    </Modal>
  );
};

export default ModalFeatureView;
