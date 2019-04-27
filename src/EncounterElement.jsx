import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import EnconterElementDetails from './EnconterElementDetails.jsx';

export const eeType = {
  deployment: 'deployment',
  strategy: 'strategy',
  scheme: 'scheme',
};

class EncounterElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
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
        <Dialog open={showDetails} onClose={this.handleClose}>
          <EnconterElementDetails details={details} type={type} handleClose={this.handleClose} />
        </Dialog>
      </>
    );
  }
}

export default EncounterElement;
