// --library
import { useState } from 'react';

// -- models
import modalImageModel from '@components/Pages/Career/ModalImage/models';

// -- components
import ModalBannerCareerView from '@components/Pages/Career/ModalImage/views';

const CareerModalBannerWidget = (props) => {
  const [loading, setLoading] = useState();
  const [message, setMessage] = useState('');

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await modalImageModel.submit(formData, method);

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
  return <ModalBannerCareerView {...props} loading={loading} message={message} onSubmit={handleSubmit} />;
};

export default CareerModalBannerWidget;
