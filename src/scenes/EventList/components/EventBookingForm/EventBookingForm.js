import React, { Component } from 'react';
import {
  Form, Button, ButtonGroup
} from 'react-bootstrap';
import * as moment from 'moment';
import TextInput from '../../../../components/TextInput/TextInput';
import * as service from './EventBookingForm.service';
import { checkAndSetFactory } from '../../../../utils/Utils';


class EventBookingForm extends Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      email: '',
      phoneNumber: '',
      fullName: '',
      number: 1
    };

    this.state = Object.assign({}, this.defaultState);
    let setAttr = checkAndSetFactory(this.state, props);
    setAttr('eventId');
    setAttr('available');
    this.idPrefix = 'booking-' + this.state.eventId + '-';

    this.handleFullNameChange = this.handleChangeFactory('fullName');
    this.handleEmailChange = this.handleChangeFactory('email');
    this.handlePhoneNumberChange = this.handleChangeFactory('phoneNumber');
  }

  handleChangeFactory(attr) {
    return (event) => {
      let update = {};
      update[attr] = event.target.value;
      this.setState(update);
    };
  }

  handleNumberChange = (event) => {
    let val = event.target.value;
    if (val === '' || (val > 0 && val <= this.state.available)) {
      this.setState({ number: val });
    }
  };

  handleNumberFocusLost = () => {
    if (this.state.total === '') {
      this.setState({
        number: this.defaultState.number,
      });
    }
  }

  handleSubmit = (event) => {
    let body = Object.assign({}, this.state);
    body.startTime = moment(body.startTime).toJSON();
    body.endTime = moment(body.endTime).toJSON();
    console.log(body);
    service.bookEvent(body, (res) => {});
    this.setState(this.defaultState);
    event.stopPropagation();
    event.preventDefault();
  }

  render() {
    return (
          <Form>
            <TextInput
              required
              id={this.idPrefix + 'full-name'}
              type="text"
              label="Full name"
              minLength="3"
              value={this.state.fullName}
              onChange={this.handleFullNameChange}
              placeholder="Enter full name" />

            <TextInput
              required
              id={this.idPrefix + 'email'}
              type="email"
              label="Email address"
              value={this.state.email}
              onChange={this.handleEmailChange}
              placeholder="Enter email address" />

            <TextInput
              required
              id={this.idPrefix + 'phone-number'}
              type="text"
              label="Phone number"
              value={this.state.phoneNumber}
              onChange={this.handlePhoneNumberChange}
              placeholder="Enter phone number" />

            <TextInput
              required
              id={this.idPrefix + '-participants-number'}
              type="number"
              label="Number of participants"
              value={this.state.number}
              onChange={this.handleNumberChange}
              onBlur={this.handleNumberFocusLost} />

            <ButtonGroup justified>
              <ButtonGroup>
                <Button
                    type="button"
                    bsStyle="success"
                    onClick={this.handleSubmit}>
                      Submit
                </Button>
              </ButtonGroup>
            </ButtonGroup>
          </Form>
    );
  }
}

export default EventBookingForm;