// -- libraries
import { useCallback, useMemo } from 'react';

// -- models
import signUpBannerModel from '@components/Pages/SignUp/Banner/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import BannerSignUpView from '@components/Pages/SignUp/Banner/views';

// -- data
import data from '@components/Pages/SignUp/Banner/data';

const BannerSignUpWidget = (props) => {
  // const fetchParams = useMemo(() => ({}), []);

  // const fetcher = useCallback(() => signUpBannerModel.list(fetchParams), [fetchParams]);

  // const { data, ready, refetch } = useFirstLoad(fetcher);

  // const handleDelete = async (id) => {
  //   const { error: errorDelete } = await signUpBannerModel.delete(id);
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
  //   const { error: errorStatus } = await signUpBannerModel.status(payload);
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
    // <BannerSignUpView
    //   {...props}
    //   data={data?.data}
    //   onDelete={handleDelete}
    //   onStatus={handleStatus}
    //   loading={!ready}
    //   refetch={refetch}
    // />
    <BannerSignUpView data={data} {...props} />
  );
};

export default BannerSignUpWidget;
