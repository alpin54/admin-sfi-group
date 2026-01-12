// --- library
import axios from 'axios';

// --- utils
import LocalStorage from '@utils/localStorage';

// --- httpRequest
const httpRequest = async (param) => {
  let config = { ...param };
  const user = LocalStorage.get('user');
  const token = user ? user.token : null;
  const header = token
    ? {
        headers: {
          ...param.headers,
          Authorization: 'Bearer ' + token
        }
      }
    : param.headers;

  config = {
    ...param,
    ...header
  };

  return await axios(config)
    .then((response) => {
      return { data: response.data, ready: true, error: false };
    })
    .catch((error) => {
      if (error.response !== undefined) {
        return {
          data: null,
          ready: false,
          error: {
            status: error.response.status,
            type: error.name,
            message: error.response?.data?.errors ? error.response.data.errors : error.message
          }
        };
      } else {
        return {
          data: null,
          ready: false,
          error: {
            status: 410,
            type: 'Gone',
            message: 'The requested resource is no longer available at the server.'
          }
        };
      }
    });
};

export default httpRequest;
