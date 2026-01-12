'use client';

// -- libraries
import Image from 'next/image';
import { Layout } from 'antd';

// -- assets
import DefaultImage from '@assets/image/illustration/default-profile.png';

// -- styles
import style from '@components/Header/styles/style.module.scss';

// -- utils
import LocalStorage from '@utils/localStorage';

// Fungsi untuk menentukan greeting berdasarkan jam lokal
const getGreeting = () => {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    return 'Good Morning';
  } else if (hour >= 12 && hour < 18) {
    return 'Good Afternoon';
  } else if (hour >= 18 && hour < 22) {
    return 'Good Evening';
  } else {
    return 'Good Night';
  }
};

const HeaderSection = (props) => {
  const { data } = props;
  const { Header } = Layout;
  const greeting = getGreeting();
  const user = LocalStorage.get('user');

  return (
    <Header className={style.header}>
      <div className={style.headerInner}>
        <h4 className={style.title}>
          {greeting}, {data?.name || user?.name || 'User'}!
        </h4>
        <div className={style.profile}>
          <div className={style.profileImg}>
            <Image
              className={style.profileImgEl}
              src={data?.image || user?.image || DefaultImage}
              alt={data?.name || user?.name || 'user profile'}
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
    </Header>
  );
};

export default HeaderSection;
