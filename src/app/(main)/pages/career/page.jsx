// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Career from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Detail Career',
  link: 'pages/career'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// CareerPage
// ==================

const CareerPage = async () => {
  return <Career />;
};

export { metadata, schemadata };
export default CareerPage;
