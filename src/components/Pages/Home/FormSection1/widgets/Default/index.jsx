// -- libraries
import { useCallback } from 'react';

// -- models
import formHomeSection1Model from '@components/Pages/Home/FormSection1/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormHomeSection1View from '@components/Pages/Home/FormSection1/views';

// -- data
import data from '@components/Pages/Home/FormSection1/data';

const FormHomeSection1Widget = (props) => {
  // Only fetch role data if slug exists
  const { data, ready, refetch } = useFirstLoad(useCallback(() => formHomeSection1Model.list(), []));

  // Handle publish then refetch
  const handlePublish = async (payload) => {
    const { error: errorPublish } = await formHomeSection1Model.publish(payload);
    if (!errorPublish) {
      refetch();
      return { error: null };
    } else {
      return {
        error: errorPublish?.message
      };
    }
  };

  // Handle Status then refetch
  const handleStatus = async (payload) => {
    const { error: errorStatus } = await formHomeSection1Model.status(payload);
    if (!errorStatus) {
      refetch();
      return { error: null };
    } else {
      return {
        error: errorStatus?.message
      };
    }
  };

  // Handle delete then refetch
  const handleDelete = async (id) => {
    const { error: errorDelete } = await formHomeSection1Model.delete(id);
    if (!errorDelete) {
      refetch();
      return { error: null };
    } else {
      return {
        error: errorDelete?.message
      };
    }
  };

  return (
    <FormHomeSection1View
      {...props}
      data={data?.data}
      loading={!ready}
      onPublish={handlePublish}
      onStatus={handleStatus}
      onDelete={handleDelete}
    />
  );
};

export default FormHomeSection1Widget;
