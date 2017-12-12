import React, { Component } from 'react';
import CenteredCol from '../../components/CenteredCol/CenteredCol'
import EventDetails from './components/EventDetails/EventDetails';
import * as service from './EventList.service';

class EventList extends Component {
  constructor() {
    super();
    this.state = {
      events: []
    };
  }

  componentDidMount = () => {
    service.loadEvents((res) => {
      this.setState({ events: res.data });
    });
  }

  render() {
    const eventDetails = this.state.events
      .map((e) => {
        e['key'] = e['id'];
        return <EventDetails {...e}/>;
      });
    return (
      <CenteredCol width={10}>
        <div>
          {eventDetails}
        </div>
      </CenteredCol>
    );
  }
}

export default EventList;
