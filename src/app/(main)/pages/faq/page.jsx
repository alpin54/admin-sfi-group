// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Faq from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Detail Faq',
  link: 'pages/faq'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// FaqPage
// ==================

const FaqPage = async () => {
  return <Faq />;
};

export { metadata, schemadata };
export default FaqPage;
