// -- libraries
import { useCallback, useMemo } from 'react';

// -- models
import newPasswordBannerModel from '@components/Pages/NewPassword/Banner/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import BannerNewPasswordView from '@components/Pages/NewPassword/Banner/views';

// -- data
import data from '@components/Pages/NewPassword/Banner/data';

const BannerNewPasswordWidget = (props) => {
  // const fetchParams = useMemo(() => ({}), []);

  // const fetcher = useCallback(() => newPasswordBannerModel.list(fetchParams), [fetchParams]);

  // const { data, ready, refetch } = useFirstLoad(fetcher);

  // const handleDelete = async (id) => {
  //   const { error: errorDelete } = await newPasswordBannerModel.delete(id);
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
  //   const { error: errorStatus } = await newPasswordBannerModel.status(payload);
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
    // <BannerNewPasswordView
    //   data={data?.data}
    //   loading={!ready}
    //   onDelete={handleDelete}
    //   onStatus={handleStatus}
    //   refetch={refetch}
    // />
    <BannerNewPasswordView data={data} {...props} />
  );
};

export default BannerNewPasswordWidget;
