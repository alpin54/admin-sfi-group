// -- libraries
import { useState, useCallback } from 'react';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- models
import homeBannerModel from '@components/Pages/Home/HeroBanner/models';

// -- components
import HeroBannerView from '@components/Pages/Home/HeroBanner/views';

// -- data
import data from '@components/Pages/Home/HeroBanner/data';

const HeroBannerWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch hero banner data if slug exists
  const { data } = useFirstLoad(
    useCallback(() => (props.slug ? homeBannerModel.single(props.slug) : []), [props.slug])
  );

  // Handle submit
  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await homeBannerModel.submit(formData, method);

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

  return <HeroBannerView {...props} data={data?.data} loading={loading} message={message} onSubmit={handleSubmit} />;
};

export default HeroBannerWidget;
