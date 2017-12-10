import React from 'react';
import { shallow } from 'enzyme';
import EventBookinForm from './EventBookingForm';

const props = {
  eventId: '1',
  available: 5
};
let wrapper = {};

beforeAll(() => {
  wrapper = shallow(<EventBookinForm {...props} />);
});

describe('handleNumberChange', () => {
  let event = { target: { value: 0 } };

  it('should update number', () => {
    event.target.value = props.available - 1;
    wrapper.instance().handleNumberChange(event);
    expect(wrapper.state().number).toEqual(event.target.value);
  });

  it('should not set number bigger than available', () => {
    event.target.value = props.available + 1;
    const oldNumber = wrapper.state().number;
    wrapper.instance().handleNumberChange(event);
    expect(wrapper.state().number).toEqual(oldNumber);
  });

  it('should allow to set empty number', () => {
    event.target.value = '';
    wrapper.instance().handleNumberChange(event);
    expect(wrapper.state().number).toEqual('');
  });

  it('should set default number on focus lost', () => {
    event.target.value = '';
    const numberInput = wrapper.find('#booking-1-participants-number');
    numberInput.simulate('change', event);
    numberInput.simulate('blur');
    expect(wrapper.state().number).toEqual(1);
  });
});