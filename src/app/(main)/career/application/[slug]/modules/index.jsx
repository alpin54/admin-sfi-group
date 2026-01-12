'use client';

// -- libraries
import { useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- hooks
import usePermission from '@hooks/usePermission';

// -- elements
import DeniedAccess from '@components/Elements/DeniedAccess/views';

// -- components
import CareerApplicationWidgets from '@components/Career/Application/widgets/Default';

const CareerApplication = () => {
  // set menu
  const { setMenu } = useStateMenu();
  const params = useParams();
  const pathname = usePathname();
  const segments = pathname.split('/');
  const slug = params.slug;
  const action = segments[2];
  // permission
  const permissions = usePermission('/career');

  useEffect(() => {
    setMenu('career');
  }, [setMenu]);

  if (!permissions.canView) {
    return <DeniedAccess />;
  }

  return <CareerApplicationWidgets slug={slug} action={action} />;
};

export default CareerApplication;
