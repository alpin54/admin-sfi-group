import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Breadcrumb, Form, Button, Input, Flex, Row, Col, Switch } from 'antd';
import Link from 'next/link';

// -- styles
import style from '@components/Pages/Home/HeroBanner/styles/style.module.scss';

// -- hooks
import useNotification from '@hooks/useNotification';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- utils
import FormData from '@utils/formdata';

// -- elements
import UploadImage from '@components/Elements/UploadImage/views';
import CardUserLog from '@components/Elements/CardUserLog/widgets/Default';

const HeroBannerView = (props) => {
  const { slug, action, data, loading, onSubmit, refetch } = props;
  const { notify, contextHolder: notificationHolder } = useNotification();
  const { TextArea } = Input;
  const [formInstance] = Form.useForm();
  const [showButton, setShowButton] = useState(false);
  const [newTab, setNewTab] = useState(false);
  const router = useRouter();
  const msg = slug ? action : 'Add';
  const methodType = slug ? 'put' : 'post';
  const user = LocalStorage.get('user');

  // ensure form values are updated when data changes (for async data)
  useEffect(() => {
    if (formInstance) {
      if (data) {
        formInstance.setFieldsValue(data);
        setShowButton(data.button_text_1);
        setNewTab(data.new_tab_1);
      }
    }
  }, [formInstance, data, slug]);

  // Handle form submit
  const handleFinish = async (values) => {
    try {
      const payload = {
        ...values,
        ...(showButton
          ? {
              button_text_1: values.button_text_1,
              button_url_1: values.button_url_1,
              new_tab_1: newTab ? 1 : 0
            }
          : { button_text_1: '', button_url_1: '', new_tab_1: 0 }),
        ...(methodType === 'post'
          ? {
              status: 1,
              created_by: user?.id
            }
          : {
              updated_by: user?.id
            })
      };
      const formData = FormData(payload);

      // Submit form data
      const response = await onSubmit(formData, methodType);

      if (response?.data) {
        notify({
          type: 'success',
          message: `Data ${msg} successfully`
        });
        formInstance?.resetFields();
        router.push('/pages/home/edit');
      } else {
        notify({
          type: 'error',
          message: `Failed to ${msg} data`
        });
      }
    } catch (err) {
      notify({
        type: 'error',
        message: `Data failed to ${msg}`,
        description: err?.message ?? 'Unknown error'
      });
    }
  };

  return (
    <>
      {notificationHolder}
      <section id='hero-banner-form'>
        <div className='row-container'>
          <Breadcrumb
            items={[
              { title: <Link href='/pages'>Pages</Link> },
              { title: <Link href='/pages/home'>Edit Home</Link> },
              {
                title: action === 'add' ? 'Add Hero Banner' : `Edit Hero Banner`
              }
            ]}
          />
        </div>

        {/* pass initialValues so first render has the correct values for conditional rendering */}
        <Form form={formInstance} id='form-hero-banner' layout='vertical' onFinish={handleFinish} autoComplete='off'>
          <Form.Item name='id' hidden>
            <Input />
          </Form.Item>
          <Row gutter={24} className='row-container'>
            <Col span={12}>
              <Form.Item
                label='Image Desktop'
                name='image_desktop'
                valuePropName='file'
                getValueFromEvent={(e) => e}
                help='1440px x 810px'>
                <UploadImage value={{ url: data?.image_desktop }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Image Mobile'
                name='image_mobile'
                valuePropName='file'
                getValueFromEvent={(e) => e}
                help='732px x 1112px'>
                <UploadImage value={{ url: data?.image_mobile }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label='Title' name='title'>
            <Input allowClear />
          </Form.Item>

          <Form.Item name='description' label='Description'>
            <TextArea allowClear rows={3} />
          </Form.Item>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item>
                <Switch onChange={(checked) => setShowButton(checked)} checked={showButton} data-label='Show Button' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                hidden={!showButton}
                className={style.formLabelSwitch}
                label={
                  <>
                    <Flex justify='space-between'>
                      <span>Text Button</span>
                      <Switch
                        onChange={(checked) => setNewTab(checked)}
                        checked={newTab}
                        size='small'
                        data-label='New Tab'
                        data-placement='left'
                      />
                    </Flex>
                  </>
                }
                name='button_text_1'
                rules={showButton ? [{ required: true, message: 'Text Button is required!' }] : []}>
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                hidden={!showButton}
                label='Link Button'
                name='button_url_1'
                rules={showButton ? [{ required: true, message: 'Link Button is required!' }] : []}>
                <Input allowClear />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item shouldUpdate className='ant-form-item-btn'>
            <Flex justify='end' gap={16}>
              <Link href='/pages/home/edit'>
                <Button color='primary' variant='outlined'>
                  Cancel
                </Button>
              </Link>
              <Button type='primary' htmlType='submit' form='form-hero-banner' loading={loading}>
                Save
              </Button>
            </Flex>
          </Form.Item>
        </Form>

        <CardUserLog
          created_by={1}
          updated_by={1}
          created_at={'2025-08-15T06:06:51.338Z'}
          updated_at={'2025-08-15T06:06:51.338Z'}
        />
      </section>
    </>
  );
};

export default HeroBannerView;
