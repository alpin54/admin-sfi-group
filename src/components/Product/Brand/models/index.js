// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.PRODUCT_MATERIALS
  });
};

const handleDelete = async (id) => {
  return await httpRequest({
    method: 'delete',
    url: ENDPOINT.PRODUCT_MATERIALS,
    data: {
      id
    }
  });
};

const handleStatus = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.PRODUCT_MATERIALS,
    data: payload
  });
};

const materialModel = {
  list: handleList,
  delete: handleDelete,
  status: handleStatus
};

export default materialModel;
