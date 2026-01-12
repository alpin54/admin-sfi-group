// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import UploadDocumentEdit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Edit Upload Document',
  link: 'pages/upload-document/edit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// UploadDocumentEditPage
// ==================

const UploadDocumentEditPage = async () => {
  return <UploadDocumentEdit />;
};

export { metadata, schemadata };
export default UploadDocumentEditPage;
