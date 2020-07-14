import axios from 'axios';
import * as Config from './Config';

export default function callApi(endpoint, method, body) {
  // if (body) {
  //   body.data.newTime = new Date().getTime();
  //   console.log(body.data);
  // }
  return axios({
    method: method,
    url: `${Config.API_URL}/${endpoint}`,
    data: body
  }).catch(err => {
    console.log(err);
  });
}; 