import axios from 'axios';
import { api } from '../../api';
import { logger } from '../../logging/LoggingService';

export function loadEvents(callback) {
  axios.get(api['events'] + '/events')
  .then(res => {
    callback(res.data);
  })
  .catch(error => {
    logger.error('[UI | event list]: ' + error)
    callback([]);
  });
}
