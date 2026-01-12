// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import FaqEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Faq',
  link: 'pages/faq/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// FaqEditPage
// ==================

const FaqEditPage = async () => {
  return <FaqEdit />;
};

export { metadata, schemadata };
export default FaqEditPage;
