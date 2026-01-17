// -- library
import { Modal } from 'antd';
import Link from 'next/link';

// -- icons
import {
  ShopOutlined,
  RightOutlined,
  DollarCircleOutlined,
  SmileOutlined,
  PhoneOutlined,
  MailOutlined
} from '@ant-design/icons';

// -- styles
import style from '@components/Guest/Modal/styles/style.module.scss';

// -- utils
import Currency from '@utils/currency';

const DetailGuestModal = (props) => {
  const { open, onClose, data = {} } = props;

  return (
    <Modal
      title='Detail Guest'
      width={560}
      open={!!open}
      onCancel={onClose}
      footer={null}
      closable
      className='modal-form'
      destroyOnHidden>
      <div className={style.row}>
        <p className={style.label}>Order</p>
        <ul className={style.list}>
          <li>
            <Link href={`/order/${data.order_id || ''}`} className={style.link}>
              <ShopOutlined />
              <span>{data.order_code || '-'}</span>
              <RightOutlined />
            </Link>
          </li>
          <li>
            <DollarCircleOutlined />
            <span>{Currency.formatRp(data.total_order) || '-'}</span>
          </li>
        </ul>
      </div>
      <div className={style.row}>
        <p className={style.label}>Recipient</p>
        <ul className={style.list}>
          <li>
            <SmileOutlined />
            <span>{data.name || '-'}</span>
          </li>
          <li>
            <PhoneOutlined />
            <span>{data.phone || '-'}</span>
          </li>
          <li>
            <MailOutlined />
            <span>{data.email || '-'}</span>
          </li>
        </ul>
      </div>
      <div className={style.row}>
        <p className={style.label}>Delivery Address</p>
        <ul className={style.list}>
          <li>
            <SmileOutlined />
            <span>{data.address || '-'}</span>
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default DetailGuestModal;
