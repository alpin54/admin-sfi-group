// --library
import { useState, useCallback } from 'react';

// -- models
import careerEmptyModel from '@components/Pages/Career/FormSection4/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormCareerSection4View from '@components/Pages/Career/FormSection4/views';

// -- data
import data from '@components/Pages/Career/FormSection4/data';

const FormCareerWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  // const { data, ready, refetch } = useFirstLoad(useCallback(() => careerEmptyModel.single(), []));

  const handleSubmit = async (formData) => {
    setLoading(true);
    setMessage('');

    try {
      // const { data, error } = await careerEmptyModel.submit(formData);

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
    <FormCareerSection4View
      {...props}
      data={data}
      ready={false}
      loading={loading}
      message={message}
      onSubmit={handleSubmit}
    />
  );
};

export default FormCareerWidget;
