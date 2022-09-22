import {Route, Switch} from "react-router-dom";
import Main from "./containers/Main/Main";
import Layout from "./components/UI/Layout/Layout";
import Artist from "./containers/Artist/Artist";
import {Typography} from "@mui/material";
import Tracks from "./containers/Tracks/Tracks";

const App = () => (
  <Layout>
    <Switch>
      <Route path="/" exact component={Main}/>
      <Route path="/artists/:id" component={Artist}/>
      <Route path="/albums/:id" component={Tracks}/>
      <Route path="*" render={() => <Typography variant="h1" textAlign="center">Not found!</Typography>}/>
    </Switch>
  </Layout>
);

export default App;
