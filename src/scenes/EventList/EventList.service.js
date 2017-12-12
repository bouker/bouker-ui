import axios from 'axios';
import { api } from '../../api';

export function loadEvents(callback) {
  axios.get(api['events'] + 'events')
  .then(res => {
    callback(res);
  })
  .catch(error => {
    callback([]);
  });
}
