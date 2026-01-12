// --library
import { useState } from 'react';

// -- models
import emailForgotPasswordModalBannerModel from '@components/Pages/EmailForgotPassword/ModalBanner/models';

// -- components
import EmailForgotPasswordModalBannerView from '@components/Pages/EmailForgotPassword/ModalBanner/views';

const EmailForgotPasswordModalBannerWidget = (props) => {
  // const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState('');

  // const handleSubmit = async (formData, method) => {
  //   setLoading(true);
  //   setMessage('');

  //   try {
  //     const { data, error } = await emailForgotPasswordModalBannerModel.submit(formData, method);

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

  return <EmailForgotPasswordModalBannerView {...props} />;
};

export default EmailForgotPasswordModalBannerWidget;
