// -- libraries
import { useState } from 'react';

// -- models
import modelMemberModel from '@components/Member/ModalPassword/models';

// -- components
import ModalPasswordView from '@components/Member/ModalPassword/views';

const ModalPasswordWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (payload, method) => {
    // setLoading(true);
    // setMessage('');
    // try {
    //   const { data, error } = await modelMemberModel.submit(payload, method);
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

  return <ModalPasswordView {...props} onSubmit={handleSubmit} loading={loading} message={message} />;
};

export default ModalPasswordWidget;
