import axios from 'axios';
import {BASE_URI} from './pathMap';

const instance = axios.create({
  baseURL: BASE_URI,
});

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
};
// instance.interceptors.request.use(
//   response => {
//     return response;
//   },
//   error => {},
// );

export const getData = async (path, ...params) => {
  let url = path;
  if (params) {
    let filter = params.join('/');
    url += filter;
  }
  const query = await instance.get(url);
  const result = await query.data;
  if (result.status == 200) {
    return result.data;
  } else {
    return null;
  }
};
