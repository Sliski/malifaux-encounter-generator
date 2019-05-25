import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import ls from 'local-storage';
import { withStyles } from '@material-ui/core/styles';
import {
  Button, CssBaseline, Dialog, DialogContent, DialogActions, DialogContentText, Grid,
} from '@material-ui/core';
import NavigationBar from './NavigationBar.jsx';
import Encounter from './Encounter.jsx';
import RulesPage from './RulesPage.jsx';
import Contact from './Contact.jsx';
import Copyrights from './Copyrights.jsx';
import CookiePolicy from './CookiePolicy.jsx';
import EnableLogin from './EnableLogin.jsx';
import Join from './Join.jsx';
import styles from './styles.jsx';
import { socket, setSocket } from './backEndConnector.js';

export const ENCOUNTER_STEPS = {
  MANUAL_CHOICE: 0,
  GENERATE: 1,
  CHOOSE: 2,
  SCORE: 3,
  FINISHED_GAME: 4,
};

export const ENCOUNTER_MAIN_LINK_TEXT = {
  0: 'Choose Encounter',
  1: 'Create New',
  2: 'Choose Schemes',
  3: 'Score',
};

const emptyState = {
  userRole: '',
  deploymentId: null,
  strategyId: null,
  schemesIds: null,
  round: 1,
  chosenSchemes: [],
  opponentSchemes: [],
  strategyScore: [0, 0],
  step: ENCOUNTER_STEPS.GENERATE,
  multiplayer: false,
  opponentStep: null,
  gameId: '',
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
    this.join = this.join.bind(this);
    this.closeLsInfo = this.closeLsInfo.bind(this);
  }

  componentDidMount() {
    if (ls.get('betaUser')) {
      socket.on('connect', () => {
        setSocket();
      });
    }
  }

  closeLsInfo() {
    ls.set('ls-info', true);
    this.setState({ lsInfo: true });
  }

  updateAppState(state) {
    console.log(`updateappstate${JSON.stringify(state)}`);
    this.setState(state);
  }

  clearAppState() {
    this.setState({ ...emptyState, lsInfo: ls.get('ls-info') });
  }

  encounter() {
    const { state, updateAppState } = this;
    return <Encounter {...state} updateAppState={updateAppState} />;
  }

  rules({ match }) {
    return <RulesPage sectionName={match.params.section} />;
  }

  join({ match }) {
    const { signed } = this.state;
    return (
      <Join
        updateAppState={this.updateAppState}
        signed={signed}
        gameId={match.params.gameId}
      />
    );
  }

  render() {
    ls.set('state', this.state);

    const {
      lsInfo, step, deploymentId, signed,
    } = this.state;
    const { classes } = this.props;

    return (
      <>
        <Router>
          <CssBaseline />
          <div className={classes.appContent}>
            <NavigationBar
              handleEndEncounter={this.clearAppState}
              step={step}
              deploymentId={deploymentId}
              updateAppState={this.updateAppState}
              signed={signed}
            />
            <main className={classes.main}>
              <div className={classes.toolbar} />
              <Grid container justify="center">
                <Switch>
                  <Route path="/" exact component={this.encounter} />
                  <Route path="/rules/:section" component={this.rules} />
                  <Route path="/contact" component={() => <Contact />} />
                  <Route path="/cookiepolicy" component={() => <CookiePolicy />} />
                  <Route path="/copyrights" component={() => <Copyrights />} />
                  <Route path="/join/:gameId" component={this.join} />
                  {/* temporary way to enable login */}
                  <Route path="/enable-login" component={() => <EnableLogin ua={this.updateAppState} />} />
                  <Route component={() => <Redirect to="/" />} />
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
              {'This website use local storage and cookies to save data between sessions. Anonymous data of user behavior is collected to improve the tool usability. If you use our website, we assume that you accept our cookie policy. To find out more, read Cookies and Privacy section.'}
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
