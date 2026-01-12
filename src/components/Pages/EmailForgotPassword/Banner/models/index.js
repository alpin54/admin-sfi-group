// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.SENDINSTRUCTIONSBANNER
  });
};

const handleDelete = async (id) => {
  return await httpRequest({
    method: 'delete',
    url: ENDPOINT.SENDINSTRUCTIONSBANNER,
    data: {
      id
    }
  });
};

const handleStatus = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.SENDINSTRUCTIONSBANNER,
    data: payload
  });
};

const sendEmailBannerModel = {
  list: handleList,
  delete: handleDelete,
  status: handleStatus
};

export default sendEmailBannerModel;
