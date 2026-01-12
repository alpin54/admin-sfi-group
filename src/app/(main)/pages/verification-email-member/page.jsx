// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import VerificationEmailMember from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Detail Verification Email Member',
  link: 'pages/verification-email-member'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// VerificationEmailMemberPage
// ==================

const VerificationEmailMemberPage = async () => {
  return <VerificationEmailMember />;
};

export { metadata, schemadata };
export default VerificationEmailMemberPage;
