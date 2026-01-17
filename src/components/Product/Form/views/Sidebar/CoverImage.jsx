// -- libraries
import { Form } from 'antd';

// -- elements
import UploadImage from '@elements/UploadImage/views';

const CoverImage = ({ viewOnly }) => {
  return (
    <Form.Item name='image' help='size:  1440 x 1078'>
      <UploadImage maxCount={4} disabled={viewOnly} />
    </Form.Item>
  );
};

export { CoverImage };
