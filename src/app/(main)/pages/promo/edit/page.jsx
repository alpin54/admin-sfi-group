// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import PromoEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Promo',
  link: 'pages/promo/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// PromoEditPage
// ==================

const PromoEditPage = async () => {
  return <PromoEdit />;
};

export { metadata, schemadata };
export default PromoEditPage;
