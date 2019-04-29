import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  paper: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: theme.palette.background.paper,
  },
});

class Generator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
    };

    this.generateEncounter = this.generateEncounter.bind(this);
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
    });

    this.setState({
      redirect: true,
      hash: `${deploymentId};${strategyId};${schemesIds}`,
    });
  }

  render() {
    const { redirect, hash } = this.state;
    if (redirect) return <Redirect to={`/choose#${hash}`} />;
    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <List>
          <Button fullWidth color="primary" onClick={this.generateEncounter}>Generate encounter</Button>
          <Button fullWidth color="primary" disabled>Import encounter</Button>
        </List>
      </Paper>
    );
  }
}

export default withStyles(styles)(Generator);
