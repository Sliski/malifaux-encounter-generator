import React, { Component } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions, Divider, IconButton, Typography,
  List, ListItem, ListItemText, Paper,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles.jsx';
import EncounterElement, { eeType } from './EncounterElement';
import { schemes, strategies } from './data';

class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {
      log: '',
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
    const { strategyScore, updateAppState } = this.props;
    updateAppState({ strategyScore: [(strategyScore[0] + 1) % 5, strategyScore[1]] });
  }

  changeSchemeScore(schemeId) {
    const { chosenSchemes, updateAppState } = this.props;
    updateAppState({
      chosenSchemes: chosenSchemes.map(chosenScheme => (
        chosenScheme.id === schemeId ? {
          ...chosenScheme,
          score: (chosenScheme.score + 1) % 3,
        } : chosenScheme
      )),
    });
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
    const { chosenSchemes, updateAppState } = this.props;
    const { schemeIndex } = this.state;

    this.closeRevealDialog();
    this.closeConfirmationDialog();

    updateAppState({
      chosenSchemes: [
        { ...chosenSchemes[schemeIndex], revealed: true },
        chosenSchemes[(schemeIndex + 1) % 2],
      ].sort((a, b) => a.id - b.id),
    });
  }

  nextRound() {
    this.closeNewRoundDialog();
    const { round, updateAppState } = this.props;
    updateAppState({ round: round + 1 });
  }

  render() {
    const {
      showSchemeDialog, showConfirmationDialog, showNewRoundDialog, schemeIndex, nextRound,
    } = this.state;
    const {
      classes, strategyId, schemesIds, strategyScore, chosenSchemes, round,
    } = this.props;

    return (
      <>
        <Paper className={classes.paper}>
          <List>
            <ListItem button={round < 5} onClick={round < 5 ? this.openNewRoundDialog : undefined}>
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
            <Divider />
            <ListItem divider>
              <ListItemText
                primaryTypographyProps={{
                  color: 'default',
                  variant: 'button',
                }}
                className={classes.noMarginNoPadding}
              >
                {'Total Score'}
              </ListItemText>
              <Typography
                color="default"
                align="center"
                variant="button"
                className={classes.myScore}
              >
                {strategyScore[0] + chosenSchemes[0].score + chosenSchemes[1].score}
              </Typography>
            </ListItem>
            <EncounterElement
              type={eeType.strategy}
              details={strategies[strategyId]}
              strategyScore={strategyScore}
              scoreHandler={this.changeStrategyScore}
              score
            />
            <Divider />
            {schemesIds.map((schemeId, index) => (
              <EncounterElement
                key={schemes[schemeId].name}
                type={eeType.scheme}
                details={schemes[schemeId]}
                index={index}
                chosenSchemes={chosenSchemes}
                scoreHandler={() => this.changeSchemeScore(schemeId)}
                score
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

export default withStyles(styles)(Score);
