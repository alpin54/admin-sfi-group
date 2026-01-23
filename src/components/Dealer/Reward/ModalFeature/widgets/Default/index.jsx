// -- libraries
import { useState } from 'react';

// -- models
import modalRewardBannerModel from '@components/Dealer/Reward/ModalFeature/models';

// -- components
import ModalFeatureRewardView from '@components/Dealer/Reward/ModalFeature/views';

const RewardModalFeatureWidget = (props) => {
  // const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState('');

  // const handleSubmit = async (formData, method) => {
  //   setLoading(true);
  //   setMessage('');

  //   try {
  //     const { data, error } = await modalRewardBannerModel.submit(formData, method);

  //     if (error) {
  //       setMessage(error.message);
  //     }

  //     return data;
  //   } catch (err) {
  //     const msg = err instanceof Error ? err.message : 'An unknown error occurred';
  //     setMessage(msg);
  //     return { error: msg };
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return <ModalFeatureRewardView {...props} />;
};

export default RewardModalFeatureWidget;
