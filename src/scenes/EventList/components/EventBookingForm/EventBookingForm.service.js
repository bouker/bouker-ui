import axios from 'axios';
const api = require('../../../../config.json')['api'];

export function bookEvent(body, callback) {
  axios.post(api['booking'], body)
    .then(res => {
      callback(res);
    })
    .catch(error => {
      console.error(error);
      callback(error);
    });
}