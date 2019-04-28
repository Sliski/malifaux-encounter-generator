import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AddCircleRounded from '@material-ui/icons/AddCircleRounded';
import EncounterElementsList from './EncounterElementsList.jsx';

import { strategies, deployments, schemes } from './data.jsx';

const styles = theme => ({
  papper: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class Score extends Component {
  render() {
    const { classes, strategyId } = this.props;
    return (
      <>
        <div>{JSON.stringify(this.props)}</div>
      <Paper className={classes.papper}>
      </Paper>
      <EncounterElementsList />
      </>
    );
  }
}

export default withStyles(styles)(Score);
