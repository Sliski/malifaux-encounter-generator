import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, ListItemText,
  Paper, TextField, Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import EncounterElement, { eeType } from './EncounterElement.jsx';
import { deployments, schemes, strategies } from './data.jsx';
import styles from './styles.jsx';
import { ENCOUNTER_STEPS } from './App.jsx';
import { calculateEncounterId } from './Generator.jsx';
import { URL } from './config.js';

class EncounterElementsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: [],
      showDialog: false,
      noteA: '',
      noteB: '',
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.chooseSchemes = this.chooseSchemes.bind(this);
  }

  componentDidMount() {
    console.log('Score mounts.');
    this.props.getAppStateFromDb();
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked.sort((a, b) => a - b),
    });
  };

  openDialog() {
    this.setState({ showDialog: true });
  }

  closeDialog() {
    this.setState({ showDialog: false });
  }

  updateNote(event, note) {
    if (note === 'a') {
      this.setState({ noteA: event.target.value });
    } else {
      this.setState({ noteB: event.target.value });
    }
  }

  chooseSchemes() {
    const { checked, noteA, noteB } = this.state;
    const { updateAppState, schemesIds } = this.props;

    updateAppState({
      chosenSchemes: checked.map((checkId, index) => ({
        id: schemesIds[checkId],
        note: index ? noteB : noteA,
        revealed: false,
        score: 0,
      })),
      step: ENCOUNTER_STEPS.SCORE,
    });
  }

  render() {
    const {
      classes, deploymentId, strategyId, schemesIds, chosenSchemes, multiplayer, gameId, opponentStep,
    } = this.props;
    const { checked, showDialog } = this.state;

    let header = null;
    if (multiplayer && !opponentStep) {
      header = (
        <CopyToClipboard text={`${URL}/join/${gameId}`}>
          <ListItem button>
            <ListItemText
              primaryTypographyProps={{ color: 'primary' }}
              primary="Click here to copy link for opponent."
            />
          </ListItem>
        </CopyToClipboard>
      );
    } else if (multiplayer) {
      header = (
        <ListItem>
          <ListItemText primary={opponentStep === ENCOUNTER_STEPS.CHOOSE
            ? 'Opponent is choosing schemes.' : 'Opponent choosed schemes.'}
          />
        </ListItem>
      );
    } else {
      header = (
        <ListItem>
          <ListItemText primary={`Encounter ID: ${calculateEncounterId(deploymentId, strategyId, schemesIds)}`} />
        </ListItem>
      );
    }

    return (
      <>
        <Paper className={classes.paper}>
          <List>
            {header}
            <Divider />
            <EncounterElement
              type={eeType.deployment}
              details={deployments[deploymentId]}
            />
            <Divider />
            <EncounterElement
              type={eeType.strategy}
              details={strategies[strategyId]}
            />
            <Divider />
            {schemesIds.map((schemeId, index) => (
              <EncounterElement
                key={schemes[schemeId].name}
                type={eeType.scheme}
                details={schemes[schemeId]}
                index={index}
                handleToggle={this.handleToggle}
                checked={checked.indexOf(index) !== -1}
                chosenSchemes={chosenSchemes}
              />
            ))}
            <Button
              fullWidth
              onClick={this.openDialog}
              disabled={checked.length !== 2}
              color="primary"
            >
              {'choose schemes'}
            </Button>
          </List>
        </Paper>
        {checked.length === 2 && (
          <Dialog
            classes={{ paper: classes.dialogPaper }}
            open={showDialog}
            onClose={this.closeDialog}
          >
            <DialogTitle
              onClose={this.closeDialog}
              className={classes.dialogTitle}
              disableTypography
            >
              <Typography variant="h6">Confirm schemes choice</Typography>
              <IconButton className={classes.dialogCloseButton} onClick={this.closeDialog}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <Typography align="justify">You can add notes to chosen schemes.</Typography>
              <TextField
                margin="dense"
                id="note-a"
                label={`${schemes[schemesIds[checked[0]]].name} notes:`}
                type="text"
                onChange={event => this.updateNote(event, 'a')}
                fullWidth
                autoComplete="off"
              />
              <TextField
                margin="dense"
                id="note-b"
                label={`${schemes[schemesIds[checked[1]]].name} notes:`}
                type="text"
                onChange={event => this.updateNote(event, 'b')}
                fullWidth
                autoComplete="off"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.closeDialog} color="secondary">
                {'Cancel'}
              </Button>
              <Button onClick={this.chooseSchemes} color="primary" autoFocus>
                {'Choose'}
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </>
    );
  }
}

export default withStyles(styles)(EncounterElementsList);
