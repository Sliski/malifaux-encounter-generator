import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import { ENCOUNTER_STEPS } from './App';
import Generator from './Generator.jsx';
import ChooseEncounter from './ChooseEncounter.jsx';
import EncounterElementsList from './EncounterElementsList.jsx';
import Score from './Score.jsx';
import { socket, loadAppState, joinRoom } from './backEndConnector.js';

class Encounter extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.chooseEncounter = this.chooseEncounter.bind(this);
    this.generate = this.generate.bind(this);
    this.choose = this.choose.bind(this);
    this.score = this.score.bind(this);
    this.getAppStateFromDb = this.getAppStateFromDb.bind(this);
  }

  componentDidMount() {
    this.getAppStateFromDb();
  }

  getAppStateFromDb() {
    console.log('Load state from DB.');
    const { signed, gameId, updateAppState } = this.props;
    if (!signed || !gameId) return;
    try {
      loadAppState(gameId, (response) => {
        if (response && response.status === 'OK' && response.appState) {
          updateAppState(response.appState);
          joinRoom(gameId);
          if (socket.listeners('newAppState').length === 0) {
            socket.on('newAppState', (message) => {
              // console.log('newAppState');
              console.log(message);
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  generate() {
    const { updateAppState, signed } = this.props;
    return <Generator updateAppState={updateAppState} signed={signed} />;
  }

  chooseEncounter() {
    const { updateAppState, signed, multiplater } = this.props;
    return <ChooseEncounter updateAppState={updateAppState} signed={signed} multiplayer={multiplater} />;
  }

  choose() {
    const {
      updateAppState, deploymentId, strategyId, schemesIds, multiplayer, gameId, opponentStep,
    } = this.props;
    return (
      <EncounterElementsList
        deploymentId={deploymentId}
        strategyId={strategyId}
        schemesIds={schemesIds}
        updateAppState={updateAppState}
        score={false}
        multiplayer={multiplayer}
        gameId={gameId}
        opponentStep={opponentStep}
        getAppStateFromDb={this.getAppStateFromDb}
      />
    );
  }

  score() {
    const {
      updateAppState, chosenSchemes, strategyId, schemesIds, strategyScore, round,
    } = this.props;
    return (
      <Score
        strategyId={strategyId}
        schemesIds={schemesIds}
        chosenSchemes={chosenSchemes}
        strategyScore={strategyScore}
        round={round}
        updateAppState={updateAppState}
        getAppStateFromDb={this.getAppStateFromDb}
      />
    );
  }

  render() {
    const { step } = this.props;
    switch (step) {
      case ENCOUNTER_STEPS.CHOOSE:
        return this.choose();
      case ENCOUNTER_STEPS.SCORE:
        return this.score();
      case ENCOUNTER_STEPS.MANUAL_CHOICE:
        return this.chooseEncounter();
      default:
        return this.generate();
    }
  }
}

export default withStyles(styles)(Encounter);
