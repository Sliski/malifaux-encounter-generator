import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import styles from './styles.jsx';

class Generator extends Component {
  constructor(props) {
    super(props);

    this.generateEncounter = this.generateEncounter.bind(this);
    this.importEncounter = this.importEncounter.bind(this);
  }

  generateEncounter() {
    const { updateAppState } = this.props;

    const allSchemesIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const schemesIds = [];
    for (let i = 0; i < 5; i += 1) {
      schemesIds.push(
        allSchemesIds.splice(Math.floor((Math.random() * allSchemesIds.length)), 1)[0],
      );
    }
    schemesIds.sort((a, b) => a - b);
    const deploymentId = Math.floor((Math.random() * 4));
    const strategyId = Math.floor((Math.random() * 4));

    updateAppState({
      deploymentId,
      strategyId,
      schemesIds,
      step: 1,
    });
  }

  importEncounter() {
    const { updateAppState } = this.props;

    updateAppState({
      deploymentId: 0,
      strategyId: 3,
      schemesIds: [1, 3, 6, 7, 10],
      step: 1,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <List>
          <Button fullWidth color="primary" onClick={this.generateEncounter}>
            {'Generate ncounter'}
          </Button>
          <Button fullWidth color="primary" onClick={this.importEncounter}>Import encounter</Button>
        </List>
      </Paper>
    );
  }
}

export default withStyles(styles)(Generator);
