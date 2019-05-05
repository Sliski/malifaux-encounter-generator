import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import styles from './styles.jsx';
import EncounterElement, { eeType } from './EncounterElement';
import { deployments, strategies, schemes } from './data';

class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {
      log: '',
      schemeIndex: 0,
      showSchemeDialog: false,
      showConfirmationDialog: false,
    };

    this.changeStrategyScore = this.changeStrategyScore.bind(this);
    this.openRevealDialog = this.openRevealDialog.bind(this);
    this.closeRevealDialog = this.closeRevealDialog.bind(this);
    this.openConfirmationDialog = this.openConfirmationDialog.bind(this);
    this.closeConfirmationDialog = this.closeConfirmationDialog.bind(this);
    this.revealScheme = this.revealScheme.bind(this);
  }

  changeStrategyScore() {
    const { strategyScore, updateAppState } = this.props;
    updateAppState({ strategyScore: [(strategyScore[0] + 1) % 5, strategyScore] });
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

  render() {
    // TODO add round counter
    const {
      showSchemeDialog, showConfirmationDialog, schemeIndex,
    } = this.state;
    const {
      classes, deploymentId, strategyId, schemesIds, strategyScore, chosenSchemes, round,
    } = this.props;

    return (
      <>
        <Paper className={classes.paper}>
          <List>
            <EncounterElement
              type={eeType.deployment}
              details={deployments[deploymentId]}
              score
            />
            <Divider />
            <EncounterElement
              type={eeType.strategy}
              details={strategies[strategyId]}
              strategyScore={strategyScore[0]}
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
          <DialogTitle onClose={this.closeRevealDialog} className={classes.dialogTitle} disableTypography>
            <Typography variant="h6">Reveal Scheme</Typography>
            <IconButton className={classes.dialogCloseButton} onClick={this.closeRevealDialog}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent className={classes.dialogContentWoPadding}>
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
      </>
    );
  }
}

export default withStyles(styles)(Score);
