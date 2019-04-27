import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import NavigationBar from './NavigationBar.jsx';
import EncounterElementsList from './EncounterElementsList.jsx';

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
      temp: null,
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <CssBaseline />
        <div className={classes.root}>
          <NavigationBar />
          <main className={classes.main}>
            <div className={classes.toolbar} />
            <Grid container justify="center">
              <EncounterElementsList />
            </Grid>
          </main>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(App);
