import { useEffect, useState } from 'react';
import { Breadcrumb, Card, Button, Form, Input, Space } from 'antd';
import Link from 'next/link';
import { Row, Col } from 'antd';

// -- hooks
import useConfirmationModal from '@hooks/useConfirmationModal';
import useNotification from '@hooks/useNotification';

// -- utils
import LocalStorage from '@utils/localStorage';
import FormData from '@utils/formdata';

// -- elements
import CardUserLogWidget from '@components/Elements/CardUserLog/widgets/Default';
import UploadImage from '@components/Elements/UploadImage/views';
import TranslationTabs from '@components/Elements/TranslationTabs/views';

const FormView = (props) => {
  const { method, data, slug, loading, message, onSubmit } = props;
  const { confirm, contextHolder: confirmHolder } = useConfirmationModal();
  const { notify, contextHolder: notificationHolder } = useNotification();
  const [isEdit, setIsEdit] = useState(false);
  const [formInstance] = Form.useForm();
  const { TextArea } = Input;
  const user = LocalStorage.get('user');

  useEffect(() => {
    if (method === 'edit') {
      setIsEdit(true);
    }
  }, [method]);

  useEffect(() => {
    if (data) {
      formInstance?.setFieldsValue(data);
    }
  }, [data, formInstance]);

  // useEffect(() => {
  //   if (data) {
  //     formInstance?.setFieldsValue({
  //       ...data,
  //       en: {
  //         ...data.en
  //       },
  //       id: {
  //         ...data.id
  //       }
  //     });
  //   }
  // }, [data, formInstance]);

  useEffect(() => {
    if (message) {
      notify({
        type: 'error',
        message: `Failed`,
        description: message
      });
    }
  }, [message, notify]);

  const handleEnableForm = (e, value) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEdit(value);
  };

  const handleFinish = async (values) => {
    try {
      const payload = {
        ...values,
        updated_by: user?.id
      };
      const formData = FormData(payload);
      // Submit form data
      const response = await onSubmit(formData);

      if (response) {
        notify({
          type: 'success',
          message: 'Data updated successfully'
        });
        setIsEdit(false);
        if (typeof refetch === 'function') refetch();
      } else {
        notify({
          type: 'error',
          message: 'Data failed to updated'
        });
      }
    } catch (err) {
      console.log('Error:', err);

      notify({
        type: 'error',
        message: 'Data failed to updated',
        description: err?.message ?? 'Unknown error'
      });
    }
  };

  return (
    <>
      {confirmHolder}
      {notificationHolder}
      <section>
        <div className='row-container'>
          <Breadcrumb
            items={[
              { title: <Link href='/email'>Email</Link> },
              { title: method === 'edit' ? 'Edit Email' : 'Detail Email' }
            ]}
          />
        </div>

        <div className='row-container'>
          <Card loading={loading}>
            <Form
              form={formInstance}
              id='form-email-template'
              layout='vertical'
              onFinish={handleFinish}
              initialValues={data}
              autoComplete='off'>
              <Form.Item name='id' hidden>
                <Input />
              </Form.Item>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Col span={24}>
                    <Form.Item label='Logo' name='logo' valuePropName='file' getValueFromEvent={(e) => e}>
                      <UploadImage value={{ url: data?.logo }} disabled={!isEdit} />
                    </Form.Item>
                  </Col>
                </Col>

                <Col span={24}>
                  <Form.Item name='logo_url' label='Url' rules={[{ required: true, message: 'Logo is required' }]}>
                    <Input readOnly={!isEdit} />
                  </Form.Item>
                </Col>

                {/* <Col span={24}>
                  <Row gutter={8}>
                    <Col span={8}>
                      <Form.Item
                        name='greetings'
                        label='Greetings'
                        rules={[{ required: true, message: 'Greetings is required' }]}>
                        <Input readOnly={!isEdit} />
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item
                        name='greetings_name'
                        label=' '
                        rules={[{ required: true, message: 'Greetings Name is required' }]}>
                        <Input readOnly={!isEdit} />
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item
                        name='greetings_end'
                        label=' '
                        rules={[{ required: true, message: 'Greetings End is required' }]}>
                        <Input readOnly={!isEdit} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name='paragraph1'
                    label='Paragraph 01'
                    rules={[{ required: true, message: ' Paragraph is required' }]}>
                    <TextArea rows={4} readOnly={!isEdit} />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name='cta_text'
                    label='CTA Text'
                    rules={[{ required: true, message: 'CTA Text is required' }]}>
                    <Input readOnly={!isEdit} />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item name='cta_url' label='Url' rules={[{ required: true, message: 'Url is required' }]}>
                    <Input readOnly={!isEdit} />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name='paragraph2'
                    label='Paragraph 02'
                    rules={[{ required: true, message: 'Paragraph is required' }]}>
                    <TextArea rows={2} readOnly={!isEdit} />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name='signature'
                    label='Signature'
                    rules={[{ required: true, message: 'Signature is required' }]}>
                    <Input readOnly={!isEdit} />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name='signature_brand'
                    label=' '
                    rules={[{ required: true, message: 'Signature Brand is required' }]}>
                    <Input readOnly={!isEdit} />
                  </Form.Item>
                </Col> */}

                <Col span={24}>
                  <TranslationTabs>
                    {(lang) => (
                      <>
                        <Col span={24}>
                          <Row gutter={8} align='top'>
                            <Col span={8}>
                              <Form.Item
                                name={['greetings', lang]}
                                label='Greetings'
                                rules={[{ required: true, message: 'Greetings is required' }]}>
                                <Input readOnly={!isEdit} />
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              <Form.Item
                                name={['greetings_name', lang]}
                                label=' '
                                rules={[{ required: true, message: 'Greetings Name is required' }]}>
                                <Input readOnly={!isEdit} />
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              <Form.Item
                                name={['greetings_end', lang]}
                                label=' '
                                rules={[{ required: true, message: 'Greetings End is required' }]}>
                                <Input readOnly={!isEdit} />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>

                        {/* Paragraph 1 (full width) */}
                        <Col span={24}>
                          <Form.Item
                            name={['paragraph1', lang]}
                            label='Paragraph 01'
                            rules={[{ required: true, message: 'Paragraph is required' }]}>
                            <TextArea rows={4} readOnly={!isEdit} />
                          </Form.Item>
                        </Col>

                        {/* CTA Text & CTA URL Sampingan */}
                        <Col span={24}>
                          <Row gutter={8}>
                            <Col xs={24} md={12}>
                              <Form.Item
                                name={['cta_text', lang]}
                                label='CTA Text'
                                rules={[{ required: true, message: 'CTA Text is required' }]}>
                                <Input readOnly={!isEdit} />
                              </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Item
                                name={['cta_url', lang]}
                                label='Url'
                                rules={[{ required: true, message: 'Url is required' }]}>
                                <Input readOnly={!isEdit} />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>

                        {/* Paragraph 2 (full width) */}
                        <Col span={24}>
                          <Form.Item
                            name={['paragraph2', lang]}
                            label='Paragraph 02'
                            rules={[{ required: true, message: 'Paragraph is required' }]}>
                            <TextArea rows={2} readOnly={!isEdit} />
                          </Form.Item>
                        </Col>

                        {/* Signature & Signature Brand Sampingan */}
                        <Col span={24}>
                          <Row gutter={8}>
                            <Col xs={24} md={12}>
                              <Form.Item
                                name={['signature', lang]}
                                label='Signature'
                                rules={[{ required: true, message: 'Signature is required' }]}>
                                <Input readOnly={!isEdit} />
                              </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Item
                                name={['signature_brand', lang]}
                                label=' '
                                rules={[{ required: true, message: 'Signature Brand is required' }]}>
                                <Input readOnly={!isEdit} />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>
                      </>
                    )}
                  </TranslationTabs>
                </Col>
              </Row>

              <Form.Item>
                <Space size={16}>
                  {isEdit ? (
                    <>
                      <Button color='primary' variant='outlined' onClick={(e) => handleEnableForm(e, false)}>
                        Cancel
                      </Button>
                      <Button type='primary' htmlType='submit' form='form-email-template' loading={loading}>
                        Save
                      </Button>
                    </>
                  ) : (
                    <Button type='primary' htmlType='button' onClick={(e) => handleEnableForm(e, true)}>
                      Edit
                    </Button>
                  )}
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </section>

      {isEdit && (
        <CardUserLogWidget
          created_by={data?.created_by || 1}
          updated_by={data?.updated_by || 1}
          created_at={data?.created_at || '2025-08-15T06:06:51.338Z'}
          updated_at={data?.updated_at || '2025-08-15T06:06:51.338Z'}
        />
      )}
    </>
  );
};

export default FormView;
