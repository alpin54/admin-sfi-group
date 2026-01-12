// -- libraries
import { useState } from 'react';

// -- models
import modalValuesModel from '@components/Pages/AboutUs/ModalValues/models';

// -- components
import ModalValuesView from '@components/Pages/AboutUs/ModalValues/views';

const AboutUsModalValuesWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await modalValuesModel.submit(formData, method);

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

  return <ModalValuesView {...props} loading={loading} message={message} onSubmit={handleSubmit} />;
};

export default AboutUsModalValuesWidget;
