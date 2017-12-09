import React, { Component } from 'react';
import {
    ControlLabel,
    Well, Form, Button, ButtonGroup,
    InputGroup, Glyphicon, Col, FormGroup
} from 'react-bootstrap';
import DateTime from 'react-datetime';
import CenteredCol from '../../components/CenteredCol/CenteredCol';
import TextInput from '../../components/TextInput/TextInput';
import * as moment from 'moment';
import * as service from './EventCreation.service';
import 'react-datetime/css/react-datetime.css';
import './EventCreation.css'


class EventCreation extends Component {
  constructor(props) {
    super(props);
    this.dateFormat = 'YYYY-MM-DD';
    this.timeFormat ='HH:mm';
    this.defaultState = {
      name: '',
      description: '',
      startTime: moment(),
      endTime: moment().add(1, 'hours'),
      total: 1,
      available: 1
    };

    try {
      this.state = JSON.parse(localStorage.getItem('new-event'));
      this.state.startTime = moment(this.state.startTime);
      this.state.endTime = moment(this.state.endTime);
    } catch (err) {
      // If there is no valid state object
      // saved in the local storage, set state
      // to default
      this.state = Object.assign({}, this.defaultState);
    }

    // Dynamically create onChange handlers
    for (let key in this.defaultState) {
      let handlerName = 'handle' + key.charAt(0).toUpperCase()
                      + key.slice(1) + 'Change';
      if (!key.endsWith('Time')) {
        this[handlerName] = this.handleChangeFactory(key);
      }
    }

    this.handleStartTimeChange = this.handleDatetimeChangeFactory(
      'startTime', this.validateStartTime, 'endTime');
    this.handleEndTimeChange = this.handleDatetimeChangeFactory(
      'endTime', this.validateEndTime);

    this.handleTotalChange = (event) => {
      let val = event.target.value;
      if (val === '' || val > 0) {
        this.setState({
          'total': val,
          'available': val
        });
      }
    };
  }

  handleSubmit = (event) => {
    let body = Object.assign({}, this.state);
    body.startTime = moment(body.startTime).toJSON();
    body.endTime = moment(body.endTime).toJSON();

    service.createEvent(body, (res) => {});
    this.setState(this.defaultState);
    event.stopPropagation();
    event.preventDefault();
  }

  componentDidUpdate = () => {
    localStorage.setItem('new-event', JSON.stringify(this.state));
  }

  handleChangeFactory(attr) {
    return (event) => {
      let update = {};
      update[attr] = event.target.value;
      this.setState(update);
    };
  }

  handleTotalFocusLost = () => {
    if (this.state.total === '') {
      this.setState({
        total: this.defaultState.total,
        available: this.defaultState.available
      });
    }
  }

  validateStartTime = (chosenDatetime) => {
    let now = moment().subtract(1, 'minutes');
    return chosenDatetime.isAfter(now);
  }

  validateEndTime = (chosenDatetime) => {
    return chosenDatetime.isAfter(this.state.startTime);
  }

  handleDatetimeChangeFactory = (attr, validateFun, dependentAttr) => {
    return (datetime) => {
      let update = {};
      if (validateFun(datetime)) {
        update[attr] = datetime;
        if (typeof dependentAttr !== 'undefined') {
          update[dependentAttr] = moment(datetime).add(1, 'hour');
        }
        this.setState(update);
      }
    }
  }

  handleClearAll = (event) => {
    this.setState(this.defaultState);
  }

  render() {
    return (
      <CenteredCol width={6}>
        <Well>
          <Form id="event-creation-form">
            <TextInput
              required
              id="event-name"
              type="text"
              label="Event name"
              minLength="3"
              maxLength="64"
              value={this.state.name}
              onChange={this.handleNameChange}
              placeholder="Enter name" />
            <TextInput
              required
              id="event-description"
              type="textarea"
              label="Description"
              minLength="3"
              maxLength="256"
              componentClass="textarea"
              rows={2}
              value={this.state.description}
              onChange={this.handleDescriptionChange}
              placeholder="Description" />

            <FormGroup>
              <Col lg={6} md={6} sm={6} xs={12} className="no-left-padding">
                  <ControlLabel>Start time</ControlLabel>
                  <InputGroup>
                    <DateTime
                      dateFormat={this.dateFormat}
                      timeFormat={this.timeFormat}
                      value={this.state.startTime}
                      isValidDate={this.validateStartTime}
                      viewMode="days"
                      onChange={this.handleStartTimeChange} />
                    <InputGroup.Addon>
                      <Glyphicon glyph="calendar" />
                    </InputGroup.Addon>
                  </InputGroup>
              </Col>
              <Col lg={6} md={6} sm={6} xs={12} className="no-right-padding">
                <ControlLabel>End time</ControlLabel>
                <InputGroup>
                  <DateTime
                    dateFormat={this.dateFormat}
                    timeFormat={this.timeFormat}
                    value={this.state.endTime}
                    isValidDate={this.validateEndTime}
                    viewMode="days"
                    onChange={this.handleEndTimeChange} />
                  <InputGroup.Addon>
                    <Glyphicon glyph="calendar" />
                  </InputGroup.Addon>
                </InputGroup>
              </Col>
            </FormGroup>

            <TextInput
              id="event-total"
              type="number"
              label="Max number of participants"
              value={this.state.total}
              onChange={this.handleTotalChange}
              onBlur={this.handleTotalFocusLost} />

            <ButtonGroup justified>
              <ButtonGroup>
                <Button
                    type="button"
                    bsStyle="default"
                    onClick={this.handleClearAll}>
                      Clear
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button
                    type="submit"
                    bsStyle="success"
                    onClick={this.handleSubmit}>
                      Create
                </Button>
              </ButtonGroup>
            </ButtonGroup>

          </Form>
        </Well>
        </CenteredCol>
    );
  }
}

export default EventCreation;
