// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async (params) => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.ORDERS,
    params: params
  });
};

const handleSummary = async (params) => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.ORDER_SUMMARY,
    params: params
  });
};

const handleDelete = async (payload) => {
  return await httpRequest({
    method: 'delete',
    url: ENDPOINT.ORDERS,
    data: payload
  });
};

const orderModel = {
  list: handleList,
  summary: handleSummary,
  delete: handleDelete
};

export default orderModel;
