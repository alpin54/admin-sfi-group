// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.ABOUT_SECTION_DESCRIPTION
  });
};

const handlePublish = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.ABOUT_SECTION_DESCRIPTION,
    data: payload,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.ABOUT_SECTION_DESCRIPTION,
    data: payload,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const aboutSectionDescriptionModel = {
  single: handleSingle,
  publish: handlePublish,
  submit: handleSubmit
};

export default aboutSectionDescriptionModel;
