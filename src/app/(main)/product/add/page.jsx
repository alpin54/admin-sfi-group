// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import ProductAdd from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Add Product',
  link: 'product/add'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// ProductAddPage
// ==================

const ProductAddPage = async () => {
  return <ProductAdd />;
};

export { metadata, schemadata };
export default ProductAddPage;
