// -- libraries
import { useState } from 'react';

// -- models
import modalCustomerModel from '@components/Order/ModalCustomer/models';

// -- components
import ModalCustomerView from '@components/Order/ModalCustomer/views';

const ModalCustomerWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await modalCustomerModel.submit(formData, method);

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

  return <ModalCustomerView {...props} onSubmit={handleSubmit} loading={loading} message={message} />;
};

export default ModalCustomerWidget;
