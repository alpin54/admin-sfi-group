// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Member from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Member',
  link: 'member'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// MemberPage
// ==================

const MemberPage = async () => {
  return <Member />;
};

export { metadata, schemadata };
export default MemberPage;
