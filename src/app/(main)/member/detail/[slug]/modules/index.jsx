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
import MemberDetailWidgets from '@components/Member/Detail/widgets/Default';

const MemberDetail = ({ slug }) => {
  // set menu
  const { setMenu } = useStateMenu();
  // permission
  const permissions = usePermission('/member');

  useEffect(() => {
    setMenu('Member');
  }, [setMenu]);

  if (!permissions.canView) {
    return <DeniedAccess />;
  }

  return <MemberDetailWidgets slug={slug} />;
};

export default MemberDetail;
