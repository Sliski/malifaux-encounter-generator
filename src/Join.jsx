import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import styles from './styles';
import { joinGame } from './backEndConnector.js';

const joinGameFailedText = 'Unable to join the game';

class Join extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      error: null,
    };
  }

  componentDidMount() {
    const { gameId, updateAppState } = this.props;
    joinGame(gameId, (response) => {
      if (response.status === 'rejected' && response.info) {
        return this.setState({ error: response.info });
      }
      if (response.status === 'OK') {
        updateAppState({ gameId });
        return this.setState({ redirect: true });
      }
      return this.setState({ error: joinGameFailedText });
    });
  }

  render() {
    const { gameId, signed, classes } = this.props;
    const { error, redirect } = this.state;

    if (redirect) return <Redirect to="/" />;

    let text = `Joining the game... ${gameId}`;
    if (!signed) text = 'Sign in before joining the game.';
    if (error) text = `Error: ${error}`;
    return (
      <Paper className={classes.paperWithPadding}>
        <Typography align="justify">
          {text}
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(Join);
