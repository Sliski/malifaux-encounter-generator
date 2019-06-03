import React, { Component } from 'react';
import {
  withStyles, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableHead, TableRow, Dialog,
  DialogContent, DialogActions, Typography, Button,
} from '@material-ui/core';
import styles from '../styles.jsx';
import { myGames, deleteGame } from '../backEndConnector.js';
import GameRow from './GameRow.jsx';
import GameDetailsDialog from './GameDetailsDialog.jsx';

class GamesHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: null,
      error: null,
      showDeleteDialog: false,
      deleteId: null,
      deleteDate: null,
      showDetailsDialog: false,
      detailsId: null,
    };

    this.loadGamesList = this.loadGamesList.bind(this);
    this.renderGamesList = this.renderGamesList.bind(this);
    this.renderDeletePrompt = this.renderDeletePrompt.bind(this);
    this.openDeletePrompt = this.openDeletePrompt.bind(this);
    this.closeDeletePrompt = this.closeDeletePrompt.bind(this);
    this.callDeleteGame = this.callDeleteGame.bind(this);
    this.openDetailsDialog = this.openDetailsDialog.bind(this);
    this.closeDetailsDialog = this.closeDetailsDialog.bind(this);
  }

  componentDidMount() {
    this.loadGamesList();
  }

  loadGamesList() {
    myGames((response) => {
      if (response.status === 'OK') {
        this.setState({ games: response.games });
      } else {
        this.setState({ error: response.info || 'Unable to load games list.' });
      }
    });
  }

  openDeletePrompt(id, date) {
    this.setState({
      showDeleteDialog: true,
      deleteId: id,
      deleteDate: date,
    });
  }

  closeDeletePrompt() {
    this.setState({
      showDeleteDialog: false,
    });
  }

  callDeleteGame() {
    const { deleteId } = this.state;
    deleteGame(deleteId, () => {
      this.loadGamesList();
      this.closeDeletePrompt();
    });
  }

  openDetailsDialog(gameId) {
    this.setState({
      showDetailsDialog: true,
      detailsId: gameId,
    });
  }

  closeDetailsDialog() {
    this.setState({
      showDetailsDialog: false,
    });
  }

  renderDeletePrompt() {
    const { showDeleteDialog, deleteDate } = this.state;
    const { classes } = this.props;
    return (
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={showDeleteDialog}
        onClose={this.closeDeletePrompt}
      >
        <DialogContent className={classes.dialogContent}>
          <Typography align="justify">
            {`Game created ${deleteDate} will be deleted.`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeDeletePrompt} color="secondary">
            {'Cancel'}
          </Button>
          <Button
            onClick={this.callDeleteGame}
            color="primary"
            autoFocus
          >
            {'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  renderGamesList() {
    const { games, showDetailsDialog, detailsId } = this.state;
    const { classes, currentGameId } = this.props;
    if (!games) {
      return (
        <List>
          <ListItem>
            <ListItemText primary="No games to show." />
          </ListItem>
        </List>
      );
    }

    return (
      <>
        <Table>
          <TableHead>
            <TableRow className={classes.headerRow}>
              <TableCell className={classes.cell} align="center" padding="none">Game Date</TableCell>
              <TableCell className={classes.cell} align="center" padding="none">Status</TableCell>
              <TableCell className={classes.cell} align="center" padding="none">Action</TableCell>
              <TableCell className={classes.cell} align="center" padding="none">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {games.map(game => (
              <GameRow
                key={game._id}
                {...game}
                openDeletePrompt={this.openDeletePrompt}
                currentGameId={currentGameId}
                openDetailsDialog={this.openDetailsDialog}
              />
            ))}
          </TableBody>
        </Table>
        {this.renderDeletePrompt()}
        <GameDetailsDialog
          show={showDetailsDialog}
          onClose={this.closeDetailsDialog}
          gameId={detailsId}
        />
      </>
    );
  }

  render() {
    const { classes, signed } = this.props;
    const { error } = this.state;

    let content = null;

    if (!signed || error) {
      content = (
        <List>
          <ListItem>
            <ListItemText primary={signed ? error : 'Sign in to see your games.'} />
          </ListItem>
        </List>
      );
    } else {
      content = this.renderGamesList();
    }

    return (
      <Paper className={classes.paper}>
        {content}
      </Paper>
    );
  }
}


export default withStyles(styles)(GamesHistory);
