import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Redirect } from 'react-router';
import { ScoreList } from './EncounterElementsList.jsx';

const styles = theme => ({
  paper: {
    width: '40px',
    backgroundColor: theme.palette.background.paper,
  },
});

class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round: 1,
      strategyScore: [0, 0],
      schemeScore: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
      log: '',
    };

    this.changeSchemeScore = this.changeSchemeScore.bind(this);
  }

  changeSchemeScore() {
    this.setState(prevState => ({ strategyScore: [(prevState.strategyScore[0] + 1) % 5, prevState.strategyScore] }));
  }

  render() {
    const { strategyScore, schemeScore, round } = this.state;
    const {
      classes, deploymentId, strategyId, schemesIds, chosenSchemes,
    } = this.props;

    if (deploymentId === null || strategyId === null || !schemesIds || !chosenSchemes) return <Redirect to="/generate" />;
    return (
      <>
        <ScoreList
          deploymentId={deploymentId}
          strategyId={strategyId}
          schemesIds={schemesIds}
          updateAppState={null}
          score
        />
        <Paper className={classes.paper}>
          <List>
            <ListItem>
              <ListItemText primary={schemeScore[0].reduce((a, b) => a + b, 0) + strategyScore[0]} />
            </ListItem>
            <Divider />
            <ListItem button onClick={this.changeSchemeScore}>
              <ListItemText primary={strategyScore[0]} />
            </ListItem>
            <Divider />
            {schemeScore[0].map((it, index) => (
              <ListItem alignItems="center" disabled={!it} button key={`${schemesIds[index]}item`}>
                <ListItemText key={schemesIds[index]} primary={it || '-'} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </>
    );
  }
}

export default withStyles(styles)(Score);
