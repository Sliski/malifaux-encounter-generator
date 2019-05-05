import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import rules from './rules.js';
import styles from './styles.jsx';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      showConfirmationDialog: false,
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.openConfirmationDialog = this.openConfirmationDialog.bind(this);
    this.closeConfirmationDialog = this.closeConfirmationDialog.bind(this);
  }

  handleDrawerToggle() {
    this.setState(prevState => ({ mobileOpen: !prevState.mobileOpen }));
  }

  closeDrawer() {
    if (this.state.mobileOpen) {
      this.setState({ mobileOpen: false });
    }
  }

  openConfirmationDialog() {
    this.setState({ showConfirmationDialog: true });
  }

  closeConfirmationDialog() {
    this.setState({ showConfirmationDialog: false });
  }


  render() {
    const { classes, handleEndEncounter, step } = this.props;
    const { showConfirmationDialog } = this.state;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button component={Link} to="/" onClick={this.closeDrawer}>
            <ListItemText primary="Encounter" />
          </ListItem>
          <ListItem button onClick={this.openConfirmationDialog} disabled={step === 0}>
            <ListItemText primary="End Encounter" />
          </ListItem>
          <Divider />
          <ListSubheader>Rules:</ListSubheader>
          {Object.keys(rules).map(ruleSection => (
            <ListItem key={ruleSection} button component={Link} to={`/rules/${ruleSection}`} onClick={this.closeDrawer}>
              <ListItemText primary={rules[ruleSection].sectionName} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap className={classes.pageTitle}>
              {'M3E Encounter Generator'}
            </Typography>
            <Button color="inherit" disabled>Login</Button>
          </Toolbar>
        </AppBar>
        <nav className={classes.menuDrawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor="left"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <Dialog
          classes={{ paper: classes.dialogPaper }}
          open={showConfirmationDialog}
          onClose={this.closeConfirmationDialog}
        >
          <DialogContent className={classes.dialogContent}>
            <Typography align="justify">
              {'Do you want to end encounter? All encounter data will be lost.'}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeConfirmationDialog} color="secondary">
              {'Cancel'}
            </Button>
            <Button
              onClick={() => {
                this.closeConfirmationDialog();
                this.closeDrawer();
                handleEndEncounter();
              }}
              color="primary"
              autoFocus
            >
              {'End'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(NavigationBar);
