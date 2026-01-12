import HeroBannerD from '@assets/image/dummy/hero-banner-d.png';
import HeroBannerM from '@assets/image/dummy/hero-banner-m.png';

const data = {
  id: 1,
  // image fields as objects per-locale; include src/url to be compatible dengan berbagai util/component
  image_desktop: {
    en: HeroBannerD.src,
    id: HeroBannerD.src
  },
  image_mobile: {
    en: HeroBannerM.src,
    id: HeroBannerM.src
  },

  title: {
    en: 'Fold. Connect. Create.',
    id: 'Lipat. Terhubung. Ciptakan.'
  },
  description: {
    en: 'Flexible, adjustable, and ready to boost your productivity anywhere.',
    id: 'Fleksibel, dapat disesuaikan, dan siap meningkatkan produktivitas Anda di mana saja.'
  },
  show_button: {
    en: true,
    id: false
  },
  button_type: {
    en: 'custom',
    id: 'product'
  },
  text_button_1: {
    en: 'Shop Now',
    id: 'Beli Sekarang'
  },
  link_button_1: {
    en: 'https://example.com/product/1',
    id: 'https://example.com/id/product/1'
  },
  text_button_2: {
    en: 'Learn More',
    id: 'Pelajari Lebih Lanjut'
  },
  link_button_2: {
    en: 'https://example.com/learn',
    id: 'https://example.com/id/learn'
  },
  status: 1,
  created_by: 1,
  updated_by: 1,
  created_at: '2025-08-15T06:06:51.338Z',
  updated_at: '2025-08-15T06:06:51.338Z'
};

export default data;
