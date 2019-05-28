import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import EncounterElement, { eeType } from './EncounterElement.jsx';
import { ENCOUNTER_STEPS, CHOOSE_STEPS } from './App.jsx';
import { deployments, schemes, strategies } from './data.jsx';
import styles from './styles.jsx';
import { calculateEncounterId } from './Generator.jsx';
import { createGame } from './backEndConnector.js';

class ChooseEncounter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: [],
      checkedDeployment: 0,
      checkedStrategy: 0,
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.checkDeployment = this.checkDeployment.bind(this);
    this.checkStrategy = this.checkStrategy.bind(this);
    this.confirmChoice = this.confirmChoice.bind(this);
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
      checked: newChecked.sort((a, b) => a - b),
    });
  };

  checkDeployment = value => () => {
    this.setState({ checkedDeployment: value });
  };

  checkStrategy = value => () => {
    this.setState({ checkedStrategy: value });
  };

  confirmChoice() {
    const { checkedDeployment, checkedStrategy, checked } = this.state;
    const {
      updateAppState, signed, multiplayer, chooseCrew,
    } = this.props;

    const newAppState = {
      deploymentId: checkedDeployment,
      strategyId: checkedStrategy,
      schemesIds: checked,
      step: ENCOUNTER_STEPS.CHOOSE,
      chooseStep: chooseCrew ? CHOOSE_STEPS.FACTION : CHOOSE_STEPS.SCHEMES,
    };

    if (signed) {
      createGame(calculateEncounterId(checkedDeployment, checkedStrategy, checked), multiplayer, chooseCrew,
        (response) => {
          if (response && response.status === 'OK' && response.id) {
            updateAppState({ ...newAppState, gameId: response.id });
          }
        });
    } else {
      updateAppState({ ...newAppState });
    }
  }

  render() {
    const { classes } = this.props;
    const { checked, checkedDeployment, checkedStrategy } = this.state;

    return (
      <>
        <Paper className={classes.paper}>
          <List>
            {deployments.map((deployment, index) => (
              <EncounterElement
                key={deployment.name}
                type={eeType.deployment}
                details={deployment}
                handleToggle={this.checkDeployment}
                checked={checkedDeployment === index}
                index={index}
              />
            ))}
            <Divider />
            {strategies.map((strategy, index) => (
              <EncounterElement
                key={strategy.name}
                type={eeType.strategy}
                details={strategy}
                handleToggle={this.checkStrategy}
                checked={checkedStrategy === index}
                index={index}
              />
            ))}
            <Divider />
            {schemes.map((scheme, index) => (
              <EncounterElement
                key={scheme.name}
                type={eeType.scheme}
                details={scheme}
                handleToggle={this.handleToggle}
                index={index}
                checked={checked.includes(index)}
              />
            ))}
            <Button
              fullWidth
              onClick={this.confirmChoice}
              disabled={checked.length !== 5}
              color="primary"
            >
              {'confirm choice'}
            </Button>
          </List>
        </Paper>
      </>
    );
  }
}

export default withStyles(styles)(ChooseEncounter);
