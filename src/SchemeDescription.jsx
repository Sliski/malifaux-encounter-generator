import React, { Component } from "react";

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
      <div className="scheme-description">
        <div>{name}</div>
        <div>{number}</div>
        <div>{desc.preparation}</div>
        <div>{desc.reveal}</div>
        <div>{desc.end}</div>
      </div>
    );
  }
}

export default SchemeDescription;
