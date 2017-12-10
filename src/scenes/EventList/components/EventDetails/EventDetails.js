import React, { Component } from 'react';
import {
    Well, Form, Button, ButtonGroup,
    Col,
    ProgressBar,
    FormGroup,
    ControlLabel,
    Collapse
} from 'react-bootstrap';
import moment from 'moment';
import EventBookingForm from '../EventBookingForm/EventBookingForm';
import TextInput from '../../../../components/TextInput/TextInput';
import { checkAndSetFactory } from '../../../../utils/Utils';
import './EventDetails.css';


class EventDetials extends Component {
  constructor(props) {
    super(props);
    this.datetimeFormat = 'YYYY-MM-DD HH:mm';
    this.state = {};

    let setAttr = checkAndSetFactory(this.state, props);
    setAttr('id');
    setAttr('name');
    setAttr('description');
    setAttr('startTime');
    setAttr('endTime');
    setAttr('available');
    setAttr('total');

    this.state.startTime = moment(this.state.startTime)
      .local().format(this.datetimeFormat);
    this.state.endTime = moment(this.state.endTime)
      .local().format(this.datetimeFormat);

    this.prefix = 'details-' + this.state.id + '-';
    this.state.formVisible = false;
    this.state.isValid = this.validateEventData(this.state);
  }

  validateEventData = (state) => {
    let now = moment();
    return now.isBefore(state.startTime)
      && now.isBefore(state.endTime)
      && moment(state.startTime).isBefore(state.endTime)
      && (state.available > 0);
  }

  toggleFormCollapse = (event) => {
    this.setState({ formVisible: !this.state.formVisible });
  }

  render() {
    const btnProps = {}
    if (!this.state.isValid) {
      btnProps.disabled = true;
    }

    return (
      <Col lg={6} md={12} sm={12} xs={12}>
      <Well className={this.state.validityClass}>
        <Form>
            <TextInput
              readOnly
              id={this.prefix + "name"}
              type="text"
              label="Event name"
              value={this.state.name}
              placeholder="Enter name" />

            <TextInput
              readOnly
              id={this.prefix + 'description'}
              type="textarea"
              label="Description"
              componentClass="textarea"
              rows={1}
              value={this.state.description} />

            <FormGroup>
                <Col lg={6} md={6} sm={12} xs={12} className="no-left-padding">
                  <TextInput
                    readOnly
                    id={this.prefix + 'start-time'}
                    type="text"
                    label="Start time"
                    value={this.state.startTime} />
                </Col>
                <Col lg={6} md={6} sm={12} xs={12} className="no-right-padding">
                  <TextInput
                    readOnly
                    id={this.prefix + 'end-time'}
                    type="text"
                    label="End time"
                    value={this.state.endTime} />
                </Col>
            </FormGroup>

            <FormGroup inline="true" controlId={this.prefix + 'available'}>
              <ControlLabel>Available / Total</ControlLabel>
              <ProgressBar
                now={ (this.state.available * 100) / this.state.total }
                label={ this.state.available + '/' + this.state.total }/>
            </FormGroup>

            <ButtonGroup justified>
              <ButtonGroup>
                <Button
                    {...btnProps}
                    id={this.prefix + 'book-btn'}
                    type="button"
                    bsStyle="success"
                    onClick={this.toggleFormCollapse}>
                      Book
                </Button>
              </ButtonGroup>
            </ButtonGroup>

          </Form>
          <Collapse in={this.state.formVisible}>
            <div className="nested-form">
                <EventBookingForm
                  eventId={this.state.id}
                  available={this.state.available} />
            </div>
          </Collapse>
      </Well>
      </Col>
    );
  }
}

export default EventDetials;