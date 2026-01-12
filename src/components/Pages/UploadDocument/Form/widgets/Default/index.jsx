// -- libraries
import { useState, useCallback } from 'react';

// -- models
import uploadDocumentFormModel from '@components/Pages/UploadDocument/Form/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormUploadDocumentView from '@components/Pages/UploadDocument/Form/views';

// -- data
import data from '@components/Pages/UploadDocument/Form/data';

const FormUploadDocumentWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Only fetch form data if slug exists
  // const { data, ready, refetch } = useFirstLoad(useCallback(() => uploadDocumentFormModel.single(), []));

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      // const { data, error } = await uploadDocumentFormModel.submit(formData, method);
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
    <FormUploadDocumentView
      {...props}
      data={data}
      ready={true}
      loading={loading}
      message={message}
      onSubmit={handleSubmit}
    />
  );
};

export default FormUploadDocumentWidget;
