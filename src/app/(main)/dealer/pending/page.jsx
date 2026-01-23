// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import DealerPending from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Dealer Pending',
  link: 'dealer/pending'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// DealerPendingPage
// ==================

const DealerPendingPage = async () => {
  return <DealerPending />;
};

export { metadata, schemadata };
export default DealerPendingPage;
