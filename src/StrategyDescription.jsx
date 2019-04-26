import React, { Component } from "react";
import { Col } from "react-bootstrap";

class StrategyDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: null
    };
  }

  render() {
    const { name, suite, desc } = this.props.strategy;
    return (
      <Col className="strategy-description">
        <div>
          {name + " "}
          <span>{suite.name}</span>
        </div>
        <div>{desc}</div>
      </Col>
    );
  }
}

export default StrategyDescription;
