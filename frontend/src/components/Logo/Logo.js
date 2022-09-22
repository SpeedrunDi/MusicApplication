import React from 'react';
import {Link} from "react-router-dom";

import logo from '../../assets/logo.png';

const Logo = () => {
  return (
    <Link to='/'>
      <img src={logo} style={{width: "90px", height: "auto"}} alt="Logo"/>
    </Link>
  );
};

export default Logo;