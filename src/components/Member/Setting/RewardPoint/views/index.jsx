// --library
import { useEffect, useState } from 'react';
import { Card, Button, Form, Input, Space, Row, Col, InputNumber, Collapse, Radio, Select, DatePicker } from 'antd';
import dayjs from 'dayjs';

// -- icons
import { DownOutlined } from '@ant-design/icons';

// -- utils
import LocalStorage from '@utils/localStorage';
import Currency from '@utils/currency';

const RewardPointView = (props) => {
  const { method, notify, data, ready, loading, message, onSubmit } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [formInstance] = Form.useForm();
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

  useEffect(() => {
    if (message) {
      notify({
        type: 'error',
        message: `Failed`,
        description: message
      });
    }
  }, [message, notify]);

  const handleEnableForm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEdit(true);
  };

  const handleFinish = async (values) => {
    try {
      const payload = {
        ...values,
        updated_by: user?.id
      };
      // Submit form data
      const response = await onSubmit(payload);

      if (response && response.data) {
        formInstance?.setFieldsValue(response.data);
        setIsEdit(false);
        notify({
          type: 'success',
          message: 'Data updated successfully'
        });

        // router.push('/pages/member-setting');
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
    <Card title='Reward Points'>
      <Form form={formInstance} id='form-member-setting' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>
        <Row gutter={20} className='row-container'>
          <Col span={12}>
            <Collapse
              expandIconPosition='end'
              expandIcon={() => <DownOutlined />}
              defaultActiveKey={['earning-point']}
              items={[
                {
                  key: 'earning-point',
                  label: 'Earning Point',
                  children: (
                    <>
                      <Form.Item
                        name='point_transaction'
                        label='Points per Transaction'
                        rules={[{ required: true, message: 'Points per transaction is required' }]}>
                        <Row gutter={12}>
                          <Col span={8}>
                            <Input allowClear readOnly={!isEdit} />
                          </Col>
                          <Col span={16}>
                            <InputNumber
                              min={0}
                              step={1000}
                              readOnly={!isEdit}
                              formatter={(value) => {
                                if (value || value === 0) return Currency.formatRp(value);
                                return '';
                              }}
                              parser={(value) => {
                                const parsed = Currency.removeRp(value || '');
                                return parsed !== undefined && parsed !== null ? Number(parsed) : 0;
                              }}
                            />
                          </Col>
                        </Row>
                      </Form.Item>
                      <Form.Item
                        name='point_cash_conversion'
                        label='Points per Cash Conversion'
                        rules={[{ required: true, message: 'Points per cash conversion is required' }]}>
                        <Row gutter={12}>
                          <Col span={8}>
                            <Input allowClear readOnly={!isEdit} />
                          </Col>
                          <Col span={16}>
                            <InputNumber
                              min={0}
                              step={1000}
                              placeholder='Rp'
                              readOnly={!isEdit}
                              formatter={(value) => {
                                if (value || value === 0) return Currency.formatRp(value);
                                return '';
                              }}
                              parser={(value) => {
                                const parsed = Currency.removeRp(value || '');
                                return parsed !== undefined && parsed !== null ? Number(parsed) : 0;
                              }}
                            />
                          </Col>
                        </Row>
                      </Form.Item>
                    </>
                  )
                }
              ]}
            />
          </Col>
          <Col span={12}>
            <Collapse
              expandIconPosition='end'
              expandIcon={() => <DownOutlined />}
              defaultActiveKey={['reward-point']}
              items={[
                {
                  key: 'reward-point',
                  label: 'Reward Point',
                  children: (
                    <>
                      <Form.Item
                        label='Points Expiry Type'
                        name='point_expiry_type'
                        rules={[{ required: true, message: 'Select at least one product type!' }]}>
                        <Radio.Group
                          disabled={!isEdit}
                          options={[
                            { label: 'Per Transaction Expiry', value: 1 },
                            { label: 'Fixed Expiry Date', value: 2 }
                          ]}
                        />
                      </Form.Item>
                      <Form.Item
                        hidden={formInstance.getFieldValue('point_expiry_type') === 1 ? false : true}
                        name='maximum_redemption_per_transaction'
                        rules={[{ required: true, message: 'Maximum redemption per transaction is required' }]}>
                        <Select
                          allowClear
                          disabled={!isEdit}
                          options={[
                            {
                              label: '1 Months',
                              value: 1
                            },
                            {
                              label: '2 Months',
                              value: 2
                            }
                          ]}
                        />
                      </Form.Item>
                      <Form.Item
                        hidden={formInstance.getFieldValue('point_expiry_type') === 2 ? false : true}
                        name='maximum_redemption_per_transaction'
                        rules={[{ required: true, message: 'Maximum redemption per transaction is required' }]}>
                        <DatePicker format='DD MMMM YYYY' disabled={!isEdit} />
                      </Form.Item>
                      <Form.Item
                        label='Maximum Redemption per Transaction'
                        name='maximum_redemption_per_transaction'
                        rules={[{ required: true, message: 'Maximum redemption per transaction is required' }]}>
                        <InputNumber min={0} max={100} step={1} suffix='%' readOnly={!isEdit} />
                      </Form.Item>
                    </>
                  )
                }
              ]}
            />
          </Col>
        </Row>

        <Space size={16}>
          {isEdit ? (
            <Button type='primary' htmlType='submit' form='form-member-setting' loading={loading}>
              Save
            </Button>
          ) : (
            <Button type='primary' htmlType='button' onClick={handleEnableForm}>
              Edit
            </Button>
          )}
        </Space>
      </Form>
    </Card>
  );
};

export default RewardPointView;
