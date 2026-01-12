// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Workplace from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Workplace',
  link: 'career/workplace'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// MenuPage
// ==================

const WorkplacePage = async () => {
  return <Workplace />;
};

export { metadata, schemadata };
export default WorkplacePage;
