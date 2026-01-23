// --library
import { useState, useCallback } from 'react';

// -- models
import formCareerModel from '@components/Career/Form/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import CareerFormView from '@components/Career/Form/views';
import dataDummy from '@components/Career/Form/data';

const CareerFormWidget = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // const { data } = useFirstLoad(
  //   useCallback(() => (props.slug ? formCareerModel.single(props.slug) : []), [props.slug])
  // );

  // // fetch workplace types
  // const { data: workplaceData } = useFirstLoad(useCallback(() => formCareerModel.workplaceTypesList(), []));

  // // fetch job types
  // const { data: jobTypeData } = useFirstLoad(useCallback(() => formCareerModel.jobTypeList(), []));

  const handleSubmit = async (payload, method) => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await formCareerModel.submit(payload, method);

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
    <CareerFormView
      slug={props.slug ?? null}
      action={props.action ?? null}
      data={props.slug ? (dataDummy?.careers?.[0] ?? null) : null}
      summaryCareer={dataDummy?.summaryCareer}
      summaryApplication={dataDummy?.summaryApplication}
      categoryWorkplaceOptions={dataDummy?.employmentStatus ?? []}
      categoryJobTypeOptions={dataDummy?.workplaceTypes ?? []}
      loading={loading}
      message={message}
      onSubmit={handleSubmit}
    />
  );
};

export default CareerFormWidget;
