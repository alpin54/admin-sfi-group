// -- libraries
import { useState } from 'react';

// -- models
import modalCategoryModel from '@components/Product/ModalCategory/models';

// -- components
import CategoryModalView from '@components/Product/ModalCategory/views';

const CategoryModalWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle submit
  const handleSubmit = async (formData, method, type) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await modalCategoryModel.submit(formData, method, type);

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

  return <CategoryModalView {...props} onSubmit={handleSubmit} loading={loading} message={message} />;
};

export default CategoryModalWidget;
