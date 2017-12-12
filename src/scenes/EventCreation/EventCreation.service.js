import axios from 'axios';
import { api } from '../../api';


export function createEvent(body, callback) {
  axios.post(api['events'] + 'events', body)
    .then(res => {
      callback(res.data);
    })
    .catch(error => {
      console.error(error);
      callback([]);
    });
}