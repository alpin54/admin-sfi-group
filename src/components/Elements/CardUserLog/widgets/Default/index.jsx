// -- libraries
import { useCallback } from 'react';

// -- models
import cardUserLogModel from '@components/Elements/CardUserLog/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- views
import CardUserLogView from '@components/Elements/CardUserLog/views';

const CardUserLogWidgets = (props) => {
  const { created_by, updated_by } = props;
  // Fetch user log data
  const { data: createdData } = useFirstLoad(
    useCallback(() => (created_by ? cardUserLogModel.single(created_by) : []), [created_by])
  );

  // Fetch user log data
  const { data: updatedData } = useFirstLoad(
    useCallback(() => (updated_by ? cardUserLogModel.single(updated_by) : []), [updated_by])
  );

  return <CardUserLogView {...props} createdData={createdData?.data || null} updatedData={updatedData?.data || null} />;
};

export default CardUserLogWidgets;
