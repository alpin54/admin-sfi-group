'use client';

// -- libraries
import { useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import HeroBannerEditWidgets from '@components/Pages/Home/HeroBanner/widgets/Default';

const HeroBannerEdit = () => {
  // set menu
  const { setMenu } = useStateMenu();
  const params = useParams();
  const pathname = usePathname();
  const segments = pathname.split('/');
  const slug = params.slug;
  const action = segments[4];

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <HeroBannerEditWidgets slug={slug ?? null} action={action} />;
};

export default HeroBannerEdit;
