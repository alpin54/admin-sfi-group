// -- libraries
import { useState, useCallback } from 'react';

// -- models
import formPromoSection2Model from '@components/Pages/Promo/FormSection2/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormPromoSection2View from '@components/Pages/Promo/FormSection2/views';

// -- data
import data from '@components/Pages/Promo/FormSection2/data';

const FormPromoSection2Widget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  // const { data, ready, refetch } = useFirstLoad(useCallback(() => formPromoSection2Model.single(), []));

  // Handle publish then refetch
  const handlePublish = async (payload) => {
    // const { error: errorPublish } = await formPromoSection2Model.publish(payload);
    // if (!errorPublish) {
    //   refetch();
    //   return { error: null };
    // } else {
    //   return {
    //     error: errorPublish?.message
    //   };
    // }
  };

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      // const { data, error } = await formPromoSection2Model.submit(formData, method);

      // if (error) {
      //   setMessage(error.message);
      // }

      if (data) {
        refetch();
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
    <FormPromoSection2View
      {...props}
      data={data}
      ready={false}
      loading={loading}
      message={message}
      onPublish={handlePublish}
      onSubmit={handleSubmit}
    />
  );
};

export default FormPromoSection2Widget;
