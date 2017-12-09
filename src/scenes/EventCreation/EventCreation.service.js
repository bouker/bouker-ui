import axios from 'axios';
const api = require('../../config.json')['api'];

export function createEvent(body, callback) {
  axios.post(api['events'], body)
    .then(res => {
      callback(res);
    })
    .catch(error => {
      console.error(error);
      callback(error);
    });
}