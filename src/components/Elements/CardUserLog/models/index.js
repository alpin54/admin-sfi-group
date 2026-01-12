// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async (id) => {
  return await httpRequest({
    method: 'get',
    url: `${ENDPOINT.USERS}/${id}`
  });
};

const cardUserLogModel = {
  single: handleSingle
};

export default cardUserLogModel;
