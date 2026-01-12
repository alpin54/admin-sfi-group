// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import MemberDetail from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Detail Member',
  link: 'member/detail/[slug]'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// MemberDetailPage
// ==================

const MemberDetailPage = async ({ params }) => {
  const slug = params.slug;
  return <MemberDetail slug={slug} />;
};

export { metadata, schemadata };
export default MemberDetailPage;
