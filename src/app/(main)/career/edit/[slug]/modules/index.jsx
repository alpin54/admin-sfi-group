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
import CareerEditWidgets from '@components/Career/Form/widgets/Default';

const CareerEdit = () => {
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

  if (!permissions.canEdit) {
    return <DeniedAccess />;
  }

  return <CareerEditWidgets slug={slug} action={action} />;
};

export default CareerEdit;
