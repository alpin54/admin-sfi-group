// --library
import { useState } from 'react';

// -- models
import modalSuccessUploadDocumentBannerModel from '@components/Pages/SuccessUploadDocument/ModalBanner/models';

// -- components
import SuccessUploadDocumentModalBannerView from '@components/Pages/SuccessUploadDocument/ModalBanner/views';

const SuccessUploadDocumentModalBannerWidget = (props) => {
  // const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState('');

  // const handleSubmit = async (formData, method) => {
  //   setLoading(true);
  //   setMessage('');

  //   try {
  //     const { data, error } = await modalSuccessUploadDocumentBannerModel.submit(formData, method);

  //     if (error) {
  //       setMessage(error.message);
  //     }

  //     return data;
  //   } catch (err) {
  //     const msg = err instanceof Error ? err.message : 'An unknown error occurred';
  //     setMessage(msg);
  //     return { error: msg };
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return <SuccessUploadDocumentModalBannerView {...props} />;
};

export default SuccessUploadDocumentModalBannerWidget;
