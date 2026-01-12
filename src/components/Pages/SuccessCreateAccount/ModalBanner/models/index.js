// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSubmit = async (formData, method) => {
  return await httpRequest({
    method: method,
    url: ENDPOINT.SUCCESSCREATEBANNER,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const modalSuccessCreateAccountModel = {
  submit: handleSubmit
};

export default modalSuccessCreateAccountModel;
