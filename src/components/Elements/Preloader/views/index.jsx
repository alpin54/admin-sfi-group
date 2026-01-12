// -- libraries
import { Spin, Progress } from 'antd';
import Image from 'next/image';

// -- assets
import Logo from '@assets/image/logo/logo-primary.png';

// -- styles
import style from '@elements/Preloader/styles/style.module.scss';

const Preloader = (props) => {
  const { isInitial, progress } = props;

  return (
    <div className={style.preloader}>
      <div className={style.content}>
        {isInitial ? (
          <>
            <Image
              className={style.logoImg}
              src={Logo}
              alt='e-commerce-template-logo'
              width={200}
              height={104}
              priority={true}
            />
            <Progress percent={progress} showInfo={false} status='active' />
          </>
        ) : (
          <Spin size='large' />
        )}
      </div>
    </div>
  );
};

export default Preloader;
