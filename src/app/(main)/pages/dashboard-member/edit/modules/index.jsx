'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- components
import DashboardMemberWidgets from '@components/Pages/DashboardMember/Landing/widgets/Default';

const DashboardMember = () => {
  // set menu
  const { setMenu } = useStateMenu();

  useEffect(() => {
    setMenu('pages');
  }, [setMenu]);

  return <DashboardMemberWidgets method='edit' />;
};

export default DashboardMember;
