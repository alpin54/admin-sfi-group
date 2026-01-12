// -- libraries
import { useEffect } from 'react';
import { Button, Modal, Form, Input, notification } from 'antd';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- utils
import FormData from '@utils/formdata';

// -- elements
import UploadImage from '@components/Elements/UploadImage/views';
import TranslationTabsWidget from '@components/Elements/TranslationTabs/views';

const { TextArea } = Input;

const ModalImageView = (props) => {
  const { method = 'add', setMethod, open, onClose, initialValues, notify } = props;
  const [modalForm] = Form.useForm(); // gunakan form terpisah untuk modal
  const user = LocalStorage.get('user');
  const methodType = method === 'edit' ? 'put' : 'post';
  const title = method === 'add' ? 'Add Image' : method === 'edit' ? 'Edit Image' : 'Detail Image';
  const msg = method === 'add' ? 'Added' : method === 'edit' ? 'changed' : '';

  useEffect(() => {
    if (open) {
      if (methodType === 'add') {
        modalForm.resetFields();
      } else if (initialValues) {
        // normalisasi title/description jika perlu
        const normalized = {
          ...initialValues,
          title:
            typeof initialValues?.title === 'string'
              ? { en: initialValues.title, id: initialValues.title }
              : (initialValues?.title ?? { en: '', id: '' }),
          description:
            typeof initialValues?.description === 'string'
              ? { en: initialValues.description, id: initialValues.description }
              : (initialValues?.description ?? { en: '', id: '' }),
          image: initialValues?.image ?? ''
        };
        modalForm.setFieldsValue(normalized);
      }
    } else {
      // reset saat modal ditutup agar form internal bersih
      modalForm.resetFields();
    }
  }, [open, methodType, initialValues, modalForm]);

  const handleFinish = async (values) => {
    try {
      const payload = {
        ...values,
        ...(methodType === 'post' ? { created_by: user?.id } : { updated_by: user?.id })
      };

      const fd = FormData(payload);

      // TODO: submit fd ke API
      // contoh mock notify
      if (typeof notify === 'function') {
        notify({ type: 'success', message: `Data ${msg} successfully` });
      } else {
        notification.success({ message: `Data ${msg} successfully` });
      }

      modalForm.resetFields();
      onClose();
    } catch (err) {
      if (typeof notify === 'function') {
        notify({ type: 'error', message: `Data failed to ${msg}`, description: err?.message ?? 'Unknown error' });
      } else {
        notification.error({ message: `Data failed to ${msg}`, description: err?.message ?? 'Unknown error' });
      }
    }
  };

  const footerComponent = (
    <>
      <Button
        onClick={() => {
          modalForm.resetFields();
          onClose();
        }}>
        Cancel
      </Button>
      <Button type='primary' htmlType='submit' form='form-modal-image'>
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
        modalForm.resetFields();
        onClose();
      }}
      closable={true}
      className='modal-form'>
      <Form form={modalForm} id='form-modal-image' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>

        <TranslationTabsWidget
          en={
            <>
              <Form.Item name={['image']} label='Image' valuePropName='file' getValueFromEvent={(e) => e}>
                <UploadImage />
              </Form.Item>
              <Form.Item
                name={['title', 'en']}
                label='Title '
                rules={[{ required: true, message: 'Title (EN) is required' }]}>
                <Input />
              </Form.Item>
            </>
          }
          id={
            <>
              <Form.Item
                name={['title', 'id']}
                label='Title '
                rules={[{ required: true, message: 'Title (ID) is required' }]}>
                <Input />
              </Form.Item>
            </>
          }
        />
      </Form>
    </Modal>
  );
};

export default ModalImageView;
