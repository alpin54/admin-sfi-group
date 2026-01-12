// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Home from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Detail Home',
  link: 'pages/home'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// HomePage
// ==================

const HomePage = async () => {
  return <Home />;
};

export { metadata, schemadata };
export default HomePage;
