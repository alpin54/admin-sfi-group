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
import DealerDetailWidgets from '@components/Dealer/Detail/widgets/Default';

const DealerDetail = ({ slug }) => {
  // set menu
  const { setMenu } = useStateMenu();
  // permission
  const permissions = usePermission('/dealer');

  useEffect(() => {
    setMenu('dealer');
  }, [setMenu]);

  if (!permissions.canView) {
    return <DeniedAccess />;
  }

  return <DealerDetailWidgets slug={slug} />;
};

export default DealerDetail;
