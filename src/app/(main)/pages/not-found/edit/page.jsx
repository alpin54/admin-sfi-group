// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import NotFoundEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Not Found',
  link: 'pages/not-found/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// NotFoundEditPage
// ==================

const NotFoundEditPage = async () => {
  return <NotFoundEdit />;
};

export { metadata, schemadata };
export default NotFoundEditPage;
