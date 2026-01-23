// -- libraries
import { useCallback, useMemo, useState } from 'react';

// -- models
import rewardFeatureModel from '@components/Dealer/Reward/Feature/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import FeatureRewardView from '@components/Dealer/Reward/Feature/views';

// -- data
import dummyData from '@components/Dealer/Reward/Feature/data';

const FeatureRewardWidget = (props) => {
  // const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  // // Combine parameters for API
  // const fetchParams = useMemo(
  //   () => ({ page: pagination.page, limit: pagination.limit }),
  //   [pagination.page, pagination.limit]
  // );
  // // Create a dynamic fetcher, depending on parameters
  // const fetcher = useCallback(() => rewardFeatureModel.list(fetchParams), [fetchParams]);

  // // Hook to fetch data and refetch
  // const { ready, data, refetch } = useFirstLoad(fetcher);

  // // Handle delete then refetch
  const handleDelete = async (id) => {
    // const { error: errorDelete } = await rewardFeatureModel.delete(id);
    // if (!errorDelete) {
    //   refetch();
    //   return { error: null };
    // } else {
    //   return {
    //     error: errorDelete?.message
    //   };
    // }
  };

  // Handle status then refetch
  const handleStatus = async (payload) => {
    // const { error: errorStatus } = await rewardFeatureModel.status(payload);
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
    <FeatureRewardView
      {...props}
      data={dummyData}
      loading={false}
      onDelete={handleDelete}
      onStatus={handleStatus}
      refetch={() => {}}
    />
  );
};

export default FeatureRewardWidget;
