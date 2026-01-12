// sample data adapted to the requested shape
import BannerImg from '@assets/image/dummy/banner.png';

const data = {
  id: 1,
  status: 1,
  section: 'Career Image',
  title: {
    en: 'Title EN',
    id: 'Titile ID'
  },
  list: [
    {
      id: 1,
      image: BannerImg.src,
      title: {
        en: 'CASA Hub 360 – USB-C 8-in-1 Foldable Stand Hub.',
        id: 'Title Id'
      },
      status: 1
    },
    {
      id: 2,
      image: BannerImg.src,
      title: {
        en: 'CASA Hub 360 – USB-C 8-in-1 Foldable Stand Hub.',
        id: 'Title Id'
      },
      status: 1
    }
  ]
};

export default data;
