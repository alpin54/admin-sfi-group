// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import CareerApplication from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Application Career',
  link: 'career/application/[slug]'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// CareerApplicationPage
// ==================

const CareerApplicationPage = async () => {
  return <CareerApplication />;
};

export { metadata, schemadata };
export default CareerApplicationPage;
