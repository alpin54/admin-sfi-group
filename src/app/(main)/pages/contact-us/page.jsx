// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import ContatUs from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Detail Contat Us',
  link: 'pages/contact-us'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// ContatUsPage
// ==================

const ContatUsPage = async () => {
  return <ContatUs />;
};

export { metadata, schemadata };
export default ContatUsPage;
