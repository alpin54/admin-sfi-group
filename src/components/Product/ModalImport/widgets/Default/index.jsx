// -- libraries
import { useState } from 'react';

// -- models
import modalImportModel from '@components/Product/ModalImport/models';

// -- components
import ImportModalView from '@components/Product/ModalImport/views';

const ImportModalWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle submit
  const handleSubmit = async (payload) => {
    setLoading(true);
    setMessage('');

    try {
      // const { data, error } = await modalImportModel.submit(payload);

      // if (error) {
      //   setMessage(error.message);
      // }

      // return data;
      return {};
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unknown error occurred';
      setMessage(msg);
      return { error: msg };
    } finally {
      setLoading(false);
    }
  };

  return <ImportModalView {...props} onSubmit={handleSubmit} loading={loading} message={message} />;
};

export default ImportModalWidget;
