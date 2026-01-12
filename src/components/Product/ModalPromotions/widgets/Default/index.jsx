// -- libraries
import { useState } from 'react';

// -- models
import modalPromotionsModel from '@components/Product/ModalPromotions/models';

// -- components
import ModalPromotionsView from '@components/Product/ModalPromotions/views';

const PromotionsModalWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle submit
  const handleSubmit = async (formData, method, type) => {
    setLoading(true);
    setMessage('');

    try {
      // const { data, error } = await modalPromotionsModel.submit(formData, method, type);

      // if (error) {
      //   setMessage(error.message);
      // }

      // return data;
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unknown error occurred';
      setMessage(msg);
      return { error: msg };
    } finally {
      setLoading(false);
    }
  };

  return <ModalPromotionsView {...props} onSubmit={handleSubmit} loading={loading} message={message} />;
};

export default PromotionsModalWidget;
