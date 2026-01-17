// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleDetail = async (slug) => {
  return await httpRequest({
    method: 'get',
    url: `${ENDPOINT.MEMBER}/${slug}`
  });
};

const handleOrderList = async (params) => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.ORDERS,
    params: params
  });
};

const handleOrderDelete = async (payload) => {
  return await httpRequest({
    method: 'delete',
    url: ENDPOINT.ORDERS,
    data: payload
  });
};

const memberModel = {
  detail: handleDetail,
  orderList: handleOrderList,
  orderDelete: handleOrderDelete
};

export default memberModel;
