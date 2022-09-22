import {Route, Switch} from "react-router-dom";
import Main from "./containers/Main/Main";
import Layout from "./components/UI/Layout/Layout";
import Artist from "./containers/Artist/Artist";
import {Typography} from "@mui/material";

const App = () => (
  <Layout>
    <Switch>
      <Route path="/" exact component={Main}/>
      <Route path="/artist/:id" component={Artist}/>
      <Route path="*" render={() => <Typography variant="h1" textAlign="center">Not found!</Typography>}/>
    </Switch>
  </Layout>
);

export default App;
