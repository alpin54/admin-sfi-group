// -- libraries
import { Form, Checkbox } from 'antd';

// -- styles
import style from '@components/Product/Form/styles/style.module.scss';

const ProductType = ({ viewOnly }) => {
  return (
    <Form.Item name='product_type' rules={[{ required: true, message: 'Select at least one product type!' }]}>
      <Checkbox.Group
        className={style.checkboxGroup}
        disabled={viewOnly}
        options={[
          { label: 'Member', value: 'member' },
          { label: 'Dealer', value: 'dealer' }
        ]}
      />
    </Form.Item>
  );
};

export { ProductType };
