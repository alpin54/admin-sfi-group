'use client';

// -- libraries
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- hooks
import usePermission from '@hooks/usePermission';

// -- elements
import DeniedAccess from '@components/Elements/DeniedAccess/views';

// -- components
import CareerAddWidgets from '@components/Career/Form/widgets/Default';

const CareerAdd = () => {
  // set menu
  const { setMenu } = useStateMenu();
  const pathname = usePathname();
  const segments = pathname.split('/');
  const action = segments[2];

  // permission
  const permissions = usePermission('/career');

  useEffect(() => {
    setMenu('career');
  }, [setMenu]);

  if (!permissions.canCreate) {
    return <DeniedAccess />;
  }

  return <CareerAddWidgets action={action} />;
};

export default CareerAdd;
