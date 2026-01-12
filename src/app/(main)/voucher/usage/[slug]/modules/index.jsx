'use client';

// -- libraries
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

// -- states
import useStateMenu from '@components/Sidebar/states';

// -- hooks
import usePermission from '@hooks/usePermission';

// -- elements
import DeniedAccess from '@components/Elements/DeniedAccess/views';

// -- components
import VoucherUsageWidgets from '@components/Voucher/Usage/widgets/Default';

const VoucherUsage = () => {
  // set menu
  const { setMenu } = useStateMenu();
  const params = useParams();
  const slug = params.slug;
  // permission
  const permissions = usePermission('/voucher');

  useEffect(() => {
    setMenu('voucher');
  }, [setMenu]);

  if (!permissions.canView) {
    return <DeniedAccess />;
  }

  return <VoucherUsageWidgets slug={slug} />;
};

export default VoucherUsage;
