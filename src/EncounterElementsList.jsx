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
  papper: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class EncounterElementsList extends Component {
  constructor(props) {
    super(props);

    const hashArgs = window.location.hash.split(/#|;/);

    this.state = {
      deploymentId: hashArgs[1],
      strategyId: hashArgs[2],
      schemesIds: hashArgs[3] ? hashArgs[3].split(',') : null,
      checked: [],
      redirectToScore: false,
    };

    this.generateEncoutner = this.generateEncoutner.bind(this);
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

  generateEncoutner() {
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

    this.setState({
      deploymentId,
      strategyId,
      schemesIds,
    });

    window.location.hash = `${deploymentId};${strategyId};${schemesIds}`;

    this.props.updateAppState({
      deploymentId,
      strategyId,
      schemesIds,
    });
  }

  chooseSchemes() {
    const { checked } = this.state;
    const { updateAppState } = this.props;

    updateAppState({
      choosenSchemes: checked.map(id => ({
        id,
        note: 'note',
        revealed: false,
      })),
    });
    this.setState({
      redirectToScore: true,
    });
  }

  render() {
    const { classes } = this.props;
    const {
      deploymentId, strategyId, schemesIds, checked, redirectToScore,
    } = this.state;

    return (
      <>
        {redirectToScore && <Redirect to="/score" />}
        <Paper className={classes.papper}>
          {(deploymentId !== null && strategyId !== null && schemesIds !== null
          && (
          <List>
            <EncounterElement type={eeType.deployment} details={deployments[deploymentId]} />
            <Divider />
            <EncounterElement type={eeType.strategy} details={strategies[strategyId]} />
            <Divider />
            {schemesIds.map((schemeId, index) => (
              <EncounterElement
                key={schemes[schemeId].name}
                type={eeType.scheme}
                details={schemes[schemeId]}
                index={index}
                handleToggle={this.handleToggle}
                checked={checked.indexOf(index) !== -1}
              />
            ))}
            <Button
              fullWidth
              onClick={this.chooseSchemes}
              disabled={checked.length !== 2}
            >
              {'Choose schemes'}
            </Button>
          </List>
          ))
        || (
          <List>
            <Button fullWidth onClick={this.generateEncoutner}>Generate encounter</Button>
            <Button fullWidth disabled>Import encounter</Button>
          </List>
        )}
        </Paper>
      </>
    );
  }
}

export default withStyles(styles)(EncounterElementsList);
