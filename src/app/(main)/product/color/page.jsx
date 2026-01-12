// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Color from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Color',
  link: 'product/color'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// ColorPage
// ==================

const ColorPage = async () => {
  return <Color />;
};

export { metadata, schemadata };
export default ColorPage;
