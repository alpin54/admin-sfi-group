// -- libraries
import { useState, useCallback } from 'react';

// -- models
import shippingReturnModel from '@components/Pages/ShippingReturn/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- component
import ShippingReturnView from '@components/Pages/ShippingReturn/views';

const ShippingReturnWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  const { data, ready, refetch } = useFirstLoad(useCallback(() => shippingReturnModel.single(), []));

  // Handle publish then refetch
  const handlePublish = async (payload) => {
    const { error: errorPublish } = await shippingReturnModel.publish(payload);
    if (!errorPublish) {
      refetch();
      return { error: null };
    } else {
      return {
        error: errorPublish?.message
      };
    }
  };

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await shippingReturnModel.submit(formData, method);

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
    <ShippingReturnView
      {...props}
      data={data?.data}
      ready={!ready}
      loading={loading}
      message={message}
      onPublish={handlePublish}
      onSubmit={handleSubmit}
    />
  );
};

export default ShippingReturnWidget;
