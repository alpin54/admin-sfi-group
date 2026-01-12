// --library
import { useState } from 'react';

// -- models
import modalVerificationEmailBannerModel from '@components/Pages/VerificationEmailDealer/ModalBanner/models';

// -- components
import VerificationEmailDealerModalBannerView from '@components/Pages/VerificationEmailDealer/ModalBanner/views';

const VerificationEmailDealerModalBannerWidget = (props) => {
  // const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState('');

  // const handleSubmit = async (formData, method) => {
  //   setLoading(true);
  //   setMessage('');

  //   try {
  //     const { data, error } = await modalVerificationEmailBannerModel.submit(formData, method);

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
  return <VerificationEmailDealerModalBannerView {...props} />;
};

export default VerificationEmailDealerModalBannerWidget;
