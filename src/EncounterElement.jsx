import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Modal from "@material-ui/core/Modal";

export const eeType = {
  deployment: "deployment",
  strategy: "strategy",
  scheme: "scheme"
};

class EncounterElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({ showDetails: true });
  }

  handleClose() {
    this.setState({ showDetails: false });
  }

  render() {
    const { type, details } = this.props;
    const { showDetails } = this.state;
    return (
      <>
        <ListItem button onClick={this.handleOpen}>
          {type !== eeType.scheme && (
            <ListItemIcon>{details.suite.icon}</ListItemIcon>
          )}
          <ListItemText
            primary={
              type === eeType.scheme
                ? `${details.number}. ${details.name}`
                : details.name
            }
          />
        </ListItem>
        <Modal open={showDetails} onClose={this.handleClose}>
          <Paper>{JSON.stringify(details.desc)}</Paper>
        </Modal>
        {/*
        <ListGroup.Item action onClick={this.handleShow}>
          {name}
        </ListGroup.Item>
        <Modal show={showDetails} onHide={this.handleHide}>
          <Modal.Header closeButton>
            <Modal.Title>{name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalBody}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleHide}>
              {"Close"}
            </Button>
          </Modal.Footer>
        </Modal>
        */}
      </>
    );
  }
}

export default EncounterElement;
