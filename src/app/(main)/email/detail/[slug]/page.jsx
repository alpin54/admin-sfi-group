// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import EmailDetail from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Detail Email',
  link: 'email/detail/[slug]'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// EmailDetailPage
// ==================

const EmailDetailPage = async () => {
  return <EmailDetail />;
};

export { metadata, schemadata };
export default EmailDetailPage;
