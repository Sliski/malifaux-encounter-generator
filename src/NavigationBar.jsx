import React, { Component } from 'react';
import ls from 'local-storage';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar, Button, Dialog, DialogContent, DialogActions, Divider, Drawer, Hidden, IconButton, List, ListItem,
  ListItemText, ListSubheader, Toolbar, Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import rules from './rules.js';
import styles from './styles.jsx';
import SignIn from './SignIn.jsx';
import EncounterElement, { eeType } from './EncounterElement';
import { deployments } from './data';
import { ENCOUNTER_STEPS, ENCOUNTER_MAIN_LINK_TEXT } from './App';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      showConfirmationDialog: false,
      loginEnabled: ls.get('betaUser'),
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
    const {
      classes, handleEndEncounter, step, deploymentId, updateAppState, signed,
    } = this.props;
    const { showConfirmationDialog, loginEnabled } = this.state;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListSubheader disableSticky>Encounter:</ListSubheader>
          <ListItem button component={Link} to="/" onClick={this.closeDrawer}>
            <ListItemText primary={ENCOUNTER_MAIN_LINK_TEXT[step]} />
          </ListItem>
          {step === ENCOUNTER_STEPS.SCORE && (
            <EncounterElement
              type={eeType.deployment}
              details={deployments[deploymentId]}
              score
              menu
            />
          )}
          {step !== ENCOUNTER_STEPS.GENERATE && (
            <ListItem button onClick={this.openConfirmationDialog}>
              <ListItemText primary="End" />
            </ListItem>
          )}
          <Divider />
          <ListSubheader disableSticky>Rules:</ListSubheader>
          {Object.keys(rules)
            .map(ruleSection => (
              <ListItem
                key={ruleSection}
                button
                component={Link}
                to={`/rules/${ruleSection}`}
                onClick={this.closeDrawer}
              >
                <ListItemText primary={rules[ruleSection].sectionName} />
              </ListItem>
            ))}
          <Divider />
          <ListSubheader disableSticky>Crew Builders:</ListSubheader>
          <ListItem button component="a" href="https://m3e-crew-builder.herokuapp.com/" onClick={this.closeDrawer} target="_blank">
            <ListItemText primary="M3E Crew Builder" />
          </ListItem>
          <ListItem button component="a" href="https://m3e.hong-crewet.dk/" onClick={this.closeDrawer} target="_blank">
            <ListItemText primary="M3E Beta Analyzer" />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/contact" onClick={this.closeDrawer}>
            <ListItemText primary="Contact and Donates" />
          </ListItem>
          <ListItem button component={Link} to="/cookiepolicy" onClick={this.closeDrawer}>
            <ListItemText primary="Cookies and Privacy" />
          </ListItem>
          <ListItem button component={Link} to="/copyrights" onClick={this.closeDrawer}>
            <ListItemText primary="Copyrights" />
          </ListItem>
          {loginEnabled
            && (
            <ListItem button component={Link} to="/enable-login" onClick={this.closeDrawer}>
              <ListItemText primary="Beta Tests" />
            </ListItem>
            )}
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
              {`M3E Helper ${signed}`}
            </Typography>
            {loginEnabled && <SignIn updateAppState={updateAppState} />}
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
