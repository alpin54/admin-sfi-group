// --library
import { useState, useCallback, useMemo } from 'react';

// -- models
import forgotPasswordBannerModel from '@components/Pages/ForgotPassword/Banner/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import BannerView from '@components/Pages/ForgotPassword/Banner/views';

// -- data dummy
import data from '@components/Pages/ForgotPassword/Banner/data';

const BannerWidget = (props) => {
  // const fetcParams = useMemo(() => ({}), []);

  // const fetcher = useCallback(() => forgotPasswordBannerModel.list(fetcParams), [fetcParams]);

  // const { data, ready, refetch } = useFirstLoad(fetcher);

  // const handleDelete = async (id) => {
  //   const { error: errorDelete } = await forgotPasswordBannerModel.delete(id);
  //   if (!errorDelete) {
  //     refetch();
  //     return { error: null };
  //   } else {
  //     return {
  //       error: errorDelete?.message
  //     };
  //   }
  // };

  // const handleStatus = async (payload) => {
  //   const { error: errorStatus } = await forgotPasswordBannerModel.status(payload);
  //   if (!errorStatus) {
  //     refetch();
  //     return { error: null };
  //   } else {
  //     return {
  //       error: errorStatus?.message
  //     };
  //   }
  // };
  return (
    // <BannerView {...props} data={data?.data} onDelete={handleDelete} onStatus={handleStatus} refetch={refetch} />
    <BannerView {...props} data={data} />
  );
};

export default BannerWidget;
