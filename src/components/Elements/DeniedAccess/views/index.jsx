// -- libraries
import { Button } from 'antd';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// -- assets
import DeniedImage from '@assets/image/illustration/access-denied.svg';

// -- styles
import style from '@elements/DeniedAccess/styles/style.module.scss';

const DeniedAccess = (props) => {
  const {
    title = 'Denied Access',
    description = 'You do not have permission to access this page.',
    showBackButton
  } = props;

  const pathname = usePathname();

  // Check if current page is dashboard
  const isDashboard = pathname === '/dashboard' || pathname === '/';

  // Determine if back button should be shown
  // Hide if:  explicitly disabled, or on dashboard page
  const shouldShowBackButton = showBackButton !== false && !isDashboard;

  const handleBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <div className={style.denied}>
      <div className={style.image}>
        <Image className={style.imageEl} src={DeniedImage} alt='denied' width={144} height={144} />
      </div>
      <h2 className={style.title}>{title}</h2>
      <p className={style.desc}>{description}</p>
      {shouldShowBackButton && (
        <div className={style.btn}>
          <Button type='primary' onClick={handleBack}>
            Back to Previous Page
          </Button>
        </div>
      )}
    </div>
  );
};

export default DeniedAccess;
