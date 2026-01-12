// -- libraries
import { useCallback, useMemo } from 'react';

// -- models
import successUploadDocumentBannerModel from '@components/Pages/SuccessUploadDocument/Banner/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import BannerSuccessUploadDocumentView from '@components/Pages/SuccessUploadDocument/Banner/views';

// -- data
import data from '@components/Pages/SuccessUploadDocument/Banner/data';

const BannerSuccessUploadDocumentWidget = (props) => {
  // const fetchParams = useMemo(() => ({}), []);

  // const fetcher = useCallback(() => successUploadDocumentBannerModel.list(fetchParams), [fetchParams]);

  // const { data, ready, refetch } = useFirstLoad(fetcher);

  // const handleDelete = async (id) => {
  //   const { error: errorDelete } = await successUploadDocumentBannerModel.delete(id);
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
  //   const { error: errorStatus } = await successUploadDocumentBannerModel.status(payload);
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
    // <BannerSuccessUploadDocumentView
    //   data={data?.data}
    //   loading={!ready}
    //   onDelete={handleDelete}
    //   onStatus={handleStatus}
    //   refetch={refetch}
    // />
    <BannerSuccessUploadDocumentView data={data} {...props} />
  );
};

export default BannerSuccessUploadDocumentWidget;
