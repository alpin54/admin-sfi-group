// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSubmit = async (formData, method) => {
  return await httpRequest({
    method: method,
    url: ENDPOINT.SIGNINBANNER,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const modalSignInBannerModel = {
  submit: handleSubmit
};

export default modalSignInBannerModel;
