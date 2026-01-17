// -- libraries
import { useState, useCallback } from 'react';

// -- models
import contactUsModel from '@components/Pages/ContactUs/FormSection2/models';

// --hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormContactUsSection2View from '@components/Pages/ContactUs/FormSection2/views';

// -- data
import data from '@components/Pages/ContactUs/FormSection2/data';

const FormContactUsSection2Widget = (props) => {
  const [loading, setLoading] = useState();
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  // const { data, ready, refetch } = useFirstLoad(useCallback(() => contactUsModel.single(), []));

  // Handle publish then refetch
  const handlePublish = async (payload) => {
    // const { error: errorPublish } = await contactUsModel.publish(payload);
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
      // const { data, error } = await contactUsModel.submit(formData, method);

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
    <FormContactUsSection2View
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

export default FormContactUsSection2Widget;
