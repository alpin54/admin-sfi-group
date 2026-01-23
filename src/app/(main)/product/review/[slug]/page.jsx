// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import ProductReview from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Product Review',
  link: 'product/review/[slug]'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// ProductReviewPage
// ==================

const ProductReviewPage = async () => {
  return <ProductReview />;
};

export { metadata, schemadata };
export default ProductReviewPage;
