import React, { Component } from 'react';
import ls from 'local-storage';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styles from './styles.jsx';

class EnableLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    ls.set('betaUser', true);
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paperWithPadding}>
        <Typography variant="h6" gutterBottom>
          {'Login Enabled'}
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(EnableLogin);
