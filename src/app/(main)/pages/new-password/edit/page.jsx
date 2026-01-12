// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import NewPasswordEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit New Password',
  link: 'pages/new-password/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// NewPasswordEditPage
// ==================

const NewPasswordEditPage = async () => {
  return <NewPasswordEdit />;
};

export { metadata, schemadata };
export default NewPasswordEditPage;
