// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async (params) => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.SHIPPING,
    params: params
  });
};

const modalShippingModel = {
  list: handleList
};

export default modalShippingModel;
