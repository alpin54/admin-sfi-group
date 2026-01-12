'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import VerificationEmailMemberWidgets from '@components/Pages/VerificationEmailMember/Landing/widgets/Default';

const VerificationEmailMember = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <VerificationEmailMemberWidgets method='edit' />;
};

export default VerificationEmailMember;
