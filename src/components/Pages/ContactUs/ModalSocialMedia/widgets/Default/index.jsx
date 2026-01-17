// -- libraries
import { useState } from 'react';

// -- models
import modalBannerModel from '@components/Pages/ContactUs/ModalSocialMedia/models';

// -- components
import ModalBannerContactUsView from '@components/Pages/ContactUs/ModalSocialMedia/views';

const ContactUsModalBannerWidget = (props) => {
  // const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState('');

  // const handleSubmit = async (payload, method) => {
  //   setLoading(true);
  //   setMessage('');

  //   try {
  //     const { data, error } = await modalBannerModel.submit(payload, method);

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
  // return <ModalBannerContactUsView {...props} loading={loading} message={message} onSubmit={handleSubmit} />;
  return <ModalBannerContactUsView {...props} />;
};

export default ContactUsModalBannerWidget;
