// -- libraries
import { useCallback } from 'react';

// -- components
import DashboardView from '@components/Dashboard/views';

// -- models
import dashboardModel from '@components/Dashboard/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- data
import data from '@components/Dashboard/data';

const DashboardWidget = () => {
  // const { data: widgetOrderData } = useFirstLoad(useCallback(() => dashboardModel.widgetOrder(), []));
  // const { data: chartWeeklyData } = useFirstLoad(useCallback(() => dashboardModel.chartWeekly(), []));
  // const { data: recentOrderData } = useFirstLoad(useCallback(() => dashboardModel.recentOrder(), []));
  // const { data: topMemberData } = useFirstLoad(useCallback(() => dashboardModel.topMember(), []));
  // const { data: topProductData } = useFirstLoad(useCallback(() => dashboardModel.topProduct(), []));
  // const { data: topPageData } = useFirstLoad(useCallback(() => dashboardModel.topPage(), []));
  // const { data: chartCustomerData } = useFirstLoad(useCallback(() => dashboardModel.chartCustomer(), []));

  return (
    <DashboardView
      widgetOrderData={data.widgetOrder}
      chartWeeklyData={data.chartWeakly}
      recentOrderData={data.recentOrder}
      topMemberData={data.topMember}
      topDealerData={data.topDealer}
      topProductData={data.topProduct}
      topPageData={data.topPages}
      chartCustomerData={data.chartCustomer}
      data={data}
    />
  );
};

export default DashboardWidget;
