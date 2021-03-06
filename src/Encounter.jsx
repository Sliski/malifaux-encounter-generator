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
    this.addNewAppStateListener = this.addNewAppStateListener.bind(this);
  }

  componentDidMount() {
    this.getAppStateFromDb();
  }

  getAppStateFromDb(message) {
    const {
      signed, gameId, updateAppState, userRole,
    } = this.props;
    if (!signed || !gameId || (userRole && userRole === message)) return;
    loadAppState(gameId, (response) => {
      if (response && response.status === 'OK' && response.appState) {
        updateAppState(response.appState);
        joinRoom(gameId);
        this.addNewAppStateListener();
      }
    });
  }

  addNewAppStateListener() {
    socket.removeAllListeners();
    if (this.props.multiplayer) {
      socket.on('newAppState', this.getAppStateFromDb);
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
    const {
      updateAppState, signed, multiplayer, chooseCrew,
    } = this.props;
    return (
      <ChooseEncounter
        updateAppState={updateAppState}
        signed={signed}
        multiplayer={multiplayer}
        chooseCrew={chooseCrew}
      />
    );
  }

  choose() {
    const {
      updateAppState, deploymentId, strategyId, schemesIds, multiplayer, gameId, opponentStep, signed, chooseStep,
      chooseCrew, crew, opponentCrew, opponentChooseStep,
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
        chooseStep={chooseStep}
        chooseCrew={chooseCrew}
        crew={crew}
        opponentCrew={opponentCrew}
        opponentChooseStep={opponentChooseStep}
      />
    );
  }

  score() {
    const {
      updateAppState, chosenSchemes, opponentSchemes, opponentStep, strategyId, schemesIds, strategyScore, round,
      multiplayer, gameId, signed,
    } = this.props;
    return (
      <Score
        signed={signed}
        gameId={gameId}
        multiplayer={multiplayer}
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
