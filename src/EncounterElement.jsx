import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button, Checkbox, Dialog, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Radio, Typography,
} from '@material-ui/core';
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
      multiplayer, menu, opponentScheme,
    } = this.props;
    const { showDetails } = this.state;

    let primaryText = type === eeType.scheme && !score
      ? `${details.number}. ${details.name}`
      : details.name;
    let secondaryText = '';
    let chosen = null;
    if (score && type === eeType.scheme) {
      chosen = chosenSchemes.find(scheme => scheme.id === details.number - 1);
      if (multiplayer) {
        secondaryText += chosen && chosen.revealed && chosen.note ? `My note: ${chosen.note} ` : '';
        secondaryText += opponentScheme && opponentScheme.revealed && opponentScheme.note ? `Opponent's note: ${opponentScheme.note}` : '';
      } else {
        secondaryText = chosen && chosen.revealed ? chosen.note : '';
      }
    }

    let secondaryAction = null;
    if (type === eeType.scheme && score) {
      if (chosen && chosen.revealed) {
        secondaryAction = (
          <ListItemSecondaryAction>
            <Button
              disabled={!chosen || !chosen.revealed}
              color="primary"
              onClick={scoreHandler}
            >
              {chosen && chosen.revealed ? chosen.score : '-'}
            </Button>
          </ListItemSecondaryAction>
        );
      } else {
        secondaryAction = (
          <Typography
            color="primary"
            align="center"
            variant="button"
            className={classes.myScore}
          >
            {'-'}
          </Typography>
        );
      }
    } else if (type === eeType.strategy && score) {
      secondaryAction = (
        <ListItemSecondaryAction>
          <Button
            color="primary"
            onClick={scoreHandler}
          >
            {strategyScore[0]}
          </Button>
        </ListItemSecondaryAction>
      );
    } else if (handleToggle && type === eeType.scheme) {
      secondaryAction = (
        <ListItemSecondaryAction>
          <Checkbox
            onChange={handleToggle(index)}
            checked={checked}
          />
        </ListItemSecondaryAction>
      );
    } else if (handleToggle) {
      secondaryAction = (
        <ListItemSecondaryAction>
          <Radio
            onChange={handleToggle(index)}
            checked={checked}
          />
        </ListItemSecondaryAction>
      );
    }

    let opponentScore = null;

    if (score && multiplayer && (type === eeType.strategy || type === eeType.scheme)) {
      let opponentScoreValue = '-';
      if (type === eeType.strategy) {
        opponentScoreValue = strategyScore[1]; // eslint-disable-line prefer-destructuring
      } else if (opponentScheme && opponentScheme.revealed) {
        opponentScoreValue = opponentScheme.score;
      }
      opponentScore = (
        <Typography
          color="secondary"
          align="center"
          variant="button"
          className={classes.opponentScore}
        >
          {opponentScoreValue}
        </Typography>
      );
    }

    // deployment in menu
    if (menu) {
      secondaryText = details.name;
      primaryText = 'Deployment';
    }

    return (
      <>
        <ListItem button onClick={this.handleOpen}>
          {opponentScore}
          {type !== eeType.scheme && !score && (
            <ListItemIcon>{details.suite.icon}</ListItemIcon>
          )}
          <ListItemText primary={primaryText} secondary={secondaryText} />
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
