import BannerImg from '@assets/image/dummy/banner-2.png';

const data = {
  id: 1,
  status: 1,
  section: 'Group Companies',
  title: {
    en: 'Our Group Companies',
    id: 'Perusahaan Grup Kami'
  },

  list: [
    {
      id: 1,
      image: BannerImg.src,
      company: {
        en: 'PT Selaras Makmur Sejati',
        id: 'PT Selaras Makmur Sejati'
      },
      label: {
        en: 'SMS',
        id: 'SMS'
      },
      status: 1
    },
    {
      id: 2,
      image: BannerImg.src,
      company: {
        en: 'PT Digital Inovasi Asia',
        id: 'PT Digital Inovasi Asia'
      },
      label: {
        en: 'Dino',
        id: 'Dino'
      },
      status: 1
    }
  ]
};

export default data;
