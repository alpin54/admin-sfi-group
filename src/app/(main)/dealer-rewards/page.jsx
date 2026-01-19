// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import DealerRewards from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Dealer Rewards',
  link: 'dealer-rewards'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// Dealer Rewards Page
// ==================

const DealerRewardsPage = async () => {
  return <DealerRewards />;
};

export { metadata, schemadata };
export default DealerRewardsPage;
