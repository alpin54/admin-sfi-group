// -- libraries
import { useCallback, useMemo } from 'react';

// -- models
import uploadDocumentBannerModel from '@components/Pages/UploadDocument/Banner/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import BannerUploadDocumentView from '@components/Pages/UploadDocument/Banner/views';

// -- data
import data from '@components/Pages/UploadDocument/Banner/data';

const BannerUploadDocumentWidget = (props) => {
  // const fetchParams = useMemo(() => ({}), []);

  // const fetcher = useCallback(() => UploadDocumentBannerModel.list(fetchParams), [fetchParams]);

  // const { data, ready, refetch } = useFirstLoad(fetcher);

  // const handleDelete = async (id) => {
  //   const { error: errorDelete } = await UploadDocumentBannerModel.delete(id);
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
  //   const { error: errorStatus } = await UploadDocumentBannerModel.status(payload);
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
    // <BannerUploadDocumentView
    //   {...props}
    //   data={data?.data}
    //   onDelete={handleDelete}
    //   onStatus={handleStatus}
    //   loading={!ready}
    //   refetch={refetch}
    // />
    <BannerUploadDocumentView data={data} {...props} />
  );
};

export default BannerUploadDocumentWidget;
