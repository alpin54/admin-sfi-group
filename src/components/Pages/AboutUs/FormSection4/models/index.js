// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.CAREER_BANNER
  });
};

const handleDelete = async (id) => {
  return await httpRequest({
    method: 'delete',
    url: ENDPOINT.CAREER_BANNER,
    data: {
      id
    }
  });
};

const handleStatus = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.CAREER_BANNER,
    data: payload
  });
};

const careerBannerModel = {
  list: handleList,
  delete: handleDelete,
  status: handleStatus
};

export default careerBannerModel;
