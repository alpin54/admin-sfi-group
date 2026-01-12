// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Promotions from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Promotions',
  link: 'product/promotions'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// PromotionsPage
// ==================

const PromotionsPage = async () => {
  return <Promotions />;
};

export { metadata, schemadata };
export default PromotionsPage;
