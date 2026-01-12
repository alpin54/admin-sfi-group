'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import DetailOrderWidgets from '@components/Pages/DetailOrder/Landing/widgets/Default';

const DetailOrder = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <DetailOrderWidgets method='edit' />;
};

export default DetailOrder;
