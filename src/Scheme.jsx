import React, { Component } from "react";
import { Col } from "react-bootstrap";

class SchemeDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: null
    };
  }

  render() {
    const { name, number, desc } = this.props.scheme;
    return (
      <Col className="scheme-description">
        <div>{name}</div>
        <div>{number}</div>
        <div>{desc.preparation}</div>
        <div>{desc.reveal}</div>
        <div>{desc.end}</div>
      </Col>
    );
  }
}

export default SchemeDescription;
