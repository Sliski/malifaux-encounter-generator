import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
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

class App extends Component {
  constructor(props) {
    super(props);

    const hashArgs = window.location.hash.split(/[#;]/);

    this.state = {
      deploymentId: hashArgs[1],
      strategyId: hashArgs[2],
      schemesIds: hashArgs[3] ? hashArgs[3].split(',') : null,
      chosenSchemes: [],
    };

    this.updateAppState = this.updateAppState.bind(this);

    this.generate = this.generate.bind(this);
    this.choose = this.choose.bind(this);
    this.score = this.score.bind(this);
  }

  updateAppState(state) {
    this.setState(state);
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
      chosenSchemes, deploymentId, strategyId, schemesIds,
    } = this.state;
    return (
      <Score
        deploymentId={deploymentId}
        strategyId={strategyId}
        schemesIds={schemesIds}
        chosenSchemes={chosenSchemes}
      />
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Router>
        <CssBaseline />
        <div className={classes.root}>
          <NavigationBar />
          <main className={classes.main}>
            <div className={classes.toolbar} />
            <Grid container justify="center">
              <Switch>
                <Route path="/generate" component={this.generate} />
                <Route path="/" exact component={this.generate} />
                <Route path="/choose" component={this.choose} />
                <Route path="/score" component={this.score} />
              </Switch>
            </Grid>
          </main>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(App);
