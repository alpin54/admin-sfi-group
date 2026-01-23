import { Button } from 'antd';
import { HolderOutlined } from '@ant-design/icons';

const DragHandle = ({ attributes, listeners }) => {
  return (
    <Button
      size='small'
      variant='text'
      color='default'
      icon={<HolderOutlined />}
      style={{ cursor: 'grab', padding: '0 8px' }}
      {...attributes}
      {...listeners}
    />
  );
};

export default DragHandle;
