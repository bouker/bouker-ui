import axios from 'axios';
import { api } from '../../api';
import { logger } from '../../logging/LoggingService';

export function createEvent(body, callback) {
  axios.post(api['events'] + 'events', body)
    .then(res => {
      logger.debug('Event ' + body['name'] + ' has been created successfully');
      callback(res.data);
    })
    .catch(error => {
      logger.error('[UI | event creation | ' + body['name'] + ']: ' + error);
      callback([]);
    });
}