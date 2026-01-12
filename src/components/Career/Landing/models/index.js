// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async (params) => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.CAREERS,
    params: params
  });
};

const handleSummaryCareer = async (params) => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.CAREERS_SUMMARY,
    params: params
  });
};

const handleSummaryApplication = async (params) => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.CAREERS_APPLY_SUMMARY,
    params: params
  });
};

const handleJobTypeList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.CAREERS_JOB_TYPE
  });
};

const handleSuspend = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.CAREERS,
    data: payload
  });
};

const handleDelete = async (id) => {
  return await httpRequest({
    method: 'delete',
    url: ENDPOINT.CAREERS,
    data: {
      id
    }
  });
};

const careerModel = {
  list: handleList,
  summaryCareer: handleSummaryCareer,
  summaryApplication: handleSummaryApplication,
  jobTypeList: handleJobTypeList,
  suspend: handleSuspend,
  delete: handleDelete
};

export default careerModel;
