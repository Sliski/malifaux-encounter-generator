import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import styles from './styles';
import { loadAppState, leaveRoom } from './backEndConnector.js';

const loadGameFailedText = 'Unable to load the game';

class Load extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      error: null,
    };

    this.loadGame = this.loadGame.bind(this);
  }

  componentDidMount() {
    this.loadGame();
  }

  componentWillReceiveProps(nextProps) {
    const { signed } = this.props;
    if (!signed && nextProps.signed) {
      this.loadGame();
    }
  }

  loadGame() {
    const {
      newGameId, gameId, updateAppState, signed,
    } = this.props;
    if (signed) {
      loadAppState(newGameId, (response) => {
        if (response.status === 'rejected' && response.info) {
          return this.setState({ error: response.info });
        }
        if (response && response.status === 'OK' && response.appState) {
          if (gameId) leaveRoom(gameId);
          updateAppState(response.appState);
          return this.setState({
            redirect: true,
            error: null,
          });
        }
        return this.setState({ error: loadGameFailedText });
      });
    } else {
      this.setState({ error: 'Sign In before loading the game.' });
    }
  }

  render() {
    const { signed, classes } = this.props;
    const { error, redirect } = this.state;

    if (redirect) return <Redirect to="/" />;

    let text = 'Loading the game...';
    if (!signed) {
      text = 'Sign in before loading the game.';
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

export default withStyles(styles)(Load);
