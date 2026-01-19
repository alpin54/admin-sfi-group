// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import MemberRewards from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Member Rewards',
  link: 'member-rewards'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// Member Rewards Page
// ==================

const MemberRewardsPage = async () => {
  return <MemberRewards />;
};

export { metadata, schemadata };
export default MemberRewardsPage;
