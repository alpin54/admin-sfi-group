// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Career from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Career',
  link: 'career'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// MenuPage
// ==================

const CareerPage = async () => {
  return <Career />;
};

export { metadata, schemadata };
export default CareerPage;
