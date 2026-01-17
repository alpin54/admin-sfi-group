// -- libraries
import { useEffect } from 'react';
import { Button, Modal, Input, Form } from 'antd';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- elements
import TextEditor from '@components/Elements/TextEditor/views';
import TranslationTabs from '@components/Elements/TranslationTabs/views';

const ModalItemView = (props) => {
  const { method, open, onClose, initialValues, formInstance, notify, onSubmit, message, loading, refetch } = props;
  const user = LocalStorage.get('user');
  const methodType = method === 'edit' ? 'put' : 'post';
  const title = method === 'add' ? 'Add FAQ Item' : 'Edit FAQ Item';
  const msg = method === 'add' ? 'Added' : method === 'edit' ? 'changed' : '';

  useEffect(() => {
    if (open) {
      if (methodType === 'add') {
        formInstance?.resetFields();
      } else if (initialValues) {
        // Lakukan Mapping
        const mappedFields = {
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
      <Button
        onClick={() => {
          formInstance.resetFields();
          onClose();
        }}>
        Cancel
      </Button>
      <Button type='primary' htmlType='submit' form='form-modal-item' loading={loading} disabled={loading}>
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
      onCancel={() => {
        formInstance.resetFields();
        onClose();
      }}
      closable={true}
      className='modal-form'>
      <Form form={formInstance} id='form-modal-item' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='id' hidden>
          <Input />
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
                <TextEditor />
              </Form.Item>
            </>
          )}
        </TranslationTabs>
      </Form>
    </Modal>
  );
};

export default ModalItemView;
