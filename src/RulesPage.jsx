import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import rules from './rules.js';
import styles from './styles.jsx';

class RulesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, sectionName } = this.props;
    const rulings = rules[sectionName];

    return (
      <Paper className={classes.paperWithPadding}>
        <Typography gutterBottom variant="h6">{rulings.sectionName}</Typography>
        {rulings.items.map(item => [
          <Typography key={`${item.name}-name`} gutterBottom variant="button">{item.name}</Typography>,
          <Typography key={`${item.name}-desc`} paragraph align="justify">{item.desc}</Typography>,
        ])}
      </Paper>
    );
  }
}

export default withStyles(styles)(RulesPage);
