import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Well, Button } from 'react-bootstrap';
import CenteredCol from '../../components/CenteredCol/CenteredCol';

function TextGroup({ id, label, ...props}) {
  return (
    <FormGroup inline="true" controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  )
}

class ItemCreation extends Component {
  constructor(props) {
    super(props);

    try {
      this.state = JSON.parse(localStorage.getItem('new-item'));
    } catch (err) {
      // If there is no valid state object
      // saved in the local storage, set state
      // to default

      this.state = {
        name: '',
        description: '',
        email: '',
        reservationDateTime: ''
      }
    }
  }

  handleSubmit(event) {
    // TODO: add communication with backend
    event.stopPropagation();
    event.preventDefault();
  }

  handleChangeFactory(attr) {
    return (event) => {
      let update = {};
      update[attr] = event.target.value;
      this.setState(update);
      localStorage.setItem('new-item', JSON.stringify(this.state));
    };
  }

  clearAll() {

  }

  render() {
    return (
      <CenteredCol width={6}>
        <Well>
          <form id="item-creation-form">
            <TextGroup
              id="item-name"
              type="text"
              label="Item name"
              defaultValue={this.state.name}
              onInput={this.handleChangeFactory('name')}
              placeholder="Enter name" />
            <TextGroup
              id="item-description"
              type="textarea"
              label="Description"
              componentClass="textarea"
              rows={3}
              defaultValue={this.state.description}
              onInput={this.handleChangeFactory('description')}
              placeholder="Description" />
            <TextGroup
              id="item-email"
              type="email"
              label="Email address"
              defaultValue={this.state.email}
              onInput={this.handleChangeFactory('email')}
              placeholder="Enter email address" />
            <Button type="submit"
                bsStyle="success"
                onClick={this.handleSubmit}
                block>
              Create
            </Button>
          </form>
        </Well>
      </CenteredCol>
    );
  }
}

export default ItemCreation;
