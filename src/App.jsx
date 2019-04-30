import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ls from 'local-storage';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import NavigationBar from './NavigationBar.jsx';
import Generator from './Generator.jsx';
import EncounterElementsList from './EncounterElementsList.jsx';
import Score from './Score.jsx';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  main: {
    flexGrow: 1,
    padding: theme.spacing.unit,
  },
  toolbar: theme.mixins.toolbar,
});

const ENCOUNTER_STEPS = {
  GENERATE: 0,
  CHOOSE: 1,
  SCORE: 2,
};

class App extends Component {
  constructor(props) {
    super(props);

    if (window.location.hash === '#clear') {
      window.location.hash = '';
      this.state = {
        deploymentId: null,
        strategyId: null,
        schemesIds: null,
        chosenSchemes: [],
        strategyScore: [0, 0],
        step: ENCOUNTER_STEPS.GENERATE,
        lsInfo: ls.get('ls-info'),
      };
    } else if (ls.get('state')) {
      this.state = ls.get('state');
    } else {
      this.state = {
        deploymentId: null,
        strategyId: null,
        schemesIds: null,
        chosenSchemes: [],
        strategyScore: [0, 0],
        step: ENCOUNTER_STEPS.GENERATE,
        lsInfo: ls.get('ls-info'),
      };
    }

    this.updateAppState = this.updateAppState.bind(this);

    this.encounter = this.encounter.bind(this);
    this.generate = this.generate.bind(this);
    this.choose = this.choose.bind(this);
    this.score = this.score.bind(this);
    this.closeLsInfo = this.closeLsInfo.bind(this);
  }

  closeLsInfo() {
    ls.set('ls-info', true);
    this.setState({ lsInfo: true });
  }

  updateAppState(state) {
    this.setState(state);
  }

  encounter() {
    const { step } = this.state;
    switch (step) {
      case ENCOUNTER_STEPS.CHOOSE:
        return this.choose;
      case ENCOUNTER_STEPS.SCORE:
        return this.score;
      default:
        return this.generate;
    }
  }

  generate() {
    return <Generator updateAppState={this.updateAppState} />;
  }

  choose() {
    const { deploymentId, strategyId, schemesIds } = this.state;
    return (
      <EncounterElementsList
        deploymentId={deploymentId}
        strategyId={strategyId}
        schemesIds={schemesIds}
        updateAppState={this.updateAppState}
        score={false}
      />
    );
  }

  score() {
    const {
      chosenSchemes, deploymentId, strategyId, schemesIds, strategyScore, round,
    } = this.state;
    return (
      <Score
        deploymentId={deploymentId}
        strategyId={strategyId}
        schemesIds={schemesIds}
        chosenSchemes={chosenSchemes}
        strategyScore={strategyScore}
        round={round}
        updateAppState={this.updateAppState}
      />
    );
  }

  render() {
    ls.set('state', this.state);

    const { lsInfo } = this.state;
    const { classes } = this.props;
    return (
      <>
        <Router>
          <CssBaseline />
          <div className={classes.root}>
            <NavigationBar />
            <main className={classes.main}>
              <div className={classes.toolbar} />
              <Grid container justify="center">
                <Switch>
                  <Route path="/" component={this.encounter()} />
                </Switch>
              </Grid>
            </main>
          </div>
        </Router>
        <Dialog
          open={!lsInfo}
          onClose={this.closeLsInfo}
        >
          <DialogContent className={classes.content}>
            <DialogContentText>This App use local storage.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeLsInfo} color="primary">
              {'OK'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(App);
