// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSubmit = async (payload, method) => {
  return await httpRequest({
    method: method,
    url: ENDPOINT.CONTACT_US_ITEM,
    data: payload
  });
};

const modalContactUsModel = {
  submit: handleSubmit
};

export default modalContactUsModel;
