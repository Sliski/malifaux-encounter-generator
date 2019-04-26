import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import EncounterElementsList from "./EncounterElementsList.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: null
    };
  }

  render() {
    return (
      <Grid container justify="center">
        <EncounterElementsList />
        {/*<CssBaseline />

        <Row>{"MalifauX 3ed Encounter Generator"}</Row>
        <Row>
          <Col>
            <ListGroup variant="flush">
              <Deployment details={deployments[0]} />
              <ListGroup.Item>Strategy Name</ListGroup.Item>
              <ListGroup.Item>Scheme 1</ListGroup.Item>
              <ListGroup.Item>Scheme 2</ListGroup.Item>
              <ListGroup.Item>Scheme 3</ListGroup.Item>
              <ListGroup.Item>Scheme 4</ListGroup.Item>
              <ListGroup.Item>Scheme 5</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <Row className="footer">
          {"Pics belongs to "}
          <a href="https://www.wyrd-games.net/">WYRD MINIATURES, LLC</a>}
          {"footer placeholder"}
        </Row>
        */}
      </Grid>
    );
  }
}

export default App;
