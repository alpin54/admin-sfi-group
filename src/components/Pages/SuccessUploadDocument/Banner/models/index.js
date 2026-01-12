// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.VERIFICATIONEMAILBANNER
  });
};

const handleDelete = async (id) => {
  return await httpRequest({
    method: 'delete',
    url: ENDPOINT.VERIFICATIONEMAILBANNER,
    data: {
      id
    }
  });
};

const handleStatus = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.VERIFICATIONEMAILBANNER,
    data: payload
  });
};

const verificationEmailBannerModel = {
  list: handleList,
  delete: handleDelete,
  status: handleStatus
};

export default verificationEmailBannerModel;
