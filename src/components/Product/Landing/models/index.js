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

const handleCategoryList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.PRODUCT_CATEGORIES
  });
};

const handleDelete = async (id) => {
  return await httpRequest({
    method: 'delete',
    url: ENDPOINT.PRODUCTS,
    data: {
      id
    }
  });
};

const handleStatus = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.PRODUCTS,
    data: payload,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const productModel = {
  list: handleList,
  categoryList: handleCategoryList,
  delete: handleDelete,
  status: handleStatus
};

export default productModel;
