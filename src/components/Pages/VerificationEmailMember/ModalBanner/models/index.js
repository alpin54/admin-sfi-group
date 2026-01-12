// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSubmit = async (formData, method) => {
  return await httpRequest({
    method: method,
    url: ENDPOINT.VERIFICATIONEMAILBANNER,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const modalVerificationEmailBannerModel = {
  submit: handleSubmit
};

export default modalVerificationEmailBannerModel;
