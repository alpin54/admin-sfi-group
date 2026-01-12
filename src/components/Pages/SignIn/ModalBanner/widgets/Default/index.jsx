// -- libraries
import { useState } from 'react';

// -- models
import modalSignInBannerModel from '@components/Pages/SignIn/ModalBanner/models';

// -- components
import ModalBannerSignInView from '@components/Pages/SignIn/ModalBanner/views';

const SignInModalBannerWidget = (props) => {
  // const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState('');

  // const handleSubmit = async (formData, method) => {
  //   setLoading(true);
  //   setMessage('');

  //   try {
  //     const { data, error } = await modalSignInBannerModel.submit(formData, method);

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

  return <ModalBannerSignInView {...props} />;
};

export default SignInModalBannerWidget;
