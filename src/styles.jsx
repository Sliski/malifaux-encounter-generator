const menuDrawerWidth = 240;

const styles = theme => ({
  // App
  appContent: {
    display: 'flex',
  },
  main: {
    flexGrow: 1,
    padding: theme.spacing.unit,
  },
  toolbar: theme.mixins.toolbar,
  // Encounter Element List
  paper: {
    maxWidth: '680px',
    minWidth: '340px',
    backgroundColor: theme.palette.background.paper,
  },
  paperWithPadding: {
    padding: theme.spacing.unit * 2,
    maxWidth: '680px',
    minWidth: '340px',
    backgroundColor: theme.palette.background.paper,
  },
  dialogPaper: {
    maxWidth: '680px',
    minWidth: '340px',
    maxHeight: '95vh',
    [theme.breakpoints.down('xs')]: {
      margin: '5px',
    },
  },
  dialogTitle: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  dialogCloseButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
  dialogContent: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  // EncounterElement
  // EncounterElementDetails
  deploymentImg: {
    width: '200px',
    height: '200px',
  },
  // Generator
  // NavigationBar
  menuDrawer: {
    [theme.breakpoints.up('sm')]: {
      width: menuDrawerWidth,
      flexShrink: 0,
    },
  },
  nestedListItem: {
    paddingLeft: theme.spacing.unit * 4,
  },
  appBar: {
    marginLeft: menuDrawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${menuDrawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: menuDrawerWidth,
  },
  pageTitle: {
    flexGrow: 1,
  },
  // Score
  noMarginNoPadding: {
    paddingLeft: 0,
    paddingRight: 0,
    margin: 0,
  },
  opponentScore: {
    paddingLeft: theme.spacing.unit * 1,
    paddingRight: theme.spacing.unit * 0,
  },
  myScore: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  llPadding: {
    paddingLeft: theme.spacing.unit * 6,
  },
  // MultiplayerLinkButton
  fullWidth: {
    width: '100%',
    padding: 0,
  },
  // ChooseCrew
  halfWidth: {
    width: '50%',
    padding: 0,
  },
  widthOhp: {
    width: '100%',
  },
  noVerticalPadding: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  black: {
  },
});

export default styles;
