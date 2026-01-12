// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import CareerAdd from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Add Career',
  link: 'career/add'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// CareerAddPage
// ==================

const CareerAddPage = async () => {
  return <CareerAdd />;
};

export { metadata, schemadata };
export default CareerAddPage;
