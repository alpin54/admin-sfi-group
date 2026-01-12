// -- libraries
import { useCallback, useMemo } from 'react';

// -- models
import verificationEmailDealerBannerModel from '@components/Pages/VerificationEmailDealer/Banner/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import BannerVerificationEmailDealerView from '@components/Pages/VerificationEmailDealer/Banner/views';

// -- data
import data from '@components/Pages/VerificationEmailDealer/Banner/data';

const BannerVerificationEmailDealerWidget = (props) => {
  // const fetchParams = useMemo(() => ({}), []);

  // const fetcher = useCallback(() => verificationEmailDealerBannerModel.list(fetchParams), [fetchParams]);

  // const { data, ready, refetch } = useFirstLoad(fetcher);

  // const handleDelete = async (id) => {
  //   const { error: errorDelete } = await verificationEmailDealerBannerModel.delete(id);
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
  //   const { error: errorStatus } = await verificationEmailDealerBannerModel.status(payload);
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
    // <BannerVerificationEmailDealerView
    //   data={data?.data}
    //   loading={!ready}
    //   onDelete={handleDelete}
    //   onStatus={handleStatus}
    //   refetch={refetch}
    // />
    <BannerVerificationEmailDealerView data={data} {...props} />
  );
};

export default BannerVerificationEmailDealerWidget;
