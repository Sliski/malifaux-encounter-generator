import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ListItem, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { URL } from './config';

class MultiplayerLinkButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { gameId, classes } = this.props;
    return (
      <CopyToClipboard text={`${URL}/join/${gameId}`}>
        <ListItem className={classes.listItemButtonConstHeight} button disableGutters>
          <ListItemText
            className={classes.fullWidth}
            primaryTypographyProps={{ color: 'primary', variant: 'button', align: 'center' }}
            primary="Click here to copy link for opponent"
          />
        </ListItem>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(MultiplayerLinkButton);
