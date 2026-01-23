// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Notification from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Notification',
  link: 'notification'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// NotificationPage
// ==================

const NotificationPage = async () => {
  return <Notification />;
};

export { metadata, schemadata };
export default NotificationPage;
