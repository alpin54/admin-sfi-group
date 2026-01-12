// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.ABOUT_OUR_MISSION
  });
};

const handlePublish = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.ABOUT_OUR_MISSION,
    data: payload
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.ABOUT_OUR_MISSION,
    data: payload
  });
};

const aboutMissionModel = {
  single: handleSingle,
  publish: handlePublish,
  submit: handleSubmit
};

export default aboutMissionModel;
