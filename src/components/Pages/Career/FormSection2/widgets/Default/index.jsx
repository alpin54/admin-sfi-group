// --library
import { useState, useCallback, useMemo } from 'react';

// -- models
import careerBannerModel from '@components/Pages/Career/FormSection2/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormCareerSectionView from '@components/Pages/Career/FormSection2/views';

const FormCareerSection2Widget = (props) => {
  const fetcParams = useMemo(() => ({}), []);

  const fetcher = useCallback(() => careerBannerModel.list(fetcParams), [fetcParams]);

  const { data, ready, refetch } = useFirstLoad(fetcher);

  const handleStatus = async (payload) => {
    const { error: errorStatus } = await careerBannerModel.status(payload);
    if (!errorStatus) {
      refetch();
      return { error: null };
    } else {
      return {
        error: errorStatus?.message
      };
    }
  };

  const handleDelete = async (id) => {
    const { error: errorDelete } = await careerBannerModel.delete(id);
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
    <FormCareerSectionView
      {...props}
      data={data?.data}
      loading={!ready}
      onDelete={handleDelete}
      onStatus={handleStatus}
      refetch={refetch}
    />
  );
};

export default FormCareerSection2Widget;
