// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSubmit = async (payload, method) => {
  return await httpRequest({
    method: method,
    url: ENDPOINT.USERS,
    data: payload
  });
};

const modalAdminModel = {
  submit: handleSubmit
};

export default modalAdminModel;
