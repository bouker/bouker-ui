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
    'severity': severity,
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
for (let severity in severityToLevel) {
  let logFun = loggerFactory(severity);
  let consoleFun = (severity in console) ? console[severity] : console.error;
  logger[severity] = (message) => {
    consoleFun(message);
    logFun(message);
  };
}