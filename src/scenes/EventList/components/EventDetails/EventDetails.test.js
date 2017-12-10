import React from 'react';
import { shallow } from 'enzyme';
import EventDetails from './EventDetails';
import moment from 'moment';


const validStartTime = moment().add(5, 'days');
const validEndTime = validStartTime.clone().add(5, 'hours');
const props = {
  id: '1',
  name: 'TestName',
  description: 'TestDescription',
  startTime: validStartTime,
  endTime: validEndTime,
  total: 10,
  available: 5
};
let wrapper = shallow(<EventDetails {...props} />);
let state = {};
beforeEach(() => {
  state = Object.assign({}, props);
});

describe('validateEventData', () => {
  it('should return true for valid data', () => {
    expect(wrapper.instance().validateEventData(state))
      .toEqual(true);
  });

  it('should return false for start time before now', () => {
    state.startTime = moment().subtract(10, 'days');
    expect(wrapper.instance().validateEventData(state))
      .toEqual(false);
  });

  it('should return false for end time before now', () => {
    state.endTime = moment().subtract(5, 'days');
    expect(wrapper.instance().validateEventData(state))
      .toEqual(false);
  });

  it('should return false for end time before start time before now', () => {
    state.endTime = validStartTime.clone().subtract(1, 'days');
    expect(wrapper.instance().validateEventData(state))
      .toEqual(false);
  });

  it('should return false for 0 available', () => {
    state.available = 0;
    expect(wrapper.instance().validateEventData(state))
      .toEqual(false);
  });
});

describe('book button disabled', () => {
  it('should disable button for invalid data', () => {
    state.startTime = moment().subtract(10, 'days');
    const wrapper = shallow(<EventDetails {...state} />);
    const bookBtn = wrapper.find('#details-1-book-btn');
    expect(bookBtn.props()['disabled']).toBe(true);
  });
});