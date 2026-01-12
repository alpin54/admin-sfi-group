// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Brand from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Brand',
  link: 'product/brand'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// BrandPage
// ==================

const BrandPage = async () => {
  return <Brand />;
};

export { metadata, schemadata };
export default BrandPage;
