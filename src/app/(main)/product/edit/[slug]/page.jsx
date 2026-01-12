// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import ProductEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Product',
  link: 'product/edit/[slug]'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// ProductEditPage
// ==================

const ProductEditPage = async () => {
  return <ProductEdit />;
};

export { metadata, schemadata };
export default ProductEditPage;
