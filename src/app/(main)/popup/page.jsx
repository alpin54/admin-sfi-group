// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Popup from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Popup',
  link: 'popup'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// PopupPage
// ==================

const PopupPage = async () => {
  return <Popup />;
};

export { metadata, schemadata };
export default PopupPage;
