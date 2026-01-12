// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import SuccessUploadDocument from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Detail Success Upload Document',
  link: 'pages/success-upload-document'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// SuccessUploadDocumentPage
// ==================

const SuccessUploadDocumentPage = async () => {
  return <SuccessUploadDocument />;
};

export { metadata, schemadata };
export default SuccessUploadDocumentPage;
