import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {useDispatch} from "react-redux";
import {Button} from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import {facebookAppId} from "../../config";
import {facebookLogin} from "../../store/actions/usersActions";

const FacebookLogin = ({history}) => {
  const dispatch = useDispatch();

  const facebookResponse = async response => {
    await dispatch(facebookLogin(response));
    history.push('/');
  };

  return (
    <FacebookLoginButton
      appId={facebookAppId}
      fields="name, email, picture"
      callback={facebookResponse}
      render={props => (
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          startIcon={<FacebookIcon/>}
          onClick={props.onClick}
        >
          Enter with Facebook
        </Button>
      )}
    />
  );
};

export default FacebookLogin;