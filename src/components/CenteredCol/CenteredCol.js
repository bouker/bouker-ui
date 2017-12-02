import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

class CenteredCol extends Component {
  constructor({width, children, ...props}) {
    super(...props);

    width = (width <= 12) ? width : 12;
    width = (width > 0) ? width : 1;
    let offset = Math.floor((12 - width) / 2);
    let sizes = ['lg', 'md', 'sm', 'xs'];
    let sizeProps = {};
    for (let size of sizes) {
        sizeProps[size] = width;
        sizeProps[size + "Offset"] = offset;
    }

    this.state = {
        sizeProps: sizeProps,
        children: children
    }
  }

  render() {
    return (
      <Col {...this.state.sizeProps}>
      <div>{this.state.children}</div>
      </Col>
    );
  }
}

export default CenteredCol;