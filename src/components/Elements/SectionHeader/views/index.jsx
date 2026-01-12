// -- libraries
import { Switch } from 'antd';

// -- styles
import style from '@elements/SectionHeader/styles/style.module.scss';

const SectionHeader = (props) => {
  const { title, publish, onPublish } = props;
  return (
    <div className={style.header}>
      <p className={style.title}>{title}</p>
      {publish !== undefined && (
        <Switch checked={publish} onChange={onPublish} data-label='Publish' data-placement='left' />
      )}
    </div>
  );
};

export default SectionHeader;
