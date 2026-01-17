// -- libraries
import { useCallback } from 'react';

// -- models
import formFaqSection3Model from '@components/Pages/Faq/FormSection3/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormFaqSection3View from '@components/Pages/Faq/FormSection3/views';

// -- data
import data from '@components/Pages/Faq/FormSection3/data';

const FormFaqSection3Widget = (props) => {
  // Only fetch role data if slug exists
  // const { data, ready, refetch } = useFirstLoad(useCallback(() => formFaqSection3Model.list(), []));

  // Handle delete then refetch
  const handleDelete = async (id) => {
    // const { error: errorDelete } = await formFaqSection3Model.delete(id);
    // if (!errorDelete) {
    //   refetch();
    //   return { error: null };
    // } else {
    //   return {
    //     error: errorDelete?.message
    //   };
    // }
  };

  // Handle Status then refetch
  const handleStatus = async (payload) => {
    // const { error: errorStatus } = await formFaqSection3Model.status(payload);
    // if (!errorStatus) {
    //   refetch();
    //   return { error: null };
    // } else {
    //   return {
    //     error: errorStatus?.message
    //   };
    // }
  };

  return (
    <FormFaqSection3View
      {...props}
      data={data}
      ready={false}
      onDelete={handleDelete}
      onStatus={handleStatus}
      // refetch={refetch}
    />
  );
};

export default FormFaqSection3Widget;
