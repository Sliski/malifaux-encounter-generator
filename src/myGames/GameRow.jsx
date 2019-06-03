import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  withStyles, TableRow, TableCell, Button, IconButton,
} from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import styles from '../styles.jsx';

class GameRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.parseCreatedDate = this.parseCreatedDate.bind(this);
  }

  parseCreatedDate() {
    const { created } = this.props;
    return created.replace('T', ' ').substr(0, 16);
  }

  render() {
    const {
      classes, finished, _id, openDeletePrompt, currentGameId, openDetailsDialog,
    } = this.props;
    const current = currentGameId === _id;

    return (
      <TableRow hover>
        <TableCell className={classes.cell} align="center">{this.parseCreatedDate()}</TableCell>
        <TableCell className={classes.cell} align="center">
          {(current && 'In Progress') || (finished && 'Finished') || 'Not Finished'}
        </TableCell>
        <TableCell className={classes.cell} align="center">
          {finished
            ? (
              <Button
                disabled={current}
                color="primary"
                fullWidth
                onClick={() => openDetailsDialog(_id)}
              >
                {'Details'}
              </Button>
            )
            : (
              <Button
                disabled={current}
                color="primary"
                fullWidth
                component={Link}
                to={`/load/${_id}`}
              >
                {'Load'}
              </Button>
            )
          }
        </TableCell>
        <TableCell className={classes.deleteCell} align="center">
          <IconButton disabled={current} onClick={() => openDeletePrompt(_id, this.parseCreatedDate())}>
            <Delete />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}


export default withStyles(styles)(GameRow);
