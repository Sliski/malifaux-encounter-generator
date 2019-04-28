import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import NavigationBar from './NavigationBar.jsx';
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
    this.state = {
      deploymentId: null,
      strategyId: null,
      schemesIds: null,
      choosenSchemes: [],
    };

    this.updateAppState = this.updateAppState.bind(this);
    this.encounterElementsList = this.encounterElementsList.bind(this);
    this.score = this.score.bind(this);
  }

  updateAppState(state) {
    this.setState(state);
  }

  encounterElementsList() {
    return <EncounterElementsList updateAppState={this.updateAppState} />;
  }

  div(a) {
    return <div className="zxc">aaaa</div>;
  }

  score() {
    const { choosenSchemes, strategyId } = this.state;
    return <Score strategyId={strategyId} choosenSchemes={choosenSchemes} />;
  }

  notFound() {
    return <div>404</div>;
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
                <Route path="/" exact component={this.encounterElementsList} />
                <Route path="/choose" component={this.div} />
                <Route path="/score" component={this.score} />
                <Route component={this.notFound} />
              </Switch>
            </Grid>
          </main>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(App);
