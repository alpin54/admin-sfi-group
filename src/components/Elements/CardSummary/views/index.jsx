// -- libraries
import { Tag, Card } from 'antd';
import { CaretUpFilled, CaretDownFilled } from '@ant-design/icons';

// -- utils
import Currency from '@utils/currency';

// -- styles
import style from '@elements/CardSummary/styles/style.module.scss';

const CardSummary = (props) => {
  const { icon, title, value, description, percentage, traffic, variant = 'primary' } = props;

  return (
    <Card className={`${style.card} ${style[variant]}`}>
      <p className={style.title}>
        {icon ? (
          <>
            {icon}
            <span>{title}</span>
          </>
        ) : (
          title
        )}
      </p>
      <h4 className={style.label}>
        {typeof value === 'number' ? (value > 100000 ? Currency.formatRp(value) : Currency.formatRp(value, '')) : value}
      </h4>
      {percentage != null && (
        <div className={style.row}>
          <Tag color={traffic ? 'success' : 'error'}>
            {traffic ? <CaretUpFilled /> : <CaretDownFilled />}
            {percentage}%
          </Tag>
          {description && <p className={style.desc}>{description}</p>}
        </div>
      )}
    </Card>
  );
};

export default CardSummary;
