// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Email from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Email',
  link: 'email'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// EmailPage
// ==================

const EmailPage = async () => {
  return <Email />;
};

export { metadata, schemadata };
export default EmailPage;
