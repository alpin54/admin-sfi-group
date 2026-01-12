// --library
import { useState } from 'react';

// -- models
import modalNewPasswordBannerModel from '@components/Pages/NewPassword/ModalBanner/models';

// -- components
import ModalBannerNewPasswordView from '@components/Pages/NewPassword/ModalBanner/views';

const NewPasswordModalBannerWidget = (props) => {
  // const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState('');

  // const handleSubmit = async (formData, method) => {
  //   setLoading(true);
  //   setMessage('');

  //   try {
  //     const { data, error } = await modalNewPasswordBannerModel.submit(formData, method);

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

  return <ModalBannerNewPasswordView {...props} />;
};

export default NewPasswordModalBannerWidget;
