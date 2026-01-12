// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.SUCCESSCREATEBANNER
  });
};

const handleDelete = async (id) => {
  return await httpRequest({
    method: 'delete',
    url: ENDPOINT.SUCCESSCREATEBANNER,
    data: {
      id
    }
  });
};

const handleStatus = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.SUCCESSCREATEBANNER,
    data: payload
  });
};

const successCreateBannerModel = {
  list: handleList,
  delete: handleDelete,
  status: handleStatus
};

export default successCreateBannerModel;
