import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';
import styles from './styles.jsx';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paperWithPadding}>
        <Typography gutterBottom variant="h6">Contact</Typography>
        <Typography gutterBottom align="justify">
          {'If you want to contact creator of this page, send me a message to '}
          <Link href="mailto:m3e.helper@gmail.com">
            {'m3e.helper@gmail.com'}
          </Link>
          {'.'}
        </Typography>
        <Typography gutterBottom variant="h6">Donates</Typography>
        <Typography gutterBottom align="justify">
          {'If you would like to support covering the hosting fees, you can do it by using this link: '}
          <Link href="https://www.paypal.me/m3ehelper" target="_blank">
            {'https://www.paypal.me/m3ehelper'}
          </Link>
          {'.'}
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(Contact);
