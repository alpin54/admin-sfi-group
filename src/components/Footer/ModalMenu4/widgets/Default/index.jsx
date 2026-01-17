// -- libraries
import { useState } from 'react';

// -- models
import modalBannerModel from '@components/Footer/ModalMenu4/models';

// -- components
import ModalBannerFooterView from '@components/Footer/ModalMenu4/views';

const FooterModalMenu4Widget = (props) => {
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
  // return <ModalBannerFooterView {...props} loading={loading} message={message} onSubmit={handleSubmit} />;
  return <ModalBannerFooterView {...props} />;
};

export default FooterModalMenu4Widget;
