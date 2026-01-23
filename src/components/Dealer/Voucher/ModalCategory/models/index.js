// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async (params) => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.PRODUCT_CATEGORIES,
    params: params
  });
};

const modalCategoryModel = {
  list: handleList
};

export default modalCategoryModel;
