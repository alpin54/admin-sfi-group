// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Meta from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Detail Meta',
  link: 'meta'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// MetaPage
// ==================

const MetaPage = async () => {
  return <Meta />;
};

export { metadata, schemadata };
export default MetaPage;
