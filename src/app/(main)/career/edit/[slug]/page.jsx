// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import CareerEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Career',
  link: 'career/edit/[slug]'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// CareerEditPage
// ==================

const CareerEditPage = async () => {
  return <CareerEdit />;
};

export { metadata, schemadata };
export default CareerEditPage;
