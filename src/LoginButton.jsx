import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import Button from '@material-ui/core/Button';
import styles from './styles.jsx';
import { API_URL } from './config.js';

const icons = {
  google: <path
    fill="#000000"
    d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
  />,
  facebook: <path fill="#000000" d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" />,
};

class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      disabled: false,
    };

    this.startAuth = this.startAuth.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    const { socket, provider } = this.props;
    socket.on(provider, (user) => {
      this.popup.close();
      this.setState({ user });
    });
  }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this;
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        this.setState({ disabled: false });
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
      this.setState({ disabled: true });
    }
  }

  signOut() {
    this.setState({ user: {} });
  }

  render() {
    const { name, photo } = this.state.user;
    const { provider, classes } = this.props;
    const { disabled } = this.state;

    return (
      <>
        {name
          ? (
            <div className="card">
              <img src={photo} alt={name} />
              <h4>{name}</h4>
              <Button onClick={this.signOut}>SO</Button>
            </div>
          )
          : (
            <Button
              onClick={this.startAuth}
              className={`${provider} ${disabled} button`}
              fullWidth
            >
              <SvgIcon fontSize="small">{icons[provider]}</SvgIcon>
              {provider}
            </Button>
          )
        }
      </>
    );
  }
}

export default withStyles(styles)(LoginButton);
