// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async (id) => {
  return await httpRequest({
    method: 'get',
    url: `${ENDPOINT.HOME_BANNER}/${id}`
  });
};

const handleSubmit = async (formData, method) => {
  return await httpRequest({
    method: method,
    url: ENDPOINT.HOME_BANNER,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const homeBannerModel = {
  single: handleSingle,
  submit: handleSubmit
};

export default homeBannerModel;
