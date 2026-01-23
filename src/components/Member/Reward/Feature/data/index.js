import PointImage from '@assets/image/dummy/point-logo.svg';
import HanbagImage from '@assets/image/dummy/handbag.svg';
import CalendarImage from '@assets/image/dummy/calendar-dots-fill.svg';
import MoneyImage from '@assets/image/dummy/money-wavy-fill.svg';

const data = [
  {
    id: 1,
    image: PointImage.src,
    title: { en: 'Earn Points', id: 'Dapatkan Poin' },
    description: {
      en: 'Earn 1 point for every Rp100.000 spent.',
      id: 'Dapatkan 1 poin untuk setiap pengeluaran Rp100.000.'
    },
    status: true
  },
  {
    id: 2,
    image: HanbagImage.src,
    title: { en: 'Redeem Points', id: 'Tukarkan Poin' },
    description: {
      en: 'Redeem points for discounts on your next purchase.',
      id: 'Tukarkan poin untuk mendapatkan diskon pada pembelian berikutnya.'
    },
    status: true
  },
  {
    id: 3,
    image: CalendarImage.src,
    title: { en: 'Expiration', id: 'Kedaluwarsa' },
    description: {
      en: 'Points expire 1 year from the date earned.',
      id: 'Poin kedaluwarsa 1 tahun sejak tanggal diperoleh.'
    },
    status: false
  },
  {
    id: 4,
    image: MoneyImage.src,
    title: { en: 'Minimum Spend', id: 'Pengeluaran Minimum' },
    description: {
      en: 'Minimum spend of Rp100,000 required to start earning points.',
      id: 'Pengeluaran minimum sebesar Rp100.000 diperlukan untuk mulai mendapatkan poin.'
    },
    status: true
  }
];
export default data;
