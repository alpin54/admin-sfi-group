// -- libraries
import { useState, useCallback } from 'react';

// -- models
import metaModel from '@components/Meta/FormSection2/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormMetaSection2View from '@components/Meta/FormSection2/views';

const FormMetaSection2Widget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch role data if slug exists
  const { data, ready, refetch } = useFirstLoad(useCallback(() => metaModel.single(), []));

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await metaModel.submit(formData, method);

      if (error) {
        setMessage(error.message);
      }

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
    <FormMetaSection2View
      {...props}
      data={data?.data}
      ready={!ready}
      loading={loading}
      message={message}
      onSubmit={handleSubmit}
    />
  );
};

export default FormMetaSection2Widget;
