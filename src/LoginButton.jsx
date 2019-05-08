import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SvgIcon from '@material-ui/core/SvgIcon';
import Button from '@material-ui/core/Button';
import styles from './styles.jsx';
import { API_URL } from './config.js';

const GOOGLE_BUTTON_ID = 'google-sign-in-button';

const icons = {
  google: <path
    fill="#000000"
    d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
  />,
  facebook: <path fill="#000000" d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" />,
};

export const LOADING_STATUS = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  FAILED: 'FAILED',
};

function initGoogle(func) {
  window.gapi.load('auth2', () => {
    window.gapi.auth2
      .init({
        client_id:
        '364770672088-j91rtuel93ds5f2ro0tldh9cf14iof08.apps.googleusercontent.com',
      })
      .then(func);
  });
}

const googleLoadTimer = setInterval(() => {
  console.log(LOADING_STATUS.INITIAL);
  if (window.gapi) {
    console.log(LOADING_STATUS.LOADING);
    initGoogle(() => {
      clearInterval(googleLoadTimer);
      console.log(LOADING_STATUS.LOADED);
    });
  }
}, 90);


class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      disabled: '',
    };

    this.startAuth = this.startAuth.bind(this);
  }
  //
  // componentDidMount() {
  //   const { socket, provider } = this.props;
  //
  //   socket.on(provider, (user) => {
  //     this.popup.close();
  //     this.setState({ user });
  //   });
  // }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this;
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        this.setState({ disabled: '' });
      }
    }, 1000);
  }

  openPopup() {
    const { provider, socket } = this.props;
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

  startAuth(e) {
    if (!this.state.disabled) {
      e.preventDefault();
      this.popup = this.openPopup();
      this.checkPopup();
      this.setState({ disabled: 'disabled' });
    }
  }

  closeCard() {
    this.setState({ user: {} });
  }

  componentDidMount() {
    window.gapi.signin2.render(
      GOOGLE_BUTTON_ID,
      {
        width: 200,
        height: 50,
        onsuccess: this.onSuccess,
      },
    );
  }

  onSuccess(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log(`Name: ${profile.getName()}`);
  }


  render() {
    const { name, photo } = this.state.user;
    const { provider } = this.props;
    const { disabled } = this.state;
    const { classes } = this.props;

    return (
      <Paper className={classes.paperWithPadding}>
        <div id={GOOGLE_BUTTON_ID} />
        {name
          ? (
            <div className="card">
              <img src={photo} alt={name} />
              <h4>{name}</h4>
            </div>
          )
          : (
            <div className="button-wrapper fadein-fast">
              <Button
                onClick={this.startAuth}
                className={`${provider} ${disabled} button`}
                fullWidth
              >
                <SvgIcon fontSize="small">{icons[provider]}</SvgIcon>
                {provider}
              </Button>
            </div>
          )
        }
      </Paper>
    );
  }
}

export default withStyles(styles)(LoginButton);
