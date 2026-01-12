'use client';

// -- libraries
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import HeroBannerWidgets from '@components/Pages/Home/HeroBanner/widgets/Default';

const HeroBanner = () => {
  // set menu
  const { setMenu } = useStateMenu();
  const pathname = usePathname();
  const segments = pathname.split('/');
  const action = segments[4];

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <HeroBannerWidgets action={action} />;
};

export default HeroBanner;
