// -- libraries
import { Collapse } from 'antd';

// -- icons
import { DownOutlined } from '@ant-design/icons';

// -- components
import ProductType from '@components/Product/Form/views/Sidebar/ProductType';
import CoverImage from '@components/Product/Form/views/Sidebar/CoverImage';
import Tags from '@components/Product/Form/views/Sidebar/Tags';
import CategoryBrandColorPromotion from '@components/Product/Form/views/Sidebar/CategoryBrandColorPromotion';

const Sidebar = ({ viewOnly, categoryTreeOptions, brandTreeOptions, colorTreeOptions, promotionTreeOptions }) => {
  return (
    <Collapse
      expandIconPosition='end'
      expandIcon={() => <DownOutlined />}
      defaultActiveKey={['product_type', 'cover', 'tags', 'category', 'brand', 'color', 'promotion']}
      items={[
        {
          key: 'product_type',
          label: 'Product Type',
          children: <ProductType viewOnly={viewOnly} />
        },
        {
          key: 'cover',
          label: 'Cover Image',
          children: <CoverImage viewOnly={viewOnly} />
        },
        {
          key: 'tags',
          label: 'Tags',
          children: <Tags viewOnly={viewOnly} />
        },
        {
          key: 'category',
          label: 'Category',
          children: (
            <CategoryBrandColorPromotion
              name='category_ids'
              placeholder='Select category'
              treeData={categoryTreeOptions}
              viewOnly={viewOnly}
              required
            />
          )
        },
        {
          key: 'brand',
          label: 'Brand',
          children: (
            <CategoryBrandColorPromotion
              name='brand_ids'
              placeholder='Select brand'
              treeData={brandTreeOptions}
              viewOnly={viewOnly}
              required
            />
          )
        },
        {
          key: 'color',
          label: 'Color',
          children: (
            <CategoryBrandColorPromotion
              name='color_ids'
              placeholder='Select color'
              treeData={colorTreeOptions}
              viewOnly={viewOnly}
              required
            />
          )
        },
        {
          key: 'promotion',
          label: 'Promotion',
          children: (
            <CategoryBrandColorPromotion
              name='promotion_ids'
              placeholder='Select promotion'
              treeData={promotionTreeOptions}
              viewOnly={viewOnly}
              required
            />
          )
        }
      ]}
    />
  );
};

export default Sidebar;
