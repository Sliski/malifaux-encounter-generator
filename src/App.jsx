import React, { Component } from 'react';
import io from 'socket.io-client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ls from 'local-storage';
import { withStyles } from '@material-ui/core/styles';
import {
  Button, CssBaseline, Dialog, DialogContent, DialogActions, DialogContentText, Grid,
} from '@material-ui/core';
import NavigationBar from './NavigationBar.jsx';
import Generator from './Generator.jsx';
import EncounterElementsList from './EncounterElementsList.jsx';
import ChooseEncounter from './ChooseEncounter.jsx';
import RulesPage from './RulesPage.jsx';
import Score from './Score.jsx';
import Contact from './Contact.jsx';
import Copyrights from './Copyrights.jsx';
import CookiePolicy from './CookiePolicy.jsx';
import EnableLogin from './EnableLogin.jsx';
import styles from './styles.jsx';
import { API_URL } from './config.js';

export const socket = io(API_URL);

export const ENCOUNTER_STEPS = {
  MANUAL_CHOICE: -1,
  GENERATE: 0,
  CHOOSE: 1,
  SCORE: 2,
};

const emptyState = {
  deploymentId: null,
  strategyId: null,
  schemesIds: null,
  chosenSchemes: [],
  strategyScore: [0, 0],
  step: ENCOUNTER_STEPS.GENERATE,
};

class App extends Component {
  constructor(props) {
    super(props);

    if (ls.get('state')) {
      this.state = ls.get('state');
    } else {
      this.state = { ...emptyState };
    }

    this.updateAppState = this.updateAppState.bind(this);
    this.clearAppState = this.clearAppState.bind(this);

    this.encounter = this.encounter.bind(this);
    this.chooseEncounter = this.chooseEncounter.bind(this);
    this.generate = this.generate.bind(this);
    this.choose = this.choose.bind(this);
    this.score = this.score.bind(this);
    this.closeLsInfo = this.closeLsInfo.bind(this);
  }

  componentDidMount() {
    if (ls.get('loginEnabled')) {
      socket.on('connect', () => {
        fetch(`${API_URL}/set-socket/${socket.id}`, { credentials: 'include' });
      });
    }
  }

  closeLsInfo() {
    ls.set('ls-info', true);
    this.setState({ lsInfo: true });
  }

  updateAppState(state) {
    this.setState(state);
  }

  clearAppState() {
    this.setState({ ...emptyState, lsInfo: ls.get('ls-info') });
  }

  encounter() {
    const { step } = this.state;
    switch (step) {
      case ENCOUNTER_STEPS.CHOOSE:
        return this.choose;
      case ENCOUNTER_STEPS.SCORE:
        return this.score;
      case ENCOUNTER_STEPS.MANUAL_CHOICE:
        return this.chooseEncounter;
      default:
        return this.generate;
    }
  }

  generate() {
    return <Generator updateAppState={this.updateAppState} />;
  }

  chooseEncounter() {
    return <ChooseEncounter updateAppState={this.updateAppState} />;
  }

  choose() {
    const {
      deploymentId, strategyId, schemesIds,
    } = this.state;
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

  rules({ match }) {
    return <RulesPage sectionName={match.params.section} />;
  }

  render() {
    ls.set('state', this.state);

    const { lsInfo, step } = this.state;
    const { classes } = this.props;

    return (
      <>
        <Router>
          <CssBaseline />
          <div className={classes.appContent}>
            <NavigationBar handleEndEncounter={this.clearAppState} step={step} />
            <main className={classes.main}>
              <div className={classes.toolbar} />
              <Grid container justify="center">
                <Switch>
                  <Route path="/" exact component={this.encounter()} />
                  <Route path="/rules/:section" component={this.rules} />
                  <Route path="/contact" component={() => <Contact />} />
                  <Route path="/cookiepolicy" component={() => <CookiePolicy />} />
                  <Route path="/copyrights" component={() => <Copyrights />} />
                  {/* temporary way to enable login */}
                  <Route path="/enable-login" component={() => <EnableLogin />} />
                  <Route component={this.encounter()} />
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
            <DialogContentText align="justify">
              {'This website use local storage and cookies to save data between sessions. Anonymous data of user behavior is collected to improve the tool usability. If you use our website, we assume that you accept our cookie policy. To find out more, read Cookie Policy section.'}
            </DialogContentText>
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
