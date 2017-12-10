import moment from 'moment';
import * as utils from './Utils';


describe('checkAndSetFactory', () => {
  let state = {};
  let props = {};
  let setter = {};

  beforeEach(() => {
    state = {};
    props = { 'attr': 0 };
    setter = utils.checkAndSetFactory(state, props);
  });

  it('should update attribute', () => {
    setter('attr');
    expect(state['attr']).toEqual(props['attr']);
  });

  it('should throw exception when attr missing', () => {
    expect(() => {
      setter('missing');
    }).toThrow();
  });
});

describe('prepareReqBody', () => {
  let state = {};
  beforeEach(() => {
     state = {
      name: 'default',
      startTime: moment().add(1, 'days'),
      endTime:  moment().add(2, 'days')
    };
  });

  it('should change date format to ISO', () => {
    let body = utils.prepareReqBody(state);
    expect(moment(body['startTime'], moment.ISO_8601).isValid()).toEqual(true);
  });

  it('should copy value and not reference', () => {
    let body = utils.prepareReqBody(state);
    body['name'] = 'changed';
    expect(body['name']).not.toEqual(state['name']);
  });
});