import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { ScoreList } from './EncounterElementsList.jsx';
import { schemes } from './data.jsx';

const styles = theme => ({
  paper: {
    width: '46px',
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
  content: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  dialogPaper: {
    width: '360px',
    maxHeight: '95vh',
    [theme.breakpoints.down('xs')]: {
      margin: '5px',
    },
  },
  // img: {
  //   width: '200px',
  //   height: '200px',
  // },
});

class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round: 1,
      strategyScore: [0, 0],
      log: '',
      revealSchemeDialog: false,
      chosenSchemes: props.chosenSchemes,
    };

    this.changeStrategyScore = this.changeStrategyScore.bind(this);
    this.openRevealDialog = this.openRevealDialog.bind(this);
    this.closeRevealDialog = this.closeRevealDialog.bind(this);
    this.revealScheme = this.revealScheme.bind(this);
  }

  changeStrategyScore() {
    this.setState(prevState => ({ strategyScore: [(prevState.strategyScore[0] + 1) % 5, prevState.strategyScore] }));
  }

  changeSchemeScore(schemeId) {
    this.setState(prevState => ({
      chosenSchemes: prevState.chosenSchemes.map(chosenScheme => (
        chosenScheme.id === schemeId ? { ...chosenScheme, score: (chosenScheme.score + 1) % 3 } : chosenScheme
      )),
    }));
  }

  openRevealDialog() {
    this.setState({ revealSchemeDialog: true });
  }

  closeRevealDialog() {
    this.setState({ revealSchemeDialog: false });
  }

  revealScheme(index) {
    this.closeRevealDialog();
    this.setState(prevState => ({
      chosenSchemes: [
        { ...prevState.chosenSchemes[index], revealed: true },
        prevState.chosenSchemes[(index + 1) % 2],
      ].sort((a, b) => a.id - b.id),
    }));
  }

  render() {
    const {
      strategyScore, revealSchemeDialog, round, chosenSchemes,
    } = this.state;
    const {
      classes, deploymentId, strategyId, schemesIds,
    } = this.props;

    if (deploymentId === null || strategyId === null || !schemesIds || !chosenSchemes) return <Redirect to="/generate" />;

    const revealSchemeButton = (
      <Button fullWidth color="primary" onClick={this.openRevealDialog}>Reveal scheme</Button>
    );

    return (
      <>
        <ScoreList
          deploymentId={deploymentId}
          strategyId={strategyId}
          schemesIds={schemesIds}
          updateAppState={null}
          score
          button={revealSchemeButton}
        />
        <Paper className={classes.paper}>
          <List>
            <ListItem>
              <ListItemText primary={chosenSchemes[0].score + chosenSchemes[1].score + strategyScore[0]} />
            </ListItem>
            <Divider />
            <ListItem button onClick={this.changeStrategyScore}>
              <ListItemText primary={strategyScore[0]} />
            </ListItem>
            <Divider />
            {schemesIds.map((schemeId) => {
              const cs = chosenSchemes.find(it => it.id === schemeId);
              if (cs && cs.revealed) {
                return (
                  <ListItem button onClick={() => this.changeSchemeScore(schemeId)} key={`${schemeId}-item`}>
                    <ListItemText key={schemeId} primary={cs.score} />
                  </ListItem>
                );
              }
              return (
                <ListItem disabled button key={`${schemeId}-item`}>
                  <ListItemText key={schemeId} primary="-" />
                </ListItem>
              );
            })}
          </List>
        </Paper>
        <Dialog classes={{ paper: classes.dialogPaper }} open={revealSchemeDialog} onClose={this.closeRevealDialog}>
          <DialogTitle onClose={this.closeRevealDialog} className={classes.title} disableTypography>
            <Typography variant="h6">Reveal Scheme</Typography>
            <IconButton className={classes.closeButton} onClick={this.closeRevealDialog}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent className={classes.content}>
            <List>
              {chosenSchemes.map((chosenScheme, index) => (
                <ListItem key={`${chosenScheme.id}-item`} button onClick={() => this.revealScheme(index)} disabled={chosenScheme.revealed}>
                  <ListItemText
                    key={chosenScheme.id}
                    primary={schemes[chosenScheme.id].name}
                    secondary={chosenScheme.note}
                  />
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(Score);
