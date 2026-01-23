// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async (params) => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.FORM_SUBMISSION,
    params: params
  });
};

const handleDelete = async (id) => {
  return await httpRequest({
    method: 'delete',
    url: ENDPOINT.FORM_SUBMISSION,
    data: {
      id
    }
  });
};

const handleSelected = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.FORM_SUBMISSION,
    data: payload
  });
};

const handleSummary = async (params) => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.FORM_SUBMISSION_SUMMARY,
    params: params
  });
};

const formSubmissionModel = {
  list: handleList,
  delete: handleDelete,
  summary: handleSummary,
  selected: handleSelected
};

export default formSubmissionModel;
