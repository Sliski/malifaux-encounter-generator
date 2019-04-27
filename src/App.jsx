import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import EncounterElementsList from './EncounterElementsList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: null,
    };
  }

  render() {
    return (
      <Grid container justify="center">
        <CssBaseline />
        <EncounterElementsList />
      </Grid>
    );
  }
}

export default App;
