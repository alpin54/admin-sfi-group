// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.EMAIL_TEMPLATE
  });
};

const emailLandingModel = {
  list: handleList
};

export default emailLandingModel;
