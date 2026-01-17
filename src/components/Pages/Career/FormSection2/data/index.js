import Icon1 from '@assets/image/dummy/career-icon1.svg';
import Icon2 from '@assets/image/dummy/career-icon2.svg';
import Icon3 from '@assets/image/dummy/career-icon3.svg';
import Icon4 from '@assets/image/dummy/career-icon4.svg';

const data = {
  id: 1,
  status: 1,
  section: 'Career Benefits',
  title: 'Benefit',
  status: true,
  list: [
    {
      id: 1,
      image: Icon1.src,
      title: { en: 'Career Development', id: 'Pengembangan Karir' },
      description: {
        en: 'Full support for learning, training, and professional growth with clear promotion paths.',
        id: 'Dukungan penuh untuk pembelajaran, pelatihan, dan pertumbuhan profesional dengan jalur promosi yang jelas.'
      },
      status: 1
    },
    {
      id: 2,
      image: Icon2.src,
      title: { en: 'Positive Work Environment', id: 'Lingkungan Kerja Positif' },
      description: {
        en: 'Collaborative and inclusive culture that encourages teamwork and new ideas.',
        id: 'Budaya kolaboratif dan inklusif yang mendorong kerja sama tim dan ide-ide baru.'
      },
      status: 1
    },
    {
      id: 3,
      image: Icon3.src,
      title: { en: 'Compensation & Benefits', id: 'Kompensasi & Manfaat' },
      description: {
        en: 'Competitive salary, bonuses, and perks that reward your contributions.',
        id: 'Kompensasi & Manfaat yang kompetitif, bonus, dan fasilitas yang menghargai kontribusi Anda.'
      },
      status: 1
    },
    {
      id: 4,
      image: Icon4.src,
      title: { en: 'Work-Life Balance', id: 'Keseimbangan Kerja dan Kehidupan' },
      description: {
        en: 'Flexible hours and initiatives to maintain a healthy personal and professional balance.',
        id: 'Jam kerja fleksibel dan inisiatif untuk menjaga keseimbangan pribadi dan profesional yang sehat.'
      },
      status: 1
    }
  ]
};

export default data;
