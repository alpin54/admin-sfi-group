// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async (params = {}, id) => {
  const queryParams = { ...params };
  const url = id ? `${ENDPOINT.CAREERS_APPLY}/${id}` : ENDPOINT.CAREERS_APPLY;

  return await httpRequest({
    method: 'get',
    url,
    params: queryParams
  });
};

const handleSummary = async (paramsOrId, maybeId) => {
  // Support two signatures: (id) or (params, id)
  let params = null;
  let id = null;

  if (paramsOrId && typeof paramsOrId === 'object' && !Array.isArray(paramsOrId)) {
    params = paramsOrId;
    id = maybeId;
  } else {
    id = paramsOrId;
  }

  const url = id ? `${ENDPOINT.CAREERS_APPLY_SUMMARY}/${id}` : `${ENDPOINT.CAREERS_APPLY_SUMMARY}`;
  return await httpRequest({
    method: 'get',
    url,
    params: params ? { ...params } : undefined
  });
};

const handleSelected = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.CAREERS_APPLY,
    data: payload
  });
};

const handleDelete = async (id) => {
  return await httpRequest({
    method: 'delete',
    url: ENDPOINT.CAREERS_APPLY,
    data: {
      id
    }
  });
};

const careerModel = {
  list: handleList,
  summary: handleSummary,
  selected: handleSelected,
  delete: handleDelete
};

export default careerModel;
