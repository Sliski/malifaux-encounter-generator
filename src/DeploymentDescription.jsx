import React, { Component } from "react";

class DeploymentDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: null
    };
  }

  render() {
    const { name, suite, picture, desc } = this.props.deployment;
    return (
      <div className="scheme-description">
        <div>{name}</div>
        <div>{suite.name}</div>
        <div>
          <img src={picture} alt={`${name}-pic`} />
        </div>
        <div>{desc}</div>
      </div>
    );
  }
}

export default DeploymentDescription;
