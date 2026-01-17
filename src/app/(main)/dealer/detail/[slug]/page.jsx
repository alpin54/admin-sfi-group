// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import DealerDetail from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Detail Dealer',
  link: 'dealer/detail/[slug]'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// DealerDetailPage
// ==================

const DealerDetailPage = async ({ params }) => {
  const slug = params.slug;
  return <DealerDetail slug={slug} />;
};

export { metadata, schemadata };
export default DealerDetailPage;
