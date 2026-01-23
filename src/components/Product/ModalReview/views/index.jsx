// -- libraries
import { useEffect } from 'react';
import { Modal, Button, Form, Input, Rate, Row, Col } from 'antd';

// -- elements
import UploadImage from '@components/Elements/UploadImage/views';

const ModalReviewView = ({ open, onClose, initialValues = {}, formInstance, notify, onSubmit, loading, refetch }) => {
  useEffect(() => {
    if (open) {
      formInstance.resetFields();
      formInstance.setFieldsValue(initialValues);
    }
  }, [open, initialValues, formInstance]);

  // ------- Form handler ---------
  const handleFinish = async (values) => {
    try {
      // Collect file URLs or raw File objects
      const payload = {
        ...values,
        rating: values.rating
      };
      const resp = await onSubmit(payload);
      if (resp) {
        notify?.({
          type: 'success',
          message: 'Review saved successfully'
        });
        formInstance.resetFields();
        onClose();
        refetch?.();
      }
    } catch (err) {
      notify?.({
        type: 'error',
        message: 'Review failed to save',
        description: err?.message ?? 'Unknown error'
      });
    }
  };

  const footerComponent = (
    <>
      <Button style={{ minWidth: 120 }} color='primary' variant='outlined' onClick={onClose}>
        Cancel
      </Button>
      <Button style={{ minWidth: 120 }} type='primary' htmlType='submit' form='form-review' loading={loading}>
        Save
      </Button>
    </>
  );

  return (
    <Modal
      title='Review Product'
      width={640}
      open={open}
      onCancel={onClose}
      closable
      footer={footerComponent}
      className='modal-form'>
      <Form form={formInstance} id='form-review' layout='vertical' onFinish={handleFinish} autoComplete='off'>
        <Form.Item name='rating' label='Rate your experience!' rules={[{ required: true, message: 'Please rate!' }]}>
          <Rate />
        </Form.Item>

        <Form.Item name='review' label='Review' rules={[{ required: true, message: 'Please enter review' }]}>
          <Input.TextArea rows={3} allowClear placeholder='Share your experience...' />
        </Form.Item>

        {/* Photo/Video section */}
        <Form.Item
          name='media'
          label='Photo or Video'
          rules={[{ required: true, message: 'Please upload photo or video' }]}>
          <Row gutter={12}>
            <Col style={{ width: '20%' }}>
              <UploadImage variant='simple' size='auto' />
            </Col>
            <Col style={{ width: '20%' }}>
              <UploadImage variant='simple' size='auto' />
            </Col>
            <Col style={{ width: '20%' }}>
              <UploadImage variant='simple' size='auto' />
            </Col>
            <Col style={{ width: '20%' }}>
              <UploadImage variant='simple' size='auto' />
            </Col>
            <Col style={{ width: '20%' }}>
              <UploadImage variant='simple' size='auto' type='video' />
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalReviewView;
