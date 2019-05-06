import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styles from './styles.jsx';

class Copyrights extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paperWithPadding}>
        <Typography variant="h6">Copyrights</Typography>
        <Typography paragraph align="justify">
          {'Pictures and rules texts (including description of encounter descriptions) are copyrighted works of Wyrd Miniatures, LLC, in the United States of America and elsewhere. All rights reserved, Wyrd Miniatures, LLC. This material is not official and is not endorsed by Wyrd Miniatures, LLC.'}
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(Copyrights);
