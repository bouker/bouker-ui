import { api } from '../api';
import axios from 'axios';

const loggerUrl = api['logging'];
const severityToLevel = {
  'fatal': 0,
  'error': 1,
  'warn': 2,
  'info': 3,
  'debug': 4,
  'unknown': 5
}
const loggerFactory = (severity) => {
  let bodyTemplate = {
    'level': severityToLevel[severity],
    'facility': 'bouker-ui'
  };
  return (message) => {
    let body = Object.assign(bodyTemplate);
    body['short_message'] = '' + message;
    body['full_message'] = '' + message;
    axios.post(loggerUrl, body)
      .then(res => {})
      .catch(error => {
        console.error('Couldn\'t save a log message ' + error);
      });
  }
}

export const logger = {}
for (let severity of ['info', 'debug', 'unknown']) {
  logger[severity] = loggerFactory(severity);
}
for (let severity of ['warn', 'error']) {
  let logFun = loggerFactory(severity);
  logger[severity] = (message) => {
    console.error(message);
    logFun(message);
  };
}