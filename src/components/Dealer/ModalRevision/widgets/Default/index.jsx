// -- libraries
import { useState } from 'react';

// -- models
import modelDealerModel from '@components/Dealer/ModalRevision/models';

// -- components
import ModalRevisionView from '@components/Dealer/ModalRevision/views';

const ModalRevisionWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (payload, method) => {
    // setLoading(true);
    // setMessage('');
    // try {
    //   const { data, error } = await modelDealerModel.submit(payload, method);
    //   if (error) {
    //     setMessage(error.message);
    //   }
    //   return data;
    // } catch (err) {
    //   const msg = err instanceof Error ? err.message : 'An unknown error occurred';
    //   setMessage(msg);
    //   return { error: msg };
    // } finally {
    //   setLoading(false);
    // }
  };

  return <ModalRevisionView {...props} onSubmit={handleSubmit} loading={loading} message={message} />;
};

export default ModalRevisionWidget;
