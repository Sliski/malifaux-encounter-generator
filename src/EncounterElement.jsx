import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Dialog from '@material-ui/core/Dialog';
import Checkbox from '@material-ui/core/Checkbox';
import EncounterElementDetails from './EncounterElementDetails.jsx';
import styles from './styles.jsx';

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
      type, details, classes, handleToggle, checked, score, index, chosenSchemes, strategyScore, scoreHandler,
    } = this.props;
    const { showDetails } = this.state;

    let secondaryText = '';
    let chosen = null;
    if (score && type === eeType.scheme) {
      chosen = chosenSchemes.find(scheme => scheme.id === details.number - 1);
      secondaryText = chosen && chosen.revealed ? chosen.note : '';
    }

    let secondaryAction = null;
    if (type === eeType.scheme) {
      secondaryAction = score ? (
        <ListItemSecondaryAction>
          <Button
            disabled={!chosen || !chosen.revealed}
            color="default"
            onClick={scoreHandler}
          >
            {chosen && chosen.revealed ? chosen.score : '-'}
          </Button>
        </ListItemSecondaryAction>
      ) : (
        <ListItemSecondaryAction>
          <Checkbox
            onChange={handleToggle(index)}
            checked={checked}
          />
        </ListItemSecondaryAction>
      );
    }
    if (type === eeType.strategy && score) {
      secondaryAction = (
        <ListItemSecondaryAction>
          <Button
            color="default"
            onClick={scoreHandler}
          >
            {strategyScore}
          </Button>
        </ListItemSecondaryAction>
      );
    }

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
            secondary={secondaryText}
          />
          {secondaryAction}
        </ListItem>
        <Dialog
          classes={{ paper: classes.dialogPaper }}
          open={showDetails}
          onClose={this.handleClose}
        >
          <EncounterElementDetails details={details} type={type} handleClose={this.handleClose} />
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(EncounterElement);
