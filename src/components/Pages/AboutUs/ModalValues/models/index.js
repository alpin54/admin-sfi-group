// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSubmit = async (formData, method) => {
  return await httpRequest({
    method: method,
    url: ENDPOINT.ABOUT_VALUES,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const modalValuesModel = {
  submit: handleSubmit
};

export default modalValuesModel;
