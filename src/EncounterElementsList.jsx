import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import EncounterElement, { eeType } from './EncounterElement.jsx';
import { strategies, deployments, schemes } from './data.jsx';

const styles = theme => ({
  paper: {
    width: '360px',
    backgroundColor: theme.palette.background.paper,
  },
});

const scoreStyles = theme => ({
  paper: {
    width: '320px',
    backgroundColor: theme.palette.background.paper,
  },
});

class EncounterElementsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: [],
      redirect: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.chooseSchemes = this.chooseSchemes.bind(this);
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  chooseSchemes() {
    const { checked } = this.state;
    const { updateAppState, schemesIds } = this.props;

    updateAppState({
      chosenSchemes: checked.map(checkId => ({
        id: schemesIds[checkId],
        note: 'note',
        revealed: false,
        score: 0,
      })),
    });
    this.setState({
      redirect: true,
    });
  }

  render() {
    const {
      classes, deploymentId, strategyId, schemesIds, score, button,
    } = this.props;
    const { checked, redirect } = this.state;

    if (redirect) return <Redirect to="/score" />;
    if (deploymentId === null || strategyId === null || !schemesIds) return <Redirect to="/generate" />;

    return (
      <Paper className={classes.paper}>
        <List>
          <EncounterElement type={eeType.deployment} details={deployments[deploymentId]} score={score} />
          <Divider />
          <EncounterElement type={eeType.strategy} details={strategies[strategyId]} score={score} />
          <Divider />
          {schemesIds.map((schemeId, index) => (
            <EncounterElement
              key={schemes[schemeId].name}
              type={eeType.scheme}
              details={schemes[schemeId]}
              score={score}
              index={index}
              handleToggle={this.handleToggle}
              checked={checked.indexOf(index) !== -1}
            />
          ))}
          {score ? button
            : (
              <Button
                fullWidth
                onClick={this.chooseSchemes}
                disabled={checked.length !== 2}
                color="primary"
              >
                {'choose schemes'}
              </Button>
            )}
        </List>
      </Paper>
    );
  }
}

export default withStyles(styles)(EncounterElementsList);
export const ScoreList = withStyles(scoreStyles)(EncounterElementsList);
