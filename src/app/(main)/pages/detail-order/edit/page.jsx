// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import DetailOrderEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Detail Order',
  link: 'pages/detail-order/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// DetailOrderEditPage
// ==================

const DetailOrderEditPage = async () => {
  return <DetailOrderEdit />;
};

export { metadata, schemadata };
export default DetailOrderEditPage;
