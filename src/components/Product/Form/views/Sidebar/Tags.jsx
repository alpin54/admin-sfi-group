import { Form, Select } from 'antd';

const Tags = ({ viewOnly }) => {
  return (
    <Form.Item name='tags' rules={[{ required: true, message: 'Select tags!' }]}>
      <Select mode='tags' showSearch allowClear disabled={viewOnly} placeholder='Select tags' />
    </Form.Item>
  );
};

export { Tags };
