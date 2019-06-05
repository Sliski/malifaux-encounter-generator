import React, { Component } from 'react';
import ls from 'local-storage';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar, Button, Dialog, DialogContent, DialogActions, Divider, Drawer, Hidden, IconButton, List, ListItem,
  ListItemText, ListSubheader, Toolbar, Typography, Collapse,
} from '@material-ui/core';
import { ExpandLess, ExpandMore, Menu } from '@material-ui/icons';
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
      showSaveDialog: false,
      expandedRules: false,
      loginEnabled: ls.get('betaUser'),
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.openConfirmationDialog = this.openConfirmationDialog.bind(this);
    this.closeConfirmationDialog = this.closeConfirmationDialog.bind(this);
    this.openSaveDialog = this.openSaveDialog.bind(this);
    this.closeSaveDialog = this.closeSaveDialog.bind(this);
    this.toggleExpandedRules = this.toggleExpandedRules.bind(this);
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

  openSaveDialog() {
    this.setState({ showSaveDialog: true });
  }

  closeSaveDialog() {
    this.setState({ showSaveDialog: false });
  }

  toggleExpandedRules() {
    this.setState(prevState => ({ expandedRules: !prevState.expandedRules }));
  }

  render() {
    const {
      classes, handleEndEncounter, handleSaveEncounter, step, deploymentId, updateAppState, signed, gameId,
    } = this.props;
    const {
      showConfirmationDialog, showSaveDialog, loginEnabled, expandedRules,
    } = this.state;

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
            <>
              {(loginEnabled && gameId && signed) ? (
                <ListItem button onClick={this.openSaveDialog}>
                  <ListItemText primary="Save" />
                </ListItem>
              ) : null}
              <ListItem button onClick={this.openConfirmationDialog}>
                <ListItemText primary="End" />
              </ListItem>
            </>
          )}
          <Divider />
          {loginEnabled && (
            <>
              <ListItem disabled={!signed} button component={Link} to="/games-history" onClick={this.closeDrawer}>
                <ListItemText primary="My Games" secondary={signed ? '' : 'Signed users only.'} />
              </ListItem>
              <Divider />
            </>
          )}
          <ListItem button onClick={this.toggleExpandedRules}>
            <ListItemText primary="Rules" />
            {expandedRules ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={expandedRules} timeout="auto" unmountOnExit>
            <List disablePadding>
              {Object.keys(rules)
                .map(ruleSection => (
                  <ListItem
                    key={ruleSection}
                    className={classes.nestedListItem}
                    button
                    component={Link}
                    to={`/rules/${ruleSection}`}
                    onClick={this.closeDrawer}
                  >
                    <ListItemText primary={rules[ruleSection].sectionName} />
                  </ListItem>
                ))}
            </List>
          </Collapse>
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
          <Divider />
          <ListSubheader disableSticky>Links:</ListSubheader>
          <ListItem button component="a" href="https://www.wyrd-games.net/" onClick={this.closeDrawer} target="_blank">
            <ListItemText primary="Wyrd Games" />
          </ListItem>
          <ListItem button component="a" href="https://m3e-crew-builder.herokuapp.com/" onClick={this.closeDrawer} target="_blank">
            <ListItemText primary="M3E Crew Builder" />
          </ListItem>
          <ListItem button component="a" href="https://m3e.hong-crewet.dk/" onClick={this.closeDrawer} target="_blank">
            <ListItemText primary="M3E Beta Analyzer" />
          </ListItem>
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
              <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap className={classes.pageTitle}>
              {'M3E Helper'}
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
              {signed && gameId
                ? 'Do you want to end encounter? Encounter results will be saved in your games history.'
                : 'Do you want to end encounter? All encounter data will be lost.'}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeConfirmationDialog} color="secondary">
              {'Cancel'}
            </Button>
            <Button
              component={Link}
              to="/"
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
        <Dialog
          classes={{ paper: classes.dialogPaper }}
          open={showSaveDialog}
          onClose={this.closeSaveDialog}
        >
          <DialogContent className={classes.dialogContent}>
            <Typography align="justify">
              {'Do you want to save encounter? It will save and unload encounter. You will be able to continue the encounter after loading it from "My Games" section.'}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeSaveDialog} color="secondary">
              {'Cancel'}
            </Button>
            <Button
              component={Link}
              to="/"
              onClick={() => {
                this.closeSaveDialog();
                this.closeDrawer();
                handleSaveEncounter();
              }}
              color="primary"
              autoFocus
            >
              {'Save'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(NavigationBar);
