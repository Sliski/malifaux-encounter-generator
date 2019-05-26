import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import { ENCOUNTER_STEPS } from './App';
import Generator from './Generator.jsx';
import ChooseEncounter from './ChooseEncounter.jsx';
import EncounterElementsList from './EncounterElementsList.jsx';
import Score from './Score.jsx';
import MultiplayerScore from './MultiplayerScore.jsx';
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
    this.addNewAppStateListener = this.addNewAppStateListener.bind(this);
  }

  componentDidMount() {
    this.getAppStateFromDb();
  }

  getAppStateFromDb() {
    const { signed, gameId, updateAppState } = this.props;
    if (!signed || !gameId) return;
    try {
      loadAppState(gameId, (response) => {
        if (response && response.status === 'OK' && response.appState) {
          updateAppState(response.appState);
          joinRoom(gameId);
          this.addNewAppStateListener();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  addNewAppStateListener() {
    const { userRole } = this.props;
    if (socket.listeners('newAppState').length === 0) {
      socket.on('newAppState', (message) => {
        if (userRole !== message) this.getAppStateFromDb();
      });
    }
  }

  generate() {
    const { updateAppState, signed } = this.props;
    return (
      <Generator
        updateAppState={updateAppState}
        signed={signed}
        addNewAppStateListener={this.addNewAppStateListener}
      />
    );
  }

  chooseEncounter() {
    const { updateAppState, signed, multiplater } = this.props;
    return <ChooseEncounter updateAppState={updateAppState} signed={signed} multiplayer={multiplater} />;
  }

  choose() {
    const {
      updateAppState, deploymentId, strategyId, schemesIds, multiplayer, gameId, opponentStep, signed,
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
        signed={signed}
      />
    );
  }

  score() {
    const {
      updateAppState, chosenSchemes, opponentSchemes, opponentStep, strategyId, schemesIds, strategyScore, round,
      multiplayer, gameId, signed,
    } = this.props;
    if (!multiplayer || !signed) {
      return (
        <Score
          strategyId={strategyId}
          schemesIds={schemesIds}
          round={round}
          chosenSchemes={chosenSchemes}
          strategyScore={strategyScore}
          updateAppState={updateAppState}
          getAppStateFromDb={this.getAppStateFromDb}
        />
      );
    }
    return (
      <MultiplayerScore
        signed={signed}
        gameId={gameId}
        strategyId={strategyId}
        schemesIds={schemesIds}
        round={round}
        chosenSchemes={chosenSchemes}
        opponentSchemes={opponentSchemes}
        strategyScore={strategyScore}
        opponentStep={opponentStep}
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
