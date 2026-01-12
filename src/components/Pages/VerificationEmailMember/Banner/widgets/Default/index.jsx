// -- libraries
import { useCallback, useMemo } from 'react';

// -- models
import verificationEmailMemberBannerModel from '@components/Pages/VerificationEmailMember/Banner/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import BannerVerificationEmailMemberView from '@components/Pages/VerificationEmailMember/Banner/views';

// -- data
import data from '@components/Pages/VerificationEmailMember/Banner/data';

const BannerVerificationEmailMemberWidget = (props) => {
  // const fetchParams = useMemo(() => ({}), []);

  // const fetcher = useCallback(() => verificationEmailMemberBannerModel.list(fetchParams), [fetchParams]);

  // const { data, ready, refetch } = useFirstLoad(fetcher);

  // const handleDelete = async (id) => {
  //   const { error: errorDelete } = await verificationEmailMemberBannerModel.delete(id);
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
  //   const { error: errorStatus } = await verificationEmailMemberBannerModel.status(payload);
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
    // <BannerVerificationEmailMemberView
    //   data={data?.data}
    //   loading={!ready}
    //   onDelete={handleDelete}
    //   onStatus={handleStatus}
    //   refetch={refetch}
    // />
    <BannerVerificationEmailMemberView data={data} {...props} />
  );
};

export default BannerVerificationEmailMemberWidget;
