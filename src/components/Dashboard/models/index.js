// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleWidgetOrder = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.DASHBOARD_WIDGET_ORDER
  });
};

const handleChartWeekly = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.DASHBOARD_CHART_WEEKLY
  });
};

const handleRecentOrder = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.DASHBOARD_RECENT_ORDER
  });
};

const handleTopMember = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.DASHBOARD_TOP_MEMBER
  });
};

const handleTopProduct = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.DASHBOARD_TOP_PRODUCT
  });
};

const handleTopPage = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.DASHBOARD_TOP_PAGE
  });
};

const handleChartCustomer = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.DASHBOARD_CHART_CUSTOMER
  });
};

const dashboardModel = {
  widgetOrder: handleWidgetOrder,
  chartWeekly: handleChartWeekly,
  recentOrder: handleRecentOrder,
  topMember: handleTopMember,
  topProduct: handleTopProduct,
  topPage: handleTopPage,
  chartCustomer: handleChartCustomer
};

export default dashboardModel;
