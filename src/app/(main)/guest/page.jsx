// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Guest from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Guest',
  link: 'guest'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// GuestPage
// ==================

const GuestPage = async () => {
  return <Guest />;
};

export { metadata, schemadata };
export default GuestPage;
