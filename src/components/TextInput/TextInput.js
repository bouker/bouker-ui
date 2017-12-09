import React, { Component } from 'react';
import {
  FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import { checkAndSetFactory } from '../../utils/Utils';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    let setAttr = checkAndSetFactory(this.state, props);
    setAttr('id');
    setAttr('label');
  }

  render() {
    return (
      <FormGroup inline="true" controlId={this.state.id}>
        <ControlLabel>{this.state.label}</ControlLabel>
        <FormControl {...this.props} />
      </FormGroup>
    );
  }
}

export default TextInput;
