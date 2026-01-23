// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async (params) => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.USER_LOG,
    params: params
  });
};

const userLogModel = {
  list: handleList
};

export default userLogModel;
