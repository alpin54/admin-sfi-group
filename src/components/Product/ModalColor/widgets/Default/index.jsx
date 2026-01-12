// -- libraries
import { useState } from 'react';

// -- models
import modalColorModel from '@components/Product/ModalColor/models';

// -- components
import ModalColorView from '@components/Product/ModalColor/views';

const ModalColorWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (formData, method, type) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await modalColorModel.submit(formData, method, type);

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

  return <ModalColorView {...props} onSubmit={handleSubmit} loading={loading} message={message} />;
};

export default ModalColorWidget;
