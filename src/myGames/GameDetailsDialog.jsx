import React, { Component } from 'react';
import {
  withStyles, Button, Dialog, DialogContent, Typography, DialogActions, DialogTitle, IconButton,
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import styles from '../styles.jsx';
import { gameReport } from '../backEndConnector.js';
import { deployments, strategies, schemes } from '../data.jsx';

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
          <Typography>{`Deployment: ${deployments[report.deploymentId].name}`}</Typography>
          <Typography>{`Strategy: ${strategies[report.strategyId].name}`}</Typography>
          <Typography>Schemes:</Typography>
          {report.schemesIds.map(schemeId => (
            <Typography key={`scheme-${schemeId}`}>
              {`-${schemes[schemeId].name}`}
            </Typography>
          ))}
          <Typography>{`My score: ${report.currentPlayer.schemes[0].score + report.currentPlayer.schemes[1].score + report.currentPlayer.strategyScore}`}</Typography>
          <Typography>{`Strategy: ${report.currentPlayer.strategyScore}`}</Typography>
          <Typography>{`Schemes:${report.currentPlayer.schemes.map(scheme => ` ${schemes[scheme.id].name} ${scheme.score}`)}`}</Typography>
          {report.secondPlayer && (
          <>
            <Typography>{`Opponent core: ${report.secondPlayer.schemes[0].score + report.secondPlayer.schemes[1].score + report.secondPlayer.strategyScore}`}</Typography>
            <Typography>{`Strategy: ${report.secondPlayer.strategyScore}`}</Typography>
            <Typography>{`Schemes:${report.secondPlayer.schemes.map(scheme => ` ${schemes[scheme.id].name} ${scheme.score}`)}`}</Typography>
          </>
          )}
        </>
      ); // TODO duplicated score, check for nullpointers
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