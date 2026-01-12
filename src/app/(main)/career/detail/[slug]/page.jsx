// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import CareerDetail from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Detail Career',
  link: 'career/detail/[slug]'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// CareerDetailPage
// ==================

const CareerDetailPage = async () => {
  return <CareerDetail />;
};

export { metadata, schemadata };
export default CareerDetailPage;
