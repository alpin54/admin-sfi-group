// --library
import { useState } from 'react';

// -- models
import modalVerificationEmailBannerModel from '@components/Pages/VerificationEmailMember/ModalBanner/models';

// -- components
import VerificationEmailMemberModalBannerView from '@components/Pages/VerificationEmailMember/ModalBanner/views';

const VerificationEmailMemberModalBannerWidget = (props) => {
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
  return <VerificationEmailMemberModalBannerView {...props} />;
};

export default VerificationEmailMemberModalBannerWidget;
