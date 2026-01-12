// -- libraries
import { Card, Avatar } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/id';

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.locale('id');

// -- styles
import style from '@elements/CardUserLog/styles/style.module.scss';

const CardUserLog = (props) => {
  const { createdData, updatedData, created_at, updated_at } = props;

  return (
    <Card className={style.card}>
      {createdData && (
        <div className={style.item}>
          <p className={style.date}>{dayjs(created_at).format('DD MMMM YYYY HH:mm')}</p>
          <p className={style.action}>Created</p>
          <div className={style.avatar}>
            <Avatar src={createdData.image} className={style.photo} size={20} />
            <p className={style.name}>
              {createdData.role_name} ({createdData.name})
            </p>
          </div>
        </div>
      )}
      {updatedData && (
        <div className={style.item}>
          <p className={style.date}>{dayjs(updated_at).format('DD MMMM YYYY HH:mm')}</p>
          <p className={style.action}>Updated</p>
          <div className={style.avatar}>
            <Avatar src={updatedData.image} className={style.photo} size={20} />
            <p className={style.name}>
              {updatedData.role_name} ({updatedData.name})
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default CardUserLog;
