// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import UploadDocument from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Upload Document',
  link: 'pages/upload-document'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// UploadDocumentPage
// ==================

const UploadDocumentPage = async () => {
  return <UploadDocument />;
};

export { metadata, schemadata };
export default UploadDocumentPage;
