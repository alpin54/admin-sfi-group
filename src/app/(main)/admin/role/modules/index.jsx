'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- hooks
import usePermission from '@hooks/usePermission';

// -- elements
import DeniedAccess from '@components/Elements/DeniedAccess/views';

// -- components
import RoleLandingWidgets from '@components/Role/Landing/widgets/Default';

const RoleLanding = () => {
  // set menu
  const { setMenu } = useStateMenu();
  // permission
  const permissions = usePermission('/admin');

  useEffect(() => {
    setMenu('role');
  }, [setMenu]);

  if (!permissions.canView) {
    return <DeniedAccess />;
  }

  return <RoleLandingWidgets />;
};

export default RoleLanding;
