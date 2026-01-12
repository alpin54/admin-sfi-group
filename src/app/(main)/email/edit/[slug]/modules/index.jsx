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
import EmailEditWidgets from '@components/Email/Form/widgets/Default';

const EmailEdit = () => {
  // set menu
  const { setMenu } = useStateMenu();
  const params = useParams();
  const pathname = usePathname();
  const segments = pathname.split('/');
  const slug = params.slug;
  const action = segments[2];
  // permission
  const permissions = usePermission('/email');

  useEffect(() => {
    setMenu('email');
  }, [setMenu]);

  if (!permissions.canEdit) {
    return <DeniedAccess />;
  }

  return <EmailEditWidgets slug={slug} action={action} method='edit' />;
};

export default EmailEdit;
