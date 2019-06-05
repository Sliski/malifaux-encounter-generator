import React, { Component } from 'react';
import {
  withStyles, Button, Dialog, DialogContent, Typography, DialogActions, DialogTitle, IconButton,
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import styles from '../styles.jsx';
import { gameReport } from '../backEndConnector.js';
import {
  deployments, strategies, schemes, factionNames,
} from '../data.jsx';

class GameDetailsDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      report: null,
      error: null,
    };

    this.loadGameReport = this.loadGameReport.bind(this);
  }

  componentDidMount() {
    this.loadGameReport(this.props.gameId);
  }

  componentWillReceiveProps(nextProps) {
    const { show } = this.props;
    if (nextProps.show && !show) {
      this.loadGameReport(nextProps.gameId);
    }
  }

  loadGameReport(gameId) {
    gameReport(gameId, (response) => {
      if (response.status === 'OK') {
        this.setState({ report: response.report, error: null });
      } else {
        this.setState({ error: response.info || 'Unable to load report.' });
      }
    });
  }

  showCrew(player, name) {
    if (!player || !player.crew
      || !player.crew.faction || !player.crew.leader || !player.crew.list) return null;
    return (
      <>
        <Typography><strong>{`${name} crew:`}</strong></Typography>
        <Typography>{`${factionNames[player.crew.faction]} lead by ${player.crew.leader}.`}</Typography>
        <Typography>{player.crew.list}</Typography>
      </>
    );
  }

  render() {
    const { report, error } = this.state;
    const {
      classes, show, onClose,
    } = this.props;

    console.log(report);

    let reportRender = null;
    if (!error && report) {
      reportRender = (
        <>
          <Typography>
            <strong>Deployment: </strong>
            {deployments[report.deploymentId].name}
          </Typography>
          <Typography>
            <strong>Strategy: </strong>
            {strategies[report.strategyId].name}
          </Typography>
          <Typography><strong>Schemes:</strong></Typography>
          {report.schemesIds.map(schemeId => (
            <Typography key={`scheme-${schemeId}`}>
              {`- ${schemes[schemeId].name}`}
            </Typography>
          ))}
          <Typography>
            <strong>My total score: </strong>
            {report.currentPlayer.schemes[0].score + report.currentPlayer.schemes[1].score
              + report.currentPlayer.strategyScore}
          </Typography>
          <Typography>
            <strong>- Strategy: </strong>
            {report.currentPlayer.strategyScore}
          </Typography>
          <Typography>
            <strong>- Schemes:</strong>
            {report.currentPlayer.schemes.map(scheme => ` ${schemes[scheme.id].name} ${scheme.score}`).join(',')}
          </Typography>
          {report.secondPlayer && report.secondPlayer.schemes
          && report.secondPlayer.schemes[0] && report.secondPlayer.schemes[1] && (
          <>
            <Typography>
              <strong>Opponent`s total score: </strong>
              {report.secondPlayer.schemes[0].score + report.secondPlayer.schemes[1].score
                + report.secondPlayer.strategyScore}
            </Typography>
            <Typography>
              <strong>- Strategy: </strong>
              {report.secondPlayer.strategyScore}
            </Typography>
            <Typography>
              <strong>- Schemes:</strong>
              {report.secondPlayer.schemes.map(scheme => ` ${schemes[scheme.id].name} ${scheme.score}`).join(',')}
            </Typography>
          </>
          )}
          {this.showCrew(report.currentPlayer, 'My')}
          {this.showCrew(report.secondPlayer, 'Opponent`s')}
        </>
      );
    }

    return (
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={show}
        onClose={onClose}
      >
        <DialogTitle
          onClose={onClose}
          className={classes.dialogTitle}
          disableTypography
        >
          <Typography variant="h6">Game Report</Typography>
          <IconButton className={classes.dialogCloseButton} onClick={onClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography align="justify">
            {error}
          </Typography>
          {reportRender}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            color="primary"
            autoFocus
          >
            {'Close'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(GameDetailsDialog);
