// -- libraries
import { useState } from 'react';

// -- models
import modalHighlightModel from '@components/Pages/Home/ModalHighlight/models';

// -- components
import ModalHighlightHomeView from '@components/Pages/Home/ModalHighlight/views';

const HomeModalHighlightWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await modalHighlightModel.submit(formData);

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

  return <ModalHighlightHomeView {...props} loading={loading} message={message} onSubmit={handleSubmit} />;
};

export default HomeModalHighlightWidget;
