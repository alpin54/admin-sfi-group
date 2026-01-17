// -- libraries
import { useState, useCallback } from 'react';

// -- models
import FooterModel from '@components/Footer/FormSection1/models';

// --hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormFooterSection1View from '@components/Footer/FormSection1/views';

// -- data
import data from '@components/Footer/FormSection1/data';

const FormFooterSection1Widget = (props) => {
  const [loading, setLoading] = useState();
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  // const { data, ready, refetch } = useFirstLoad(useCallback(() => FooterModel.single(), []));

  // Handle publish then refetch
  const handlePublish = async (payload) => {
    // const { error: errorPublish } = await FooterModel.publish(payload);
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
      // const { data, error } = await FooterModel.submit(formData, method);

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
    <FormFooterSection1View
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

export default FormFooterSection1Widget;
