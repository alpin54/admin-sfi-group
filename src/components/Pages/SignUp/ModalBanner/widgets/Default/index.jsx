// --library
import { useState } from 'react';

// -- models
import modalBannerSignUpModel from '@components/Pages/SignUp/ModalBanner/models';

// -- components
import ModalBannerSignUpView from '@components/Pages/SignUp/ModalBanner/views';

const SignUpModalBannerWidget = (props) => {
  // const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState('');

  // const handleSubmit = async (formData, method) => {
  //   setLoading(true);
  //   setMessage('');

  //   try {
  //     const { data, error } = await modalBannerSignUpModel.submit(formData, method);

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

  return <ModalBannerSignUpView {...props} />;
};

export default SignUpModalBannerWidget;
