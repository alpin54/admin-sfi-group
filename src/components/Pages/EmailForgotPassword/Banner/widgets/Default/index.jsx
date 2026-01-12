// -- libraries
import { useCallback, useMemo } from 'react';

// -- models
import sendEmailBannerModel from '@components/Pages/EmailForgotPassword/Banner/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import BannerEmailForgotPasswordView from '@components/Pages/EmailForgotPassword/Banner/views';

// -- data
import data from '@components/Pages/EmailForgotPassword/Banner/data';

const BannerEmailForgotPasswordWidget = (props) => {
  // const fetchParams = useMemo(() => ({}), []);

  // const fetcher = useCallback(() => sendEmailBannerModel.list(fetchParams), [fetchParams]);

  // const { data, ready, refetch } = useFirstLoad(fetcher);

  // const handleDelete = async (id) => {
  //   const { error: errorDelete } = await sendEmailBannerModel.delete(id);
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
  //   const { error: errorStatus } = await sendEmailBannerModel.status(payload);
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
    // <BannerEmailForgotPasswordView
    //   data={data?.data}
    //   loading={!ready}
    //   onDelete={handleDelete}
    //   onStatus={handleStatus}
    //   refetch={refetch}
    // />
    <BannerEmailForgotPasswordView {...props} data={data} />
  );
};

export default BannerEmailForgotPasswordWidget;
