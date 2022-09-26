import React from 'react';
import {useSelector} from "react-redux";
import {AppBar, Grid, Toolbar, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Logo from "../../Logo/Logo";
import Anonymous from "./Menu/Anonymous";
import UserMenu from "./Menu/UserMenu";

const useStyles = makeStyles()(theme => ({
  staticToolbar: {
    marginBottom: theme.spacing(4),
  }
}));

const AppToolbar = () => {
  const {classes} = useStyles();

  const user = useSelector(state => state.users.user);

  return (
    <>
      <AppBar position="fixed">
        <ToastContainer/>
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center" paddingTop="10px">
            <Grid item>
              <Typography variant="h6">
                <Logo/>
              </Typography>
            </Grid>
            <Grid item>
              {user ? <UserMenu user={user}/> : <Anonymous/>}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.staticToolbar}/>
    </>
  );
};

export default AppToolbar;