// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Footer from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Footer',
  link: 'footer'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// FooterPage
// ==================

const FooterPage = async () => {
  return <Footer />;
};

export { metadata, schemadata };
export default FooterPage;
