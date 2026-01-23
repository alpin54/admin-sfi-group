// --library
import { useState, useCallback, useMemo } from 'react';

// -- models
import aboutUsBannerModel from '@components/Pages/AboutUs/FormSection6/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FormAboutUsSection6View from '@components/Pages/AboutUs/FormSection6/views';

// -- data
import data from '@components/Pages/AboutUs/FormSection6/data';

const FormAboutUsSection6Widget = (props) => {
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
    <FormAboutUsSection6View
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

export default FormAboutUsSection6Widget;
