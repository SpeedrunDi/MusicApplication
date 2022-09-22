import React from 'react';
import {AppBar, Grid, Toolbar, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import Logo from "../Logo/Logo";

const useStyles = makeStyles()(theme => ({
  staticToolbar: {
    marginBottom: theme.spacing(4),
  }
}));

const AppToolbar = () => {
  const {classes} = useStyles();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center" paddingTop="10px">
            <Typography variant="h6">
              <Logo/>
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.staticToolbar}/>
    </>
  );
};

export default AppToolbar;