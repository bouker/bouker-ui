import { MissingAttributeError } from './Utils.errors';
import moment from 'moment';


export function checkAndSetFactory(state, props) {
  return (attr) => {
    if (!(attr in props)) {
      throw new MissingAttributeError('No attribute ' + attr);
    } else {
      state[attr] = props[attr];
    }
  }
}

export function handleStateChangeFactory(target, attr) {
  return (event) => {
    let update = {};
    update[attr] = event.target.value;
    target.setState(update);
  };
}

export function prepareReqBody(obj) {
  let body = Object.assign({}, obj);
  for (let key in body) {
    if (key.toLowerCase().endsWith('time')) {
      body[key] = moment(body[key]).toJSON();
    }
  }
  return body;
}