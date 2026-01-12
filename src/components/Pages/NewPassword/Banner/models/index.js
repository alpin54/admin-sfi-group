// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.NEWPASSWORDBANNER
  });
};

const handleDelete = async (id) => {
  return await httpRequest({
    method: 'delete',
    url: ENDPOINT.NEWPASSWORDBANNER,
    data: {
      id
    }
  });
};

const handleStatus = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.NEWPASSWORDBANNER,
    data: payload
  });
};

const newPasswordBannerModel = {
  list: handleList,
  delete: handleDelete,
  status: handleStatus
};

export default newPasswordBannerModel;
