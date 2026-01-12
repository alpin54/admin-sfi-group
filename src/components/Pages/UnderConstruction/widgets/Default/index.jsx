// -- libraries
import { useState, useCallback } from 'react';

// -- models
import underConstructionModel from '@components/Pages/NotFound/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import UnderConstructionView from '@components/Pages/UnderConstruction/views';

const UnderConstructionWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  const { data, ready, refetch } = useFirstLoad(useCallback(() => underConstructionModel.single(), []));

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await underConstructionModel.submit(formData, method);

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
  return (
    <UnderConstructionView
      {...props}
      data={data?.data}
      ready={!ready}
      loading={loading}
      message={message}
      onSubmit={handleSubmit}
    />
  );
};

export default UnderConstructionWidget;
