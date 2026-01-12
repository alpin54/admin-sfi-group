// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.FORGOTBANNER
  });
};

const handleDelete = async (id) => {
  return await httpRequest({
    method: 'delete',
    url: ENDPOINT.FORGOTBANNER,
    data: {
      id
    }
  });
};

const handleStatus = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.FORGOTBANNER,
    data: payload
  });
};

const forgotPasswordBannerModel = {
  list: handleList,
  delete: handleDelete,
  status: handleStatus
};

export default forgotPasswordBannerModel;
