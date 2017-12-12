import axios from 'axios';
import { api } from '../../../../api';

export function bookEvent(body, callback) {
  axios.post(api['booking'] + 'booking', body)
    .then(res => {
      callback(res);
    })
    .catch(error => {
      console.error(error);
      callback(error);
    });
}