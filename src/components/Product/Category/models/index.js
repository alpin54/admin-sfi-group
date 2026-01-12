// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.PRODUCT_CATEGORIES_TREE
  });
};

const handleDelete = async (type, id) => {
  return await httpRequest({
    method: 'delete',
    url: type === 'category' ? ENDPOINT.PRODUCT_CATEGORIES : ENDPOINT.PRODUCT_SUB_CATEGORIES,
    data: {
      id
    }
  });
};

const handleStatus = async (type, payload) => {
  return await httpRequest({
    method: 'put',
    url: type === 'category' ? ENDPOINT.PRODUCT_CATEGORIES : ENDPOINT.PRODUCT_SUB_CATEGORIES,
    data: payload,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const categoryModel = {
  list: handleList,
  delete: handleDelete,
  status: handleStatus
};

export default categoryModel;
