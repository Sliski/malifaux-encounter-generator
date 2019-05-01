import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { eeType } from './EncounterElement';
import styles from './styles.jsx';


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
        <DialogContent className={classes.dialogContent}>
          <Grid container justify="center">
            <Grid item sm>
              <Grid container justify="center">
                <img src={picture} alt="deployment" className={classes.deploymentImg} />
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
        <DialogContent className={classes.dialogContent}>
          {desc}
        </DialogContent>
      );
    } else {
      dialogContent = (
        <DialogContent className={classes.dialogContent}>
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
        <DialogTitle onClose={handleClose} className={classes.dialogTitle} disableTypography>
          <Typography variant="h6">{name}</Typography>
          <IconButton className={classes.dialogCloseButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        {dialogContent}
      </>
    );
  }
}

export default withStyles(styles)(DeploymentDetails);
