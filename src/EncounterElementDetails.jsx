import React, { Component } from 'react';
import {
  withStyles, Grid, DialogTitle, DialogContent, IconButton, Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { eeType } from './EncounterElement';
import styles from './styles.jsx';
import { URL } from './config';


// eslint-disable-next-line react/prefer-stateless-function
class EncounterElementDetails extends Component {
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
            <img src={`${URL}/${picture}`} alt="deployment" className={classes.deploymentImg} />
          </Grid>
          <Typography align="justify">
            {desc}
          </Typography>
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

export default withStyles(styles)(EncounterElementDetails);
