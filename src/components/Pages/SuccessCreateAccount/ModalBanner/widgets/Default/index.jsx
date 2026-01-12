// -- libraries
import { useState } from 'react';

// -- models
import modalSuccessCreateAccountModel from '@components/Pages/SuccessCreateAccount/ModalBanner/models';

// -- components
import ModalBannerSuccessCreateAccountView from '@components/Pages/SuccessCreateAccount/ModalBanner/views';

const SuccessCreateAccountModalBannerWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await modalSuccessCreateAccountModel.submit(formData, method);

      if (error) {
        setMessage(error.message);
      }

      return data;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unknown error occurred';
      setMessage(msg);
      return { error: msg };
    } finally {
      setLoading(false);
    }
  };

  return <ModalBannerSuccessCreateAccountView {...props} onSubmit={handleSubmit} loading={loading} message={message} />;
};

export default SuccessCreateAccountModalBannerWidget;
