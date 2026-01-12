'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import VerificationEmailDealerWidgets from '@components/Pages/VerificationEmailDealer/Landing/widgets/Default';

const VerificationEmailDealer = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <VerificationEmailDealerWidgets method='view' />;
};

export default VerificationEmailDealer;
