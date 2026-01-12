// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const HandleCareerSingle = async (id) => {
  return await httpRequest({
    method: 'get',
    url: `${ENDPOINT.CAREERS}/${id}`
  });
};

const handleSubmit = async (payload, method) => {
  return await httpRequest({
    method: method,
    url: ENDPOINT.CAREERS,
    data: payload
  });
};

const handleWorkplaceTypesList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.CAREERS_WORKPLACE_TYPES
  });
};

const handleJobTypeList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.CAREERS_JOB_TYPE
  });
};

const formCareerModel = {
  single: HandleCareerSingle,
  submit: handleSubmit,
  workplaceTypesList: handleWorkplaceTypesList,
  jobTypeList: handleJobTypeList
};

export default formCareerModel;
