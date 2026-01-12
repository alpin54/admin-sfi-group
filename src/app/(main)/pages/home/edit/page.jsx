// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import HomeEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Home',
  link: 'pages/home/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// HomeEditPage
// ==================

const HomeEditPage = async () => {
  return <HomeEdit />;
};

export { metadata, schemadata };
export default HomeEditPage;
