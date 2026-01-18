// -- libraries
import { useState } from 'react';

// -- models
import modelDealerModel from '@components/Dealer/DrawerDetail/models';

// -- components
import DrawerDetailView from '@components/Dealer/DrawerDetail/views';

const DrawerDetailWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (payload) => {
    // setLoading(true);
    // setMessage('');
    // try {
    //   const { data, error } = await modelDealerModel.submit(payload);
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

  return <DrawerDetailView {...props} onSubmit={handleSubmit} loading={loading} message={message} />;
};

export default DrawerDetailWidget;
