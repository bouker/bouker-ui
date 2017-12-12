import axios from 'axios';
import { api } from '../../api';


export function createEvent(body, callback) {
  axios.post(api['events'] + 'events', body)
    .then(res => {
      console.log(res);
      callback(res);
    })
    .catch(error => {
      console.error(error);
      callback(error);
    });
}