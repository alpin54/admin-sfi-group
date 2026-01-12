// -- libraries
import { useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';

// -- utils
import LocalStorage from '@utils/localStorage';
import FormData from '@utils/formdata';

// -- elements
import UploadImage from '@components/Elements/UploadImage/views';
import TranslationTabs from '@components/Elements/TranslationTabs/views';

const ModalBannerSignUpView = (props) => {
  const { method, open, onClose, initialValues, formInstance, notify, onSubmit, message, loading, refetch } = props;

  const user = LocalStorage.get('user');
  const methodType = method === 'edit' ? 'put' : 'post';
  const title = method === 'add' ? 'Add Banner' : method === 'edit' ? 'Edit Banner' : 'Detail Banner';
  const msg = method === 'add' ? 'Added' : method === 'edit' ? 'changed' : '';

  useEffect(() => {
    if (open) {
      if (methodType === 'add') {
        formInstance?.resetFields();
      } else if (initialValues) {
        // Lakukan Mapping
        const mappedFields = {
          image: initialValues?.image || '',
          en: {
            title: initialValues?.title?.en || '',
            description: initialValues?.description?.en || ''
          },
          id: {
            title: initialValues?.title?.id || '',
            description: initialValues?.description?.id || ''
          }
        };

        formInstance?.setFieldsValue(mappedFields);
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
      <Button type='primary' htmlType='submit' form='form-banner'>
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
      <Form form={formInstance} id='form-banner' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>
        <Form.Item label='Image' name='image' valuePropName='file' getValueFromEvent={(e) => e} help='1440px x 1686px'>
          <UploadImage value={{ url: initialValues?.image ? initialValues?.image : '' }} />
        </Form.Item>
        <TranslationTabs>
          {(lang) => (
            <>
              <Form.Item
                label='Title'
                name={[lang, 'title']}
                rules={[{ required: true, message: 'Please input title!' }]}>
                <Input />
              </Form.Item>
              <Form.Item
                label='Description'
                name={[lang, 'description']}
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

export default ModalBannerSignUpView;
