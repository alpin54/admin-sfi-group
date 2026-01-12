// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.PRODUCT_COLORS
  });
};

const handleDelete = async (id) => {
  return await httpRequest({
    method: 'delete',
    url: ENDPOINT.PRODUCT_COLORS,
    data: { id }
  });
};

const handleStatus = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.PRODUCT_COLORS,
    data: payload
  });
};

const colorModel = {
  list: handleList,
  delete: handleDelete,
  status: handleStatus
};

export default colorModel;
