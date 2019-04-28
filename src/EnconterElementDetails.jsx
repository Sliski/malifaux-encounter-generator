import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { eeType } from './EncounterElement';

const styles = theme => ({
  title: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
  content: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  img: {
    width: '200px',
    height: '200px',
  },
});

class DeploymentDetails extends Component {
  render() {
    const {
      details, type, handleClose, classes,
    } = this.props;
    const {
      name, picture, desc,
    } = details;

    let dialogContent;
    if (type === eeType.deployment) {
      dialogContent = (
        <DialogContent className={classes.content}>
          <Grid container justify="center">
            <Grid item sm>
              <Grid container justify="center">
                <img src={picture} alt="deployment" className={classes.img} />
              </Grid>
            </Grid>
            <Grid item sm>
              <Typography align="justify">
                {desc}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      );
    } else if (type === eeType.strategy) {
      dialogContent = (
        <DialogContent className={classes.content}>
          {desc}
        </DialogContent>
      );
    } else {
      dialogContent = (
        <DialogContent className={classes.content}>
          {desc.preparation && (
            <Typography align="justify" gutterBottom>
              {desc.preparation}
            </Typography>
          )}
          <Typography align="justify" gutterBottom>
            <strong>Reveal: </strong>
            {desc.reveal}
          </Typography>
          <Typography align="justify">
            <strong>End: </strong>
            {desc.end}
          </Typography>
        </DialogContent>
      );
    }
    return (
      <>
        <DialogTitle onClose={handleClose} className={classes.title} disableTypography>
          <Typography variant="h6">{name}</Typography>
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        {dialogContent}
      </>
    );
  }
}

export default withStyles(styles)(DeploymentDetails);
