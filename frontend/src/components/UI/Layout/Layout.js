import React from 'react';
import {Container} from "@mui/material";
import AppToolbar from "../AppToolbar/AppToolbar";

const Layout = ({children}) => {
  return (
    <>
      <AppToolbar/>
      <main>
        <Container maxWidth="lg">
          {children}
        </Container>
      </main>
    </>
  );
};

export default Layout;