// -- libraries
import { useState, useCallback } from 'react';

// -- models
import notFoundModel from '@components/Pages/NotFound/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import NotFoundView from '@components/Pages/NotFound/views';

// -- data
import data from '@components/Pages/NotFound/data';

const NotFoundWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  // const { data, ready, refetch } = useFirstLoad(useCallback(() => notFoundModel.single(), []));

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      // const { data, error } = await notFoundModel.submit(formData, method);

      // if (error) {
      //   setMessage(error.message);
      // }

      return data;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unknown error occurred';
      setMessage(msg);
      return { error: msg };
    } finally {
      setLoading(false);
    }
  };

  return (
    <NotFoundView {...props} data={data} ready={false} loading={loading} message={message} onSubmit={handleSubmit} />
  );
};

export default NotFoundWidget;
