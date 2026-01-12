// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import EmailEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Email',
  link: 'email/edit/[slug]'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// EmailEditPage
// ==================

const EmailEditPage = async () => {
  return <EmailEdit />;
};

export { metadata, schemadata };
export default EmailEditPage;
