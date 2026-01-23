// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async (params) => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.PRODUCTS,
    params: params
  });
};

const modalProductModel = {
  list: handleList
};

export default modalProductModel;
