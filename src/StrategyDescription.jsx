import React, { Component } from "react";

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
      <div className="strategy-description">
        <div>
          {name + " "}
          <span>{suite.name}</span>
        </div>
        <div>{desc}</div>
      </div>
    );
  }
}

export default StrategyDescription;
