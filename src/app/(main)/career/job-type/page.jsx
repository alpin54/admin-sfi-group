// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import JobType from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Job Type',
  link: 'career/job-type'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// MenuPage
// ==================

const JobTypePage = async () => {
  return <JobType />;
};

export { metadata, schemadata };
export default JobTypePage;
