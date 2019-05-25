import React, { Component } from 'react';
import ls from 'local-storage';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './styles.jsx';
import {
  chooseSchemes, createGame, joinGame, loadAppState, revealScheme, scoreScheme, scoreStrategy, startRound,
} from './backEndConnector.js';

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
    const gameId = '5ce717e29b29222750f1ee11';

    return (
      <Paper className={classes.paperWithPadding}>
        <Typography variant="h6" gutterBottom>
          {'Login Enabled'}
        </Typography>
        <Button fullWidth onClick={() => createGame('13579a', true, response => console.log(response))}>create-game</Button>
        <Button fullWidth onClick={() => joinGame(gameId, response => console.log(response))}>join-game</Button>
        <Button
          fullWidth
          onClick={() => chooseSchemes(gameId, JSON.stringify([
            {
              id: 5,
              note: 'asd',
              revealed: false,
              score: 0,
            },
            {
              id: 10,
              note: 'asd',
              revealed: false,
              score: 0,
            },
          ]), response => console.log(response))}
        >


choose schemes
        </Button>
        <Button fullWidth onClick={() => startRound(gameId, 2, response => console.log(response))}>start-round-2</Button>
        <Button fullWidth onClick={() => scoreStrategy(gameId, 3, response => console.log(response))}>score-strategy-3</Button>
        <Button fullWidth onClick={() => revealScheme(gameId, 10, response => console.log(response))}>reveal scheme</Button>
        <Button fullWidth onClick={() => scoreScheme(gameId, 5, 2, response => console.log(response))}>score scheme</Button>
        <Button fullWidth onClick={() => scoreScheme(gameId, 5, 2, response => console.log(response))}>score scheme</Button>
        <Button fullWidth onClick={() => loadAppState(gameId, response => this.props.ua(response.appState))}>loadAppState</Button>
      </Paper>
    );
  }
}

export default withStyles(styles)(EnableLogin);
