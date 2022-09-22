import React from 'react';
import {AppBar, Grid, Toolbar, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import Logo from "../Logo/Logo";

const useStyles = makeStyles()(theme => ({
  staticToolbar: {
    marginBottom: theme.spacing(2),
  }
}));

const AppToolbar = () => {
  const {classes} = useStyles();

  return (
    <>
      <AppBar position="fixed">
        <AppToolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              <Logo/>
            </Typography>
          </Grid>
        </AppToolbar>
      </AppBar>
      <Toolbar className={classes.staticToolbar}/>
    </>
  );
};

export default AppToolbar;