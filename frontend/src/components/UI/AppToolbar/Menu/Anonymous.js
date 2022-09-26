import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

const Anonymous = () => {
  return (
    <>
      <Button component={Link} to="/register" color="inherit" sx={{fontSize: "18px", marginRight: "10px"}}>
        Sign Up
      </Button>
      <Button component={Link} to="/login" color="inherit" sx={{fontSize: "18px"}}>
        Sign In
      </Button>
    </>
  );
};

export default Anonymous;