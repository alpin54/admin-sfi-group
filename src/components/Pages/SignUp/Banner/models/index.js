// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.SIGNUPBANNER
  });
};

const handleDelete = async (id) => {
  return await httpRequest({
    method: 'delete',
    url: ENDPOINT.SIGNUPBANNER,
    data: {
      id
    }
  });
};

const handleStatus = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.SIGNUPBANNER,
    data: payload
  });
};

const newPasswordBannerModel = {
  list: handleList,
  delete: handleDelete,
  status: handleStatus
};

export default newPasswordBannerModel;
