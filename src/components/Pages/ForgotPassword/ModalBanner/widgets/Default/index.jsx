// -- libraries
import { useState } from 'react';

// -- models
import modalForgotPasswordBannerModel from '@components/Pages/ForgotPassword/ModalBanner/models';

// -- components
import ForgotPasswordModalBannerView from '@components/Pages/ForgotPassword/ModalBanner/views';

const ForgotPasswordModalBannerWidget = (props) => {
  // const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState('');

  // const handleSubmit = async (formData, method) => {
  //   setLoading(true);
  //   setMessage('');

  //   try {
  //     const { data, error } = await modalForgotPasswordBannerModel.submit(formData, method);

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
  return <ForgotPasswordModalBannerView {...props} />;
};

export default ForgotPasswordModalBannerWidget;
