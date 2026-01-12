// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import VerificationEmailMemberEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Verification Email Member',
  link: 'pages/verification-email-member/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// VerificationEmailMemberEditPage
// ==================

const VerificationEmailMemberEditPage = async () => {
  return <VerificationEmailMemberEdit />;
};

export { metadata, schemadata };
export default VerificationEmailMemberEditPage;
