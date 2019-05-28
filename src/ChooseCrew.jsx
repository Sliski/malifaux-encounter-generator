import React, { Component } from 'react';
import {
  MenuItem, ListItem, Select, Button, Divider, ListItemText, Dialog, DialogTitle, Typography, IconButton, DialogContent,
  TextField, DialogActions,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles.jsx';
import { CHOOSE_STEPS } from './App.jsx';
import { factions, leaders, factionNames } from './data.jsx';
import { chooseFaction, chooseLeader, chooseCrew } from './backEndConnector.js';

class ChooseCrew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenFaction: '',
      chosenLeader: '',
      showDialog: false,
      crewList: '',
      showLists: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.lockFaction = this.lockFaction.bind(this);
    this.lockLeader = this.lockLeader.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.lockCrew = this.lockCrew.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  lockFaction() {
    const {
      updateAppState, crew, signed, gameId,
    } = this.props;
    const { chosenFaction } = this.state;

    const newAppState = {
      crew: {
        ...crew,
        faction: chosenFaction,
      },
      chooseStep: CHOOSE_STEPS.LEADER,
    };

    if (signed && gameId) {
      chooseFaction(gameId, chosenFaction, () => updateAppState({ ...newAppState }));
    } else {
      updateAppState({ ...newAppState });
    }
  }

  lockLeader() {
    const {
      updateAppState, crew, signed, gameId,
    } = this.props;
    const { chosenLeader } = this.state;

    const newAppState = {
      crew: {
        ...crew,
        leader: chosenLeader,
      },
      chooseStep: CHOOSE_STEPS.CREW,
    };

    if (signed && gameId) {
      chooseLeader(gameId, chosenLeader, () => updateAppState({ ...newAppState }));
    } else {
      updateAppState({ ...newAppState });
    }
  }

  openDialog() {
    const { list } = this.props.crew;
    this.setState({ showDialog: true, showLists: (list !== null && list !== undefined) });
  }

  closeDialog() {
    this.setState({ showDialog: false });
  }

  lockCrew() {
    const {
      updateAppState, crew, signed, gameId,
    } = this.props;
    const { crewList } = this.state;
    this.setState({ showDialog: false });

    const newAppState = {
      crew: {
        ...crew,
        list: crewList,
      },
      chooseStep: CHOOSE_STEPS.SCHEMES,
    };

    if (signed && gameId) {
      chooseCrew(gameId, crewList, () => updateAppState({ ...newAppState }));
    } else {
      updateAppState({ ...newAppState });
    }
  }

  render() {
    const { classes, crew, opponentCrew } = this.props;
    const {
      chosenFaction, chosenLeader, showDialog, crewList, showLists,
    } = this.state;

    return (
      <>
        <ListItem>
          <Select
            className={classes.widthOhp}
            name="chosenFaction"
            value={crew.faction || chosenFaction}
            onChange={this.handleChange}
            disabled={!!(crew.faction)}
          >
            {factions.map(faction => (
              <MenuItem key={faction.id} value={faction.id}>{faction.name}</MenuItem>
            ))}
          </Select>
          <Button
            className={classes.leftMargin}
            color="primary"
            disabled={!!(!chosenFaction || crew.faction)}
            onClick={this.lockFaction}
          >
            {'Choose'}
          </Button>
        </ListItem>
        <ListItem className={classes.noVerticalPadding}>
          <ListItemText primary={`vs ${(crew.faction && factionNames[opponentCrew.faction]) || '...'}`} />
        </ListItem>
        <ListItem>
          <Select
            className={classes.widthOhp}
            name="chosenLeader"
            value={crew.leader || chosenLeader}
            onChange={this.handleChange}
            disabled={!!(!crew.faction || crew.leader)}
          >
            {crew.faction && leaders[crew.faction].map(leader => (
              <MenuItem key={leader} value={leader}>{leader}</MenuItem>
            ))}
          </Select>
          <Button
            className={classes.leftMargin}
            color="primary"
            disabled={!!(!crew.faction || !chosenLeader || crew.leader)}
            onClick={this.lockLeader}
          >
            {'Choose'}
          </Button>
        </ListItem>
        <ListItem className={classes.noVerticalPadding}>
          <ListItemText primary={`vs ${(crew.leader && opponentCrew.leader) || '...'}`} />
        </ListItem>
        <ListItem button disableGutters disabled={!crew.leader} onClick={this.openDialog}>
          <ListItemText
            className={classes.fullWidth}
            primaryTypographyProps={{ color: 'primary', variant: 'button', align: 'center' }}
            primary={(crew.list !== null && crew.list !== undefined) ? 'Show Crew Lists' : 'Choose Crew List'}
          />
        </ListItem>
        <Divider />
        {showLists ? (
          <Dialog
            classes={{ paper: classes.dialogPaper }}
            open={showDialog}
            onClose={this.closeDialog}
          >
            <DialogTitle
              onClose={this.closeDialog}
              className={classes.dialogTitle}
              disableTypography
            >
              <Typography variant="h6">Crew Lists</Typography>
              <IconButton className={classes.dialogCloseButton} onClick={this.closeDialog}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <Typography variant="subtitle2">My list:</Typography>
              <Typography gutterBottom>{crew.list}</Typography>
              {opponentCrew.list ? (
                <>
                  <Typography variant="subtitle2">{'Opponent\'s list:'}</Typography>
                  <Typography>{opponentCrew.list}</Typography>
                </>
              ) : (
                <Typography variant="subtitle2">
                  {'Opponent didn\'t choose list yet'}
                </Typography>
              )}
            </DialogContent>
          </Dialog>
        ) : (
          <Dialog
            classes={{ paper: classes.dialogPaper }}
            open={showDialog}
            onClose={this.closeDialog}
          >
            <DialogTitle
              onClose={this.closeDialog}
              className={classes.dialogTitle}
              disableTypography
            >
              <Typography variant="h6">Crew List</Typography>
              <IconButton className={classes.dialogCloseButton} onClick={this.closeDialog}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <TextField
                margin="dense"
                name="crewList"
                id="crew"
                placeholder="Paste your list or link to builder here."
                type="text"
                onChange={event => this.handleChange(event)}
                fullWidth
                autoComplete="off"
                autoFocus
                multiline
                defaultValue={crewList}
                rows={3}
                rowsMax={18}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.closeDialog} color="secondary">
                {'Cancel'}
              </Button>
              <Button disabled={!crewList} onClick={this.lockCrew} color="primary">
                {'Choose'}
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </>
    );
  }
}


export default withStyles(styles)(ChooseCrew);
