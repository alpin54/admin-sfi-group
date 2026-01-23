// -- libraries
import { useState } from 'react';

// -- models
import modalReviewModel from '@components/Product/ModalReview/models';

// -- components
import ModalReviewView from '@components/Product/ModalReview/views';

const ModalReviewWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle submit
  const handleSubmit = async (formData, method, type) => {
    setLoading(true);
    setMessage('');

    try {
      // const { data, error } = await modalReviewModel.submit(formData, method, type);

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

  return <ModalReviewView {...props} onSubmit={handleSubmit} loading={loading} message={message} />;
};

export default ModalReviewWidget;
