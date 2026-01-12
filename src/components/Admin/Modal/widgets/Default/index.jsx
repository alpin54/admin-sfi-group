// -- libraries
import { useState } from 'react';

// -- models
import modelAdminModel from '@components/Admin/Modal/models';

// -- components
import AdminModalView from '@components/Admin/Modal/views';

const AdminModalWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (formData, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await modelAdminModel.submit(formData, method);

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

  return <AdminModalView {...props} onSubmit={handleSubmit} loading={loading} message={message} />;
};

export default AdminModalWidget;
