// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import ProductDetail from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Detail Product',
  link: 'product/detail/[slug]'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// ProductDetailPage
// ==================

const ProductDetailPage = async () => {
  return <ProductDetail />;
};

export { metadata, schemadata };
export default ProductDetailPage;
