// -- libraries
import { useState, useCallback } from 'react';

// -- models
import formFaqSection2Model from '@components/Pages/Faq/FormSection2/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormFaqSection2View from '@components/Pages/Faq/FormSection2/views';

// -- data
import data from '@components/Pages/Faq/FormSection2/data';

const FormFaqSection2Widget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  // const { data, ready, refetch } = useFirstLoad(useCallback(() => formFaqSection2Model.single(), []));

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      // const { data, error } = await formFaqSection2Model.submit(formData, method);

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
    <FormFaqSection2View
      {...props}
      data={data}
      ready={false}
      loading={loading}
      message={message}
      onSubmit={handleSubmit}
    />
  );
};

export default FormFaqSection2Widget;
