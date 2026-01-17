// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Dealer from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Dealer',
  link: 'dealer'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// DealerPage
// ==================

const DealerPage = async () => {
  return <Dealer />;
};

export { metadata, schemadata };
export default DealerPage;
