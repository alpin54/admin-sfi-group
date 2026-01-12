// -- libraries
import { useState } from 'react';

// -- models
import modalAddressModel from '@components/Order/ModalAddress/models';

// -- components
import ModalAddressView from '@components/Order/ModalAddress/views';

const ModalAddressWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await modalAddressModel.submit(formData, method);

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

  return <ModalAddressView {...props} onSubmit={handleSubmit} loading={loading} message={message} />;
};

export default ModalAddressWidget;
