// -- libraries
import { useState } from 'react';

// -- models
import ModalMenuModel from '@components/Menu/ModalMenu/models';

// -- components
import ModalMenuView from '@components/Menu/ModalMenu/views';

const DefaultModalMenuWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle submit
  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await ModalMenuModel.submit(formData, method);

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
  return <ModalMenuView {...props} onSubmit={handleSubmit} loading={loading} message={message} />;
};

export default DefaultModalMenuWidget;
