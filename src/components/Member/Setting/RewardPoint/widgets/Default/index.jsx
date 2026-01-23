// -- libraries
import { useState, useCallback } from 'react';

// -- models
import settingModel from '@components/Member/Setting/RewardPoint/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import RewardPointView from '@components/Member/Setting/RewardPoint/views';

// -- dummy
import dummyData from '@components/Member/Setting/RewardPoint/data';

const RewardPointWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  // const { data, ready, refetch } = useFirstLoad(useCallback(() => settingModel.single(), []));

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      // const { data, error } = await settingModel.submit(formData, method);
      // if (error) {
      //   setMessage(error.message);
      // }
      // return data;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unknown error occurred';
      setMessage(msg);
      return { error: msg };
    } finally {
      setLoading(false);
    }
  };
  return (
    <RewardPointView
      {...props}
      data={dummyData}
      ready={true}
      loading={loading}
      message={message}
      onSubmit={handleSubmit}
    />
  );
};

export default RewardPointWidget;
