// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.ABOUT_OUR_STORY
  });
};

const handlePublish = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.ABOUT_OUR_STORY,
    data: payload
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.ABOUT_OUR_STORY,
    data: payload,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const aboutOurStoryModel = {
  single: handleSingle,
  publish: handlePublish,
  submit: handleSubmit
};

export default aboutOurStoryModel;
