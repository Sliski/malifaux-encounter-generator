import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button, Checkbox, Divider, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem,
  ListItemSecondaryAction, ListItemText, Paper, TextField, Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ls from 'local-storage';
import { ENCOUNTER_STEPS, CHOOSE_STEPS } from './App.jsx';
import styles from './styles.jsx';
import { createGame, joinRoom } from './backEndConnector.js';

export function calculateEncounterId(deploymentId, strategyId, schemesIds) {
  return `${(deploymentId * 4 + strategyId).toString(16)}${schemesIds.reduce((out, current) => out + current.toString(16))}`;
}

export function decodeEncounterId(encounterId) {
  if (encounterId.length !== 6) return null;
  const deploymentId = Math.floor(parseInt(encounterId.substring(0, 1), 16) / 4);
  const strategyId = parseInt(encounterId.substring(0, 1), 16) % 4;
  const schemesIds = [...encounterId.substring(1, 6)].map(it => parseInt(it, 16)).sort((a, b) => a - b);

  if (deploymentId >= 0 && deploymentId <= 3
    && strategyId >= 0 && strategyId <= 3
    && schemesIds.length === 5
    && schemesIds.reduce((out, current) => out !== null && current >= 0 && current <= 12)) {
    return {
      deploymentId,
      strategyId,
      schemesIds,
    };
  }
  return null;
}

class Generator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDialog: false,
      encounterId: '',
      error: '',
      multiplayerChecked: false,
      skipCrewChoice: true,
    };

    this.generateEncounter = this.generateEncounter.bind(this);
    this.importEncounter = this.importEncounter.bind(this);
    this.manuallyChooseEncounter = this.manuallyChooseEncounter.bind(this);
    this.updateEncounterId = this.updateEncounterId.bind(this);

    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.toggleMultiplayer = this.toggleMultiplayer.bind(this);
    this.toggleCrewChoice = this.toggleCrewChoice.bind(this);
  }

  openDialog() {
    this.setState({ showDialog: true });
  }

  closeDialog() {
    this.setState({ showDialog: false });
  }

  toggleMultiplayer() {
    this.setState((prevState) => {
      if (prevState.multiplayerChecked) {
        return { multiplayerChecked: false, skipCrewChoice: true };
      }
      return { multiplayerChecked: true };
    });
  }

  toggleCrewChoice() {
    this.setState(prevState => ({ skipCrewChoice: !prevState.skipCrewChoice }));
  }

  updateEncounterId(event) {
    this.setState({ encounterId: event.target.value });
  }

  manuallyChooseEncounter() {
    const { updateAppState } = this.props;
    const { multiplayerChecked, skipCrewChoice } = this.state;
    updateAppState({
      step: ENCOUNTER_STEPS.MANUAL_CHOICE,
      multiplayer: multiplayerChecked,
      chooseCrew: !skipCrewChoice,
    });
  }

  generateEncounter() {
    const { updateAppState, signed, addNewAppStateListener } = this.props;
    const { multiplayerChecked, skipCrewChoice } = this.state;

    const allSchemesIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const schemesIds = [];
    for (let i = 0; i < 5; i += 1) {
      schemesIds.push(
        allSchemesIds.splice(Math.floor((Math.random() * allSchemesIds.length)), 1)[0],
      );
    }
    schemesIds.sort((a, b) => a - b);
    const deploymentId = Math.floor((Math.random() * 4));
    const strategyId = Math.floor((Math.random() * 4));

    if (signed) {
      createGame(calculateEncounterId(deploymentId, strategyId, schemesIds), multiplayerChecked, !skipCrewChoice,
        (response) => {
          if (response && response.status === 'OK' && response.id) {
            updateAppState({ gameId: response.id });
            joinRoom(response.id);
            addNewAppStateListener();
          }
        });
    }

    updateAppState({
      deploymentId,
      strategyId,
      schemesIds,
      step: ENCOUNTER_STEPS.CHOOSE,
      multiplayer: multiplayerChecked,
      chooseStep: skipCrewChoice ? CHOOSE_STEPS.SCHEMES : CHOOSE_STEPS.FACTION,
      chooseCrew: !skipCrewChoice,
    });
  }

  importEncounter() {
    const { updateAppState, signed, addNewAppStateListener } = this.props;
    const { encounterId, multiplayerChecked, skipCrewChoice } = this.state;
    const decodedEncounter = decodeEncounterId(encounterId);
    if (!decodedEncounter) return this.setState({ error: 'Incorrect encounter ID.' });

    this.closeDialog();

    if (signed) {
      createGame(encounterId, multiplayerChecked, skipCrewChoice,
        (response) => {
          if (response && response.status === 'OK' && response.id) {
            updateAppState({ gameId: response.id });
            joinRoom(response.id);
            addNewAppStateListener();
          }
        });
    }

    return updateAppState({
      deploymentId: decodedEncounter.deploymentId,
      strategyId: decodedEncounter.strategyId,
      schemesIds: decodedEncounter.schemesIds,
      step: ENCOUNTER_STEPS.CHOOSE,
      multiplayer: multiplayerChecked,
      chooseStep: skipCrewChoice ? CHOOSE_STEPS.SCHEMES : CHOOSE_STEPS.FACTION,
      chooseCrew: !skipCrewChoice,
    });
  }

  render() {
    const { classes, signed } = this.props;
    const {
      showDialog, encounterId, error, multiplayerChecked, skipCrewChoice,
    } = this.state;

    return (
      <>
        <Paper className={classes.paper}>
          <List>
            <ListItem button onClick={this.generateEncounter}>
              <ListItemText primary="Generate Encounter" />
            </ListItem>
            <ListItem button onClick={this.openDialog}>
              <ListItemText primary="Import Encounter" />
            </ListItem>
            <ListItem button onClick={this.manuallyChooseEncounter}>
              <ListItemText primary="Choose Encounter" />
            </ListItem>
            {ls.get('betaUser') && (
            <>
              <Divider />
              <ListItem>
                <ListItemText primary="Two Players" secondary={signed ? '' : 'Enabled only for signed users.'} />
                <ListItemSecondaryAction>
                  <Checkbox
                    disabled={!signed}
                    onChange={this.toggleMultiplayer}
                    checked={multiplayerChecked}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText primary="Skip choosing faction, leaders and crew" />
                <ListItemSecondaryAction>
                  <Checkbox
                    disabled={!multiplayerChecked}
                    onChange={this.toggleCrewChoice}
                    checked={skipCrewChoice}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </>
            )}
          </List>
        </Paper>
        <Dialog
          classes={{ paper: classes.dialogPaper }}
          open={showDialog}
          onClose={this.closeDialog}
        >
          <DialogTitle onClose={this.closeDialog} className={classes.dialogTitle} disableTypography>
            <Typography variant="h6">Import encounter</Typography>
            <IconButton className={classes.dialogCloseButton} onClick={this.closeDialog}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="encounterId"
              label="Encounter ID:"
              type="text"
              onChange={this.updateEncounterId}
              autoComplete="off"
              value={encounterId}
              error={error !== ''}
              fullWidth
              autoFocus
            />
            {error && <Typography color="error">{error}</Typography>}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="secondary">
              {'Cancel'}
            </Button>
            <Button
              onClick={this.importEncounter}
              color="primary"
              disabled={encounterId.length !== 6}
            >
              {'Import'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(Generator);
