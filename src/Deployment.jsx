import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import EncounterElement from "./EncounterElement";

class Deployment extends Component {
  render() {
    const { name, suite, picture, desc } = this.props.details;
    return (
      <>
        <EncounterElement
          name={
            <>
              {name}
              {suite.pic}
            </>
          }
          modalBody={
            <Container fluid>
              <Row className="justify-content-md-center" noGutters>
                <Col sm className="aaa">
                  <Image className="deployment-image" src={picture} rounded />
                </Col>
                <Col sm>{desc}</Col>
              </Row>
            </Container>
          }
        />
        <Container fluid>
          <Row className="justify-content-md-center" noGutters>
            <Col sm>
              <Image className="deployment-image" src={picture} rounded />
            </Col>
            <Col sm>{desc}</Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Deployment;
