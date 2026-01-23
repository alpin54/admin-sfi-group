import TagImage from '@assets/image/dummy/tag.svg';
import VoucherImage from '@assets/image/dummy/e-vouchers.svg';
import StarImage from '@assets/image/dummy/star.svg';
import HeadsetImage from '@assets/image/dummy/headset.svg';

const data = [
  {
    id: 1,
    image: TagImage.src,
    title: { en: 'Exclusive Discounts', id: 'Exclusive Discounts' },
    description: {
      en: 'Special pricing on selected products.',
      id: 'Special pricing on selected products.'
    },
    status: true
  },
  {
    id: 2,
    image: VoucherImage.src,
    title: { en: 'Promotional Vouchers', id: 'Promotional Vouchers' },
    description: {
      en: 'Redeemable for future purchases.',
      id: 'Redeemable for future purchases.'
    },
    status: true
  },
  {
    id: 3,
    image: StarImage.src,
    title: { en: 'Loyalty Rewards', id: 'Loyalty Rewards' },
    description: {
      en: 'Earn vouchers for continued engagement.',
      id: 'Earn vouchers for continued engagement.'
    },
    status: false
  },
  {
    id: 4,
    image: HeadsetImage.src,
    title: { en: 'Support & Assistance', id: 'Support & Assistance' },
    description: {
      en: 'Dedicated dealer support team, ready anytime.',
      id: 'Dedicated dealer support team, ready anytime.'
    },
    status: true
  }
];
export default data;
