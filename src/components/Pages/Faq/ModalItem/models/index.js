// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSubmit = async (formData, method) => {
  return await httpRequest({
    method: method,
    url: ENDPOINT.FAQ_ITEM,
    data: formData
  });
};

const modalFaqModel = {
  submit: handleSubmit
};

export default modalFaqModel;
