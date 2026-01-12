// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSingle = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.ABOUT_OUR_VALUES
  });
};

const handlePublish = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.ABOUT_OUR_VALUES,
    data: payload
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.ABOUT_OUR_VALUES,
    data: payload
  });
};

const handleStatus = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.ABOUT_VALUES,
    data: payload,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const handleDelete = async (id) => {
  return await httpRequest({
    method: 'delete',
    url: ENDPOINT.ABOUT_VALUES,
    data: {
      id
    }
  });
};

const aboutValuesModel = {
  single: handleSingle,
  publish: handlePublish,
  submit: handleSubmit,
  status: handleStatus,
  delete: handleDelete
};

export default aboutValuesModel;
