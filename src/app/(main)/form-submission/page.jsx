// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import FormSubmission from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Form Submission',
  link: 'form-submission'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// MenuPage
// ==================

const FormSubmissionPage = async () => {
  return <FormSubmission />;
};

export { metadata, schemadata };
export default FormSubmissionPage;
