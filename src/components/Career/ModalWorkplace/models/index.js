// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSubmit = async (payload, method) => {
  return await httpRequest({
    method: method,
    url: ENDPOINT.CAREERS_WORKPLACE_TYPES,
    data: payload
  });
};

const modalWorkplaceModel = {
  submit: handleSubmit
};

export default modalWorkplaceModel;
