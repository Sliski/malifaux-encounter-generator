import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Dialog from '@material-ui/core/Dialog';
import Checkbox from '@material-ui/core/Checkbox';
import EncounterElementDetails from './EncounterElementDetails.jsx';

const styles = theme => ({
  dialogPaper: {
    maxHeight: '95vh',
    [theme.breakpoints.down('xs')]: {
      margin: '5px',
    },
    // [theme.breakpoints.down('sm')]: {
    //   maxHeight: '95vh',
    // },
  },
});


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
    const {
      type, details, classes, handleToggle, checked, score, index,
    } = this.props;
    const { showDetails } = this.state;

    return (
      <>
        <ListItem button onClick={this.handleOpen}>
          {type !== eeType.scheme && !score && (
            <ListItemIcon>{details.suite.icon}</ListItemIcon>
          )}
          <ListItemText
            primary={
              type === eeType.scheme && !score
                ? `${details.number}. ${details.name}`
                : details.name
            }
          />
          {type === eeType.scheme && !score && (
            <ListItemSecondaryAction>
              <Checkbox
                onChange={handleToggle(index)}
                checked={checked}
                color="primary"
              />
            </ListItemSecondaryAction>
          )}
        </ListItem>
        <Dialog classes={{ paper: classes.dialogPaper }} open={showDetails} onClose={this.handleClose}>
          <EncounterElementDetails details={details} type={type} handleClose={this.handleClose} />
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(EncounterElement);
