import { MissingAttributeError } from './Utils.errors';


export function checkAndSetFactory(state, props) {
  return (attr) => {
    if (!(attr in props)) {
      throw new MissingAttributeError('No attribute ' + attr);
    } else {
      state[attr] = props[attr];
    }
  }
}