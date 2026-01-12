// -- libraries
import { useCallback } from 'react';

// -- models
import detailOrderModel from '@components/Order/Detail/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import OrderDetailView from '@components/Order/Detail/views';

// -- data
import dummyData from '@components/Order/Detail/data';

const OrderDetailWidget = (props) => {
  // Only fetch Order data if slug exists
  // const { data, refetch } = useFirstLoad(
  //   useCallback(() => (props.slug ? detailOrderModel.single(props.slug) : []), [props.slug])
  // );

  // Handle to cancel then refetch
  const handleCancel = async (payload) => {
    // const { error: errorToCancel } = await detailOrderModel.submit(payload);
    // if (!errorToCancel) {
    //   refetch();
    //   return { error: null };
    // } else {
    //   return {
    //     error: errorToCancel?.message
    //   };
    // }
  };

  // Handle to shipping then refetch
  const handleToShipping = async (payload) => {
    // const { error: errorToShipping } = await detailOrderModel.submit(payload);
    // if (!errorToShipping) {
    //   refetch();
    //   return { error: null };
    // } else {
    //   return {
    //     error: errorToShipping?.message
    //   };
    // }
  };

  return (
    <OrderDetailView
      slug={props.slug}
      data={dummyData?.data}
      refetch={() => {}}
      onCancel={handleCancel}
      onToShipping={handleToShipping}
    />
  );
};

export default OrderDetailWidget;
