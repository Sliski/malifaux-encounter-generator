import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar, Button, Dialog, DialogContent, ListItem, ListItemIcon, ListItemText, SvgIcon, Typography,
} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import styles from './styles.jsx';
import { API_URL } from './config.js';
import { socket } from './App.jsx';

const providerIcons = {
  google: <path
    fill="#000000"
    d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
  />,
  facebook: <path fill="#000000" d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" />,
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      photo: '',
      signInDialog: false,
      userDialog: false,
    };

    this.signOut = this.signOut.bind(this);
    this.openSignInDialog = this.openSignInDialog.bind(this);
    this.closeSignInDialog = this.closeSignInDialog.bind(this);
    this.openUserDialog = this.openUserDialog.bind(this);
    this.closeUserDialog = this.closeUserDialog.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.startAuth = this.startAuth.bind(this);
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    fetch(`${API_URL}/current-user`, { credentials: 'include' })
      .then(response => response.json())
      .then((json) => {
        this.setState({
          name: json.name || '',
          photo: json.photo || '',
        });
      });
  }

  openSignInDialog() {
    this.setState({ signInDialog: true });
  }

  closeSignInDialog() {
    this.setState({ signInDialog: false });
  }

  openUserDialog() {
    this.setState({ userDialog: true });
  }

  closeUserDialog() {
    this.setState({ userDialog: false });
  }

  startAuth(e, provider) {
    e.preventDefault();
    this.closeSignInDialog();
    socket.on(provider, (response) => {
      this.popup.close();
      if (response && response.name && response.photo) {
        this.setState({
          name: response.name,
          photo: response.photo,
        });
      } else {
        this.getCurrentUser();
      }
    });
    this.popup = this.openPopup(provider);
    this.checkPopup();
  }

  openPopup(provider) {
    const width = 600; const
      height = 600;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);
    const url = `${API_URL}/${provider}?socketId=${socket.id}`;

    return window.open(url, '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`);
  }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this;
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
      }
    }, 1000);
  }

  signOut() {
    fetch(`${API_URL}/sign-out`, { credentials: 'include' })
      .then(response => response.text())
      .then(() => {
        this.setState({
          name: '',
          photo: '',
        });
        this.closeUserDialog();
      });
  }

  render() {
    const {
      name, photo, signInDialog, userDialog,
    } = this.state;
    const { classes } = this.props;

    if (name) {
      return (
        <>
          <Button color="inherit" onClick={this.openUserDialog}>
            <Avatar alt={name} src={photo} />
          </Button>
          <Dialog
            classes={{ paper: classes.dialogPaper }}
            open={userDialog}
            onClose={this.closeUserDialog}
          >
            <DialogContent className={classes.dialogContent}>
              <Typography>Do you want to Sign Out?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.closeUserDialog} color="secondary">
                {'Cancel'}
              </Button>
              <Button onClick={this.signOut} color="primary" autoFocus>
                {'Sign Out'}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      );
    }

    return (
      <>
        <Button color="inherit" onClick={this.openSignInDialog}>Sign In</Button>
        <Dialog
          classes={{ paper: classes.dialogPaper }}
          open={signInDialog}
          onClose={this.closeSignInDialog}
        >
          {signInDialog && (
          <DialogContent className={classes.noMarginNoPadding}>
            {[
              { name: 'google', disabled: false },
              { name: 'facebook', disabled: false },
            ].map(provider => (
              <ListItem
                key={provider.name}
                button
                onClick={e => this.startAuth(e, provider.name)}
                disabled={provider.disabled}
              >
                <ListItemIcon>
                  <SvgIcon fontSize="small">{providerIcons[provider.name]}</SvgIcon>
                </ListItemIcon>
                <ListItemText primary={`Sign in with ${provider.name.charAt(0).toUpperCase()}${provider.name.slice(1)}`} />
              </ListItem>
            ))}
          </DialogContent>
          )}
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(SignIn);
