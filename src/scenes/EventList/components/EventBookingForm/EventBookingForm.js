import React, { Component } from 'react';
import {
  Form, Button, ButtonGroup
} from 'react-bootstrap';
import TextInput from '../../../../components/TextInput/TextInput';
import * as service from './EventBookingForm.service';
import {
  checkAndSetFactory, handleStateChangeFactory, prepareReqBody
} from '../../../../utils/Utils';


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

    this.handleFullNameChange = handleStateChangeFactory(this, 'fullName');
    this.handleEmailChange = handleStateChangeFactory(this, 'email');
    this.handlePhoneNumberChange = handleStateChangeFactory(this, 'phoneNumber');
  }

  handleNumberChange = (event) => {
    let val = event.target.value;
    if (val === '' || (val > 0 && val <= this.state.available)) {
      this.setState({ number: val });
    }
  };

  handleNumberFocusLost = () => {
    if (this.state.number === '') {
      this.setState({
        number: this.defaultState.number,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    service.bookEvent(prepareReqBody(this.state), (res) => {});
    this.setState(this.defaultState);
  }

  render() {
    return (
          <Form onSubmit={this.handleSubmit}>
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
              id={this.idPrefix + 'participants-number'}
              type="number"
              label="Number of participants"
              value={this.state.number}
              onChange={this.handleNumberChange}
              onBlur={this.handleNumberFocusLost} />

            <ButtonGroup justified>
              <ButtonGroup>
                <Button
                    type="submit"
                    bsStyle="success">
                      Submit
                </Button>
              </ButtonGroup>
            </ButtonGroup>
          </Form>
    );
  }
}

export default EventBookingForm;