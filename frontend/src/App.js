import {Route, Switch} from "react-router-dom";
import {Typography} from "@mui/material";
import Main from "./containers/Main/Main";
import Layout from "./components/UI/Layout/Layout";
import Artist from "./containers/Artist/Artist";
import Tracks from "./containers/Tracks/Tracks";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";

const App = () => (
  <Layout>
    <Switch>
      <Route path="/" exact component={Main}/>
      <Route path="/artists/:id" component={Artist}/>
      <Route path="/albums/:id" component={Tracks}/>
      <Route path="/register" component={Register}/>
      <Route path="/login" component={Login}/>
      <Route path="*" render={() => <Typography variant="h1" textAlign="center">Not found!</Typography>}/>
    </Switch>
  </Layout>
);

export default App;
