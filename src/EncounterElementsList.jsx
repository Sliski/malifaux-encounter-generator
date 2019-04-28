import React, { Component } from 'react';
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

    this.state = {
      deploymentId: null,
      strategyId: null,
      schemesIds: null,
    };

    this.generateEncoutner = this.generateEncoutner.bind(this);
  }

  generateEncoutner() {
    const allSchemesIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const choosenSchemes = [];
    for (let i = 0; i < 5; i += 1) {
      choosenSchemes.push(
        allSchemesIds.splice(Math.floor((Math.random() * allSchemesIds.length)), 1)[0],
      );
    }

    this.setState({
      deploymentId: Math.floor((Math.random() * 4)),
      strategyId: Math.floor((Math.random() * 4)),
      schemesIds: choosenSchemes.sort((a, b) => a - b),
    });
  }

  render() {
    const { classes } = this.props;
    const { deploymentId, strategyId, schemesIds } = this.state;

    return (
      <Paper className={classes.papper}>
        {(deploymentId !== null && strategyId !== null && schemesIds !== null
          && (
          <List>
            <EncounterElement type={eeType.deployment} details={deployments[deploymentId]} />
            <Divider />
            <EncounterElement type={eeType.strategy} details={strategies[strategyId]} />
            <Divider />
            {schemesIds.map(schemeId => (
              <EncounterElement
                key={schemes[schemeId].name}
                type={eeType.scheme}
                details={schemes[schemeId]}
              />
            ))}
          </List>
          ))
        || <Button fullWidth onClick={this.generateEncoutner}>Click to generate encounter...</Button>}
      </Paper>
    );
  }
}

export default withStyles(styles)(EncounterElementsList);
