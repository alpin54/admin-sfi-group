// -- libraries
import { useState } from 'react';

// -- models
import modalWorkplaceModel from '@components/Career/ModalWorkplace/models';

// -- components
import ModalWorkplaceView from '@components/Career/ModalWorkplace/views';

const DefaultModalWorkplaceWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle submit
  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await modalWorkplaceModel.submit(formData, method);

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

  return <ModalWorkplaceView {...props} onSubmit={handleSubmit} loading={loading} message={message} />;
};

export default DefaultModalWorkplaceWidget;
