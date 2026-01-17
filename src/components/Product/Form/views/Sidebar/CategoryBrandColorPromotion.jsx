// -- libraries
import { Form, TreeSelect } from 'antd';

const CategoryBrandColorPromotion = ({ name, placeholder, treeData, viewOnly, required = false }) => {
  return (
    <Form.Item name={name} rules={required ? [{ required: true, message: `Please select ${placeholder}!` }] : []}>
      <TreeSelect
        showSearch
        allowClear
        disabled={viewOnly}
        placeholder={placeholder}
        treeData={treeData}
        treeDefaultExpandAll
        treeLine
        treeCheckable
        treeCheckStrictly
      />
    </Form.Item>
  );
};

export { CategoryBrandColorPromotion };
