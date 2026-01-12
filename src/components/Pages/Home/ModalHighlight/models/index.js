// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSubmit = async (formData) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.HOME_HIGHLIGHTS,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const modalHighlightModel = {
  submit: handleSubmit
};

export default modalHighlightModel;
