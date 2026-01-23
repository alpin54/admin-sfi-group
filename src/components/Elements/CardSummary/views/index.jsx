// -- libraries
import { Tag, Card, Button } from 'antd';
import { RightOutlined, RiseOutlined, FallOutlined } from '@ant-design/icons';

// -- utils
import Currency from '@utils/currency';

// -- styles
import style from '@elements/CardSummary/styles/style.module.scss';

const CardSummary = (props) => {
  const { icon, title, value, description, percentage, traffic, variant = 'primary', href = null } = props;

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
            {traffic ? <RiseOutlined /> : <FallOutlined />}
            {percentage}%
          </Tag>
          {description && <p className={style.desc}>{description}</p>}
        </div>
      )}
      {href && (
        <div className={style.button}>
          <Button href={href} variant='text' color='primary' size='small'>
            View Details
            <RightOutlined />
          </Button>
        </div>
      )}
    </Card>
  );
};

export default CardSummary;
