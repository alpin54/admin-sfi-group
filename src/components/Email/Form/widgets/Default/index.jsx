// -- libraries
import { useState, useCallback } from 'react';

// -- models
import emailFormModel from '@components/Email/Form/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormView from '@components/Email/Form/views';

// -- data
import data from '@components/Email/Form/data';

const FormWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { data, refetch } = useFirstLoad(
    useCallback(() => (props.slug ? emailFormModel.single(props.slug) : []), [props.slug])
  );

  const handleSubmit = async (payload, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await emailFormModel.submit(payload, method);

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
    <FormView
      {...props}
      data={data?.data ?? null}
      loading={loading}
      message={message}
      onSubmit={handleSubmit}
      refetch={refetch}
    />
  );
};

export default FormWidget;
