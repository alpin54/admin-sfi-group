// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import SuccessUploadDocumentEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Success Upload Document',
  link: 'pages/success-upload-document/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// SuccessUploadDocumentEditPage
// ==================

const SuccessUploadDocumentEditPage = async () => {
  return <SuccessUploadDocumentEdit />;
};

export { metadata, schemadata };
export default SuccessUploadDocumentEditPage;
