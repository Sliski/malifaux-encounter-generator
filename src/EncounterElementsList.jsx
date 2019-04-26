import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import EncounterElement, { eeType } from "./EncounterElement.jsx";
import { strategies, deployments, schemes } from "./data.jsx";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class EncounterElementsList extends Component {
  render() {
    const { classes } = this.props;

    const gameDeployment = deployments[1];
    const gameStrategy = strategies[0];
    const gameSchemes = schemes.slice(0, 5);

    return (
      <Paper className={classes.root}>
        <List>
          <EncounterElement type={eeType.deployment} details={gameDeployment} />
          <Divider />
          <EncounterElement type={eeType.strategy} details={gameStrategy} />
          <Divider />
          {gameSchemes.map(scheme => (
            <EncounterElement
              key={scheme.name}
              type={eeType.scheme}
              details={scheme}
            />
          ))}
        </List>
      </Paper>
    );
  }
}

export default withStyles(styles)(EncounterElementsList);
