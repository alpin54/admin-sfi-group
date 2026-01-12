// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSubmit = async (payload, method) => {
  return await httpRequest({
    method: method,
    url: ENDPOINT.CAREERS_JOB_TYPE,
    data: payload
  });
};

const modalJobTypeModel = {
  submit: handleSubmit
};

export default modalJobTypeModel;
