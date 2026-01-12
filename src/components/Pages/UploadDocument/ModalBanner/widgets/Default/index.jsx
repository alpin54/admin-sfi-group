// --library
import { useState } from 'react';

// -- models
import modalBannerUploadDocumentModel from '@components/Pages/UploadDocument/ModalBanner/models';

// -- components
import ModalBannerUploadDocumentView from '@components/Pages/UploadDocument/ModalBanner/views';

const UploadDocumentModalBannerWidget = (props) => {
  // const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState('');

  // const handleSubmit = async (formData, method) => {
  //   setLoading(true);
  //   setMessage('');

  //   try {
  //     const { data, error } = await modalBannerUploadDocumentModel.submit(formData, method);

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

  return <ModalBannerUploadDocumentView {...props} />;
};

export default UploadDocumentModalBannerWidget;
