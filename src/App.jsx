import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ls from 'local-storage';
import {
  withStyles, Button, CssBaseline, Dialog, DialogContent, DialogActions, DialogContentText, Grid,
} from '@material-ui/core';
import styles from './styles.jsx';
import ErrorPage from './ErrorPage.jsx';
import NavigationBar from './NavigationBar.jsx';
import Encounter from './Encounter.jsx';
import RulesPage from './RulesPage.jsx';
import Contact from './Contact.jsx';
import Copyrights from './Copyrights.jsx';
import CookiePolicy from './CookiePolicy.jsx';
import EnableLogin from './EnableLogin.jsx';
import Join from './Join.jsx';
import Load from './Load.jsx';
import GamesHistory from './myGames/GamesHistory.jsx';
import {
  socket, setSocket, leaveRoom, endGame,
} from './backEndConnector.js';

export const ENCOUNTER_STEPS = {
  MANUAL_CHOICE: 0,
  GENERATE: 1,
  CHOOSE: 2,
  SCORE: 3,
  FINISHED_GAME: 4,
};

export const CHOOSE_STEPS = {
  FACTION: 3,
  LEADER: 2,
  CREW: 1,
  SCHEMES: 0,
};

export const ENCOUNTER_MAIN_LINK_TEXT = {
  0: 'Choose Encounter',
  1: 'Create New',
  2: 'Choose Schemes',
  3: 'Score',
};

export const EMPTY_STATE = {
  userRole: '',
  deploymentId: null,
  strategyId: null,
  schemesIds: null,
  round: 1,
  chosenSchemes: [],
  opponentSchemes: [],
  crew: {
    faction: null,
    leader: null,
    list: null,
  },
  opponentCrew: {
    faction: null,
    leader: null,
    list: null,
  },
  strategyScore: [0, 0],
  step: ENCOUNTER_STEPS.GENERATE,
  chooseStep: null,
  opponentStep: null,
  opponentChooseStep: null,
  multiplayer: false,
  chooseCrew: false,
  gameId: '',
};

class App extends Component {
  constructor(props) {
    super(props);

    if (ls.get('state')) {
      this.state = ls.get('state');
    } else {
      this.state = { ...EMPTY_STATE };
    }

    this.updateAppState = this.updateAppState.bind(this);
    this.handleEndEncounter = this.handleEndEncounter.bind(this);
    this.handleSaveEncounter = this.handleSaveEncounter.bind(this);

    this.encounter = this.encounter.bind(this);
    this.gamesHistory = this.gamesHistory.bind(this);
    this.join = this.join.bind(this);
    this.load = this.load.bind(this);
    this.closeLsInfo = this.closeLsInfo.bind(this);
  }

  componentDidMount() {
    if (ls.get('betaUser')) {
      socket.on('connect', () => {
        setSocket();
      });
    }
  }

  componentDidCatch() {
    this.setState({ errorCatch: true });
  }

  closeLsInfo() {
    ls.set('ls-info', true);
    this.setState({ lsInfo: true });
  }

  updateAppState(state) {
    this.setState(state);
  }

  handleEndEncounter() {
    const { gameId, signed } = this.state;
    const updateState = () => {
      this.setState({ ...EMPTY_STATE, lsInfo: ls.get('ls-info') });
    };
    if (gameId && signed) {
      endGame(gameId, updateState);
      leaveRoom(gameId);
    } else {
      updateState();
    }
  }

  handleSaveEncounter() {
    const { gameId, signed } = this.state;
    const updateState = () => {
      this.setState({ ...EMPTY_STATE, lsInfo: ls.get('ls-info') });
    };
    if (gameId && signed) {
      leaveRoom(gameId);
    }
    updateState();
  }

  encounter() {
    const { state, updateAppState } = this;
    return <Encounter {...state} updateAppState={updateAppState} />;
  }

  gamesHistory() {
    const { signed, gameId } = this.state;
    return <GamesHistory signed={signed} currentGameId={gameId} />;
  }

  // eslint-disable-next-line class-methods-use-this
  rules({ match }) {
    return <RulesPage sectionName={match.params.section} />;
  }

  join({ match }) {
    const { signed, gameId } = this.state;
    return (
      <Join
        updateAppState={this.updateAppState}
        signed={signed}
        gameId={gameId}
        newGameId={match.params.gameId}
      />
    );
  }

  load({ match }) {
    const { signed, gameId } = this.state;
    return (
      <Load
        updateAppState={this.updateAppState}
        signed={signed}
        gameId={gameId}
        newGameId={match.params.gameId}
      />
    );
  }

  render() {
    ls.set('state', this.state);

    const {
      lsInfo, step, deploymentId, signed, errorCatch, gameId,
    } = this.state;
    const { classes } = this.props;

    if (errorCatch) {
      return ErrorPage(() => this.setState({ errorCatch: false }),
        () => {
          ls.clear();
          window.location.reload();
        });
    }

    return (
      <>
        <Router>
          <CssBaseline />
          <div className={classes.appContent}>
            <NavigationBar
              handleEndEncounter={this.handleEndEncounter}
              handleSaveEncounter={this.handleSaveEncounter}
              step={step}
              deploymentId={deploymentId}
              updateAppState={this.updateAppState}
              signed={signed}
              gameId={gameId}
            />
            <main className={classes.main}>
              <div className={classes.toolbar} />
              <Grid container justify="center">
                <Switch>
                  <Route path="/" exact component={this.encounter} />
                  <Route path="/games-history" component={this.gamesHistory} />
                  <Route path="/rules/:section" component={this.rules} />
                  <Route path="/contact" component={() => <Contact />} />
                  <Route path="/cookiepolicy" component={() => <CookiePolicy />} />
                  <Route path="/copyrights" component={() => <Copyrights />} />
                  <Route path="/join/:gameId" component={this.join} />
                  <Route path="/load/:gameId" component={this.load} />
                  {/* temporary way to enable login */}
                  <Route path="/enable-login" component={() => <EnableLogin ua={this.updateAppState} />} />
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
