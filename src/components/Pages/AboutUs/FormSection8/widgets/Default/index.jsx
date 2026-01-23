// --library
import { useState, useCallback, useMemo } from 'react';

// -- models
import aboutUsBannerModel from '@components/Pages/AboutUs/FormSection8/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormAboutUsSection8View from '@components/Pages/AboutUs/FormSection8/views';

// -- data
import data from '@components/Pages/AboutUs/FormSection8/data';

const FormAboutUsSection8Widget = (props) => {
  const fetcParams = useMemo(() => ({}), []);

  // const fetcher = useCallback(() => aboutUsBannerModel.list(fetcParams), [fetcParams]);

  // const { data, ready, refetch } = useFirstLoad(fetcher);

  const handlePublish = async (payload) => {
    // const { error: errorPublish } = await aboutUsBannerModel.publish(payload);
    // if (!errorPublish) {
    //   refetch();
    //   return { error: null };
    // } else {
    //   return {
    //     error: errorPublish?.message
    //   };
    // }
  };

  const handleStatus = async (payload) => {
    // const { error: errorStatus } = await aboutUsBannerModel.status(payload);
    // if (!errorStatus) {
    //   refetch();
    //   return { error: null };
    // } else {
    //   return {
    //     error: errorStatus?.message
    //   };
    // }
  };

  const handleDelete = async (id) => {
    // const { error: errorDelete } = await AboutUsBannerModel.delete(id);
    // if (!errorDelete) {
    //   refetch();
    //   return { error: null };
    // } else {
    //   return {
    //     error: errorDelete?.message
    //   };
    // }
  };

  return (
    <FormAboutUsSection8View
      {...props}
      data={data}
      loading={false}
      onPublish={handlePublish}
      onDelete={handleDelete}
      onStatus={handleStatus}
      // refetch={refetch}
    />
  );
};

export default FormAboutUsSection8Widget;
