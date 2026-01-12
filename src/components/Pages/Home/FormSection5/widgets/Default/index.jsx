// -- libraries
import { useCallback } from 'react';

// -- models
import formHomeSection5Model from '@components/Pages/Home/FormSection5/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormHomeSection5View from '@components/Pages/Home/FormSection5/views';

// -- data
// import data from '@components/Pages/Home/FormSection5/data';

const FormHomeSection5Widget = (props) => {
  // Only fetch role data if slug exists
  const { data, ready, refetch } = useFirstLoad(useCallback(() => formHomeSection5Model.list(), []));

  // Handle publish then refetch
  const handlePublish = async (payload) => {
    const { error: errorPublish } = await formHomeSection5Model.publish(payload);
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
    const { error: errorStatus } = await formHomeSection5Model.status(payload);
    if (!errorStatus) {
      refetch();
      return { error: null };
    } else {
      return {
        error: errorStatus?.message
      };
    }
  };

  return (
    <FormHomeSection5View
      {...props}
      data={data?.data}
      loading={!ready}
      onPublish={handlePublish}
      onStatus={handleStatus}
      refetch={refetch}
    />
  );
};

export default FormHomeSection5Widget;
