// sample data adapted to the requested shape
import BannerImg from '@assets/image/dummy/banner.png';

const data = {
  id: 1,
  status: 1,
  section: 'Career Image',
  list: [
    {
      id: 1,
      image: BannerImg.src,
      title: { en: 'Title Alt', id: 'Judul Alt' },
      status: 1
    },
    {
      id: 2,
      image: BannerImg.src,
      title: { en: 'Title Alt', id: 'Judul Alt' },
      status: 1
    }
    // ... lainnya
  ]
};

export default data;
