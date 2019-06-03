import React, { Component } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions, Divider, IconButton, Typography,
  List, ListItem, ListItemText, Paper,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles.jsx';
import { ENCOUNTER_STEPS } from './App.jsx';
import EncounterElement, { eeType } from './EncounterElement.jsx';
import MultiplayerLinkButton from './MultiplayerLinkButton.jsx';
import { schemes, strategies } from './data.jsx';
import {
  revealScheme, scoreScheme, scoreStrategy, startRound,
} from './backEndConnector.js';

class MultiplayerScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schemeIndex: 0,
      showSchemeDialog: false,
      showConfirmationDialog: false,
      showNewRoundDialog: false,
      nextRound: props.round + 1,
    };

    this.changeStrategyScore = this.changeStrategyScore.bind(this);
    this.openRevealDialog = this.openRevealDialog.bind(this);
    this.closeRevealDialog = this.closeRevealDialog.bind(this);
    this.openConfirmationDialog = this.openConfirmationDialog.bind(this);
    this.closeConfirmationDialog = this.closeConfirmationDialog.bind(this);
    this.openNewRoundDialog = this.openNewRoundDialog.bind(this);
    this.closeNewRoundDialog = this.closeNewRoundDialog.bind(this);
    this.revealScheme = this.revealScheme.bind(this);
    this.nextRound = this.nextRound.bind(this);
  }

  componentDidMount() {
    this.props.getAppStateFromDb();
  }

  changeStrategyScore() {
    const {
      strategyScore, updateAppState, gameId, signed,
    } = this.props;
    const newScore = (strategyScore[0] + 1) % 5;
    const newAppState = { strategyScore: [newScore, strategyScore[1]] };
    if (signed && gameId) {
      scoreStrategy(gameId, newScore, () => updateAppState({ ...newAppState }));
    } else {
      updateAppState({ ...newAppState });
    }
  }

  changeSchemeScore(schemeId) {
    const {
      chosenSchemes, updateAppState, gameId, signed,
    } = this.props;
    const newScore = (chosenSchemes.find(scheme => scheme.id === schemeId).score + 1) % 3;

    const updateState = () => {
      updateAppState({
        chosenSchemes: chosenSchemes.map(chosenScheme => (
          chosenScheme.id === schemeId ? {
            ...chosenScheme,
            score: newScore,
          } : chosenScheme
        )),
      });
    };

    if (signed && gameId) {
      scoreScheme(gameId, schemeId, newScore, updateState);
    } else {
      updateState();
    }
  }

  openRevealDialog() {
    this.setState({ showSchemeDialog: true });
  }

  closeRevealDialog() {
    this.setState({ showSchemeDialog: false });
  }

  openConfirmationDialog(schemeIndex) {
    this.setState({ showConfirmationDialog: true, schemeIndex });
  }

  closeConfirmationDialog() {
    this.setState({ showConfirmationDialog: false });
  }

  openNewRoundDialog() {
    const { round } = this.props;
    this.setState({ nextRound: round + 1, showNewRoundDialog: true });
  }

  closeNewRoundDialog() {
    this.setState({ showNewRoundDialog: false });
  }

  revealScheme() {
    const {
      chosenSchemes, updateAppState, gameId, signed,
    } = this.props;
    const { schemeIndex } = this.state;

    const newAppState = {
      chosenSchemes: [
        { ...chosenSchemes[schemeIndex], revealed: true },
        chosenSchemes[(schemeIndex + 1) % 2],
      ].sort((a, b) => a.id - b.id),
    };

    if (signed && gameId) {
      revealScheme(gameId, chosenSchemes[schemeIndex].id, () => updateAppState({ ...newAppState }));
    } else {
      updateAppState({ ...newAppState });
    }

    this.closeRevealDialog();
    this.closeConfirmationDialog();
  }

  nextRound() {
    const {
      updateAppState, signed, gameId,
    } = this.props;
    const { nextRound } = this.state;
    this.closeNewRoundDialog();
    if (signed && gameId) {
      startRound(gameId, nextRound, () => updateAppState({ round: nextRound }));
    } else {
      updateAppState({ round: nextRound });
    }
  }

  render() {
    const {
      showSchemeDialog, showConfirmationDialog, showNewRoundDialog, schemeIndex, nextRound,
    } = this.state;
    const {
      classes, strategyId, schemesIds, strategyScore, chosenSchemes, round, opponentStep, gameId, opponentSchemes,
    } = this.props;

    let header = null;
    if (!opponentStep) {
      header = <MultiplayerLinkButton gameId={gameId} />;
    } else if (opponentStep !== ENCOUNTER_STEPS.SCORE) {
      header = (
        <ListItem className={classes.llPadding}>
          <ListItemText primary={opponentStep === ENCOUNTER_STEPS.FINISHED_GAME
            ? 'Opponent marked game as finished.' : 'Opponent is choosing schemes.'}
          />
        </ListItem>
      );
    } else {
      header = (
        <ListItem
          className={classes.llPadding}
          button={round < 5}
          onClick={round < 5 ? this.openNewRoundDialog : undefined}
        >
          <ListItemText primary="Round" />
          <Typography
            color="default"
            align="center"
            variant="button"
            className={classes.myScore}
          >
            {round}
          </Typography>
        </ListItem>
      );
    }

    return (
      <>
        <Paper className={classes.paper}>
          <List>
            {header}
            <Divider />
            <ListItem className={classes.listItemButtonConstHeight} divider>
              <Typography
                color="secondary"
                align="center"
                variant="button"
                className={classes.opponentScore}
              >
                {strategyScore[1] + (opponentSchemes ? opponentSchemes
                  .reduce((out, current) => out + (current.revealed ? current.score : 0), 0) : 0)}
              </Typography>
              <ListItemText primaryTypographyProps={{
                align: 'left',
                color: 'secondary',
                variant: 'button',
              }}
              >
                {'Opponent\'s Score'}
              </ListItemText>
              <ListItemText
                primaryTypographyProps={{
                  align: 'right',
                  color: 'primary',
                  variant: 'button',
                }}
                className={classes.noMarginNoPadding}
              >
                {'My Score'}
              </ListItemText>
              <Typography
                color="primary"
                align="center"
                variant="button"
                className={classes.myScore}
              >
                {strategyScore[0] + chosenSchemes
                  .reduce((out, current) => out + (current.revealed ? current.score : 0), 0)}
              </Typography>
            </ListItem>
            <EncounterElement
              type={eeType.strategy}
              details={strategies[strategyId]}
              strategyScore={strategyScore}
              scoreHandler={this.changeStrategyScore}
              score
              multiplayer
            />
            <Divider />
            {schemesIds.map((schemeId, index) => (
              <EncounterElement
                key={schemes[schemeId].name}
                type={eeType.scheme}
                details={schemes[schemeId]}
                index={index}
                chosenSchemes={chosenSchemes}
                opponentScheme={opponentSchemes
                && opponentSchemes.find(scheme => scheme.id === schemeId && scheme.revealed === true)}
                scoreHandler={() => this.changeSchemeScore(schemeId)}
                score
                multiplayer
              />
            ))}
            <Button fullWidth color="primary" onClick={this.openRevealDialog}>Reveal scheme</Button>
          </List>
        </Paper>
        <Dialog
          classes={{ paper: classes.dialogPaper }}
          open={showSchemeDialog}
          onClose={this.closeRevealDialog}
        >
          <DialogTitle
            onClose={this.closeRevealDialog}
            className={classes.dialogTitle}
            disableTypography
          >
            <Typography variant="h6">Reveal Scheme</Typography>
            <IconButton className={classes.dialogCloseButton} onClick={this.closeRevealDialog}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent className={classes.noMarginNoPadding}>
            <List>
              {chosenSchemes.map((chosenScheme, index) => (
                <ListItem
                  key={`${chosenScheme.id}-item`}
                  button
                  onClick={() => this.openConfirmationDialog(index)}
                  disabled={chosenScheme.revealed}
                >
                  <ListItemText
                    key={chosenScheme.id}
                    primary={schemes[chosenScheme.id].name}
                    secondary={chosenScheme.note}
                  />
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Dialog>
        <Dialog
          classes={{ paper: classes.dialogPaper }}
          open={showConfirmationDialog}
          onClose={this.closeConfirmationDialog}
        >
          <DialogContent className={classes.dialogContent}>
            <Typography>{`Do you want to reveal the ${schemes[chosenSchemes[schemeIndex].id].name} scheme?`}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeConfirmationDialog} color="secondary">
              {'Cancel'}
            </Button>
            <Button onClick={this.revealScheme} color="primary" autoFocus>
              {'Reveal'}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          classes={{ paper: classes.dialogPaper }}
          open={showNewRoundDialog}
          onClose={this.closeNewRoundDialog}
        >
          <DialogContent className={classes.dialogContent}>
            <Typography>{`Do you want to start round ${nextRound}?`}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeNewRoundDialog} color="secondary">
              {'Cancel'}
            </Button>
            <Button onClick={this.nextRound} color="primary" autoFocus>
              {'Start'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(MultiplayerScore);
