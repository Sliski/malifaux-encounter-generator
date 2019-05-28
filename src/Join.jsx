import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import styles from './styles';
import { joinGame, leaveRoom } from './backEndConnector.js';

const joinGameFailedText = 'Unable to join the game';

class Join extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      error: null,
    };

    this.joinGame = this.joinGame.bind(this);
  }

  componentDidMount() {
    this.joinGame();
  }

  componentWillReceiveProps(nextProps) {
    const { signed } = this.props;
    if (!signed && nextProps.signed) {
      this.joinGame();
    }
  }

  joinGame() {
    const { newGameId, gameId, updateAppState } = this.props;
    joinGame(newGameId, (response) => {
      if (response.status === 'rejected' && response.info) {
        return this.setState({ error: response.info });
      }
      if (response.status === 'OK') {
        if (gameId) leaveRoom(gameId);
        updateAppState({ gameId: newGameId });
        return this.setState({ redirect: true });
      }
      return this.setState({ error: joinGameFailedText });
    });
  }

  render() {
    const { signed, classes } = this.props;
    const { error, redirect } = this.state;

    if (redirect) return <Redirect to="/" />;

    let text = 'Joining the game...';
    if (!signed) {
      text = 'Sign in before joining the game.';
    } else if (error) {
      text = `Error: ${error}`;
    }

    return (
      <Paper className={classes.paperWithPadding}>
        <Typography align="justify" color={error ? 'error' : 'default'}>
          {text}
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(Join);
