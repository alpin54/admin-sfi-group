// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Subscribe from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Subscribe',
  link: 'subscribe'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// SubscribePage
// ==================

const SubscribePage = async () => {
  return <Subscribe />;
};

export { metadata, schemadata };
export default SubscribePage;
