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
      title: { en: 'Apply', id: 'Kirim' },
      status: 1
    },
    {
      id: 2,
      image: BannerImg.src,
      title: { en: 'Screening', id: 'Screening' },
      status: 1
    },
    {
      id: 3,
      image: BannerImg.src,
      title: { en: 'Interview', id: 'Wawancara' },
      status: 1
    },
    {
      id: 4,
      image: BannerImg.src,
      title: { en: 'Offer', id: 'Judul Alt' },
      status: 1
    },
    {
      id: 5,
      image: BannerImg.src,
      title: { en: 'Onboarding', id: 'Judul Alt' },
      status: 1
    }
  ]
};

export default data;
