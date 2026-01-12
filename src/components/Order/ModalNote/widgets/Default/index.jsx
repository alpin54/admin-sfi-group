// -- libraries
import { useState } from 'react';

// -- models
import modalNoteModel from '@components/Order/ModalNote/models';

// -- components
import ModalNoteView from '@components/Order/ModalNote/views';

const ModalNoteWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await modalNoteModel.submit(formData, method);

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

  return <ModalNoteView {...props} onSubmit={handleSubmit} loading={loading} message={message} />;
};

export default ModalNoteWidget;
