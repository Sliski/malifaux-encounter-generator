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
    width: '340px',
    maxWidth: '95hv',
    backgroundColor: theme.palette.background.paper,
  },
  paperWithPadding: {
    padding: theme.spacing.unit * 2,
    width: '340px',
    maxWidth: '95hv',
    backgroundColor: theme.palette.background.paper,
  },
  dialogPaper: {
    maxWidth: '95hv',
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
  dialogContentWoPadding: {
    padding: 0,
    margin: 0,
  },
});

export default styles;
