// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import DetailOrder from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Detail Order',
  link: 'pages/detail-order'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// DetailOrderPage
// ==================

const DetailOrderPage = async () => {
  return <DetailOrder />;
};

export { metadata, schemadata };
export default DetailOrderPage;
