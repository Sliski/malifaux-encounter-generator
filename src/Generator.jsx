import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import styles from './styles.jsx';

class Generator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDialog: false,
      encounterId: '',
      error: '',
    };

    this.generateEncounter = this.generateEncounter.bind(this);
    this.importEncounter = this.importEncounter.bind(this);
    this.updateEncounterId = this.updateEncounterId.bind(this);

    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  openDialog() {
    this.setState({ showDialog: true });
  }

  closeDialog() {
    this.setState({ showDialog: false });
  }

  updateEncounterId(event) {
    this.setState({ encounterId: event.target.value });
  }

  generateEncounter() {
    const { updateAppState } = this.props;

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

    updateAppState({
      deploymentId,
      strategyId,
      schemesIds,
      step: 1,
    });
  }

  importEncounter() {
    const { updateAppState } = this.props;
    const { encounterId } = this.state;

    if (encounterId.length === 6) {
      const deploymentId = Math.floor(parseInt(encounterId.substring(0, 1), 16) / 4);
      const strategyId = parseInt(encounterId.substring(0, 1), 16) % 4;
      const schemesIds = [...encounterId.substring(1, 6)].map(it => parseInt(it, 16)).sort((a, b) => a - b);

      if (deploymentId >= 0 && deploymentId <= 3
        && strategyId >= 0 && strategyId <= 3
        && schemesIds.length === 5
        && schemesIds.reduce((out, current) => out !== null && current >= 0 && current <= 12)) {
        this.closeDialog();
        updateAppState({
          deploymentId,
          strategyId,
          schemesIds,
          step: 1,
        });
        return;
      }
    }
    this.setState({ error: 'Incorrect encounter ID.' });
  }

  render() {
    const { classes } = this.props;
    const { showDialog, encounterId, error } = this.state;

    return (
      <>
        <Paper className={classes.paper}>
          <List>
            <Button fullWidth color="primary" onClick={this.generateEncounter}>
              {'Generate encounter'}
            </Button>
            <Button fullWidth color="primary" onClick={this.openDialog}>Import encounter</Button>
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
            <Button onClick={this.importEncounter} color="primary" disabled={encounterId.length !== 6}>
              {'Import'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(Generator);
