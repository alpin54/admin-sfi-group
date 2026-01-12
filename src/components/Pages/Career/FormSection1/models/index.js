// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.CAREER_TITLE
  });
};

const handlePublish = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.CAREER_TITLE,
    data: payload
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.CAREER_TITLE,
    data: payload
  });
};

const careerTitleModel = {
  single: handleSingle,
  publish: handlePublish,
  submit: handleSubmit
};

export default careerTitleModel;
