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
import ProductDetailWidgets from '@components/Product/Form/widgets/Default';

const ProductDetail = () => {
  // set menu
  const { setMenu } = useStateMenu();
  const params = useParams();
  const pathname = usePathname();
  const segments = pathname.split('/');
  const slug = params.slug;
  const action = segments[2];
  // permission
  const permissions = usePermission('/product');

  useEffect(() => {
    setMenu('product');
  }, [setMenu]);

  if (!permissions.canView) {
    return <DeniedAccess />;
  }

  return <ProductDetailWidgets slug={slug} action={action} />;
};

export default ProductDetail;
