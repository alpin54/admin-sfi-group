// -- libraries
import { useState } from 'react';

// -- models
import modalJobTypeModel from '@components/Career/ModalJobType/models';

// -- components
import ModalJobTypeView from '@components/Career/ModalJobType/views';

const DefaultModalJobTypeWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle submit
  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await modalJobTypeModel.submit(formData, method);

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
  return <ModalJobTypeView {...props} onSubmit={handleSubmit} loading={loading} message={message} />;
};

export default DefaultModalJobTypeWidget;
