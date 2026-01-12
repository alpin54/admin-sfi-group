// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Product from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Product',
  link: 'product'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// ProductPage
// ==================

const ProductPage = async () => {
  return <Product />;
};

export { metadata, schemadata };
export default ProductPage;
