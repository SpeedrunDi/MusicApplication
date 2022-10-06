import {Route, Switch} from "react-router-dom";
import {Typography} from "@mui/material";
import Main from "./containers/Main/Main";
import Layout from "./components/UI/Layout/Layout";
import Artist from "./containers/Artist/Artist";
import Tracks from "./containers/Tracks/Tracks";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import UserHistory from "./containers/UserHistory/UserHistory";
import AddArtist from "./containers/AddArtist/AddArtist";

const App = () => (
  <Layout>
    <Switch>
      <Route path="/" exact component={Main}/>
      <Route path="/artists/new" component={AddArtist}/>
      <Route path="/artists/:id" component={Artist}/>
      <Route path="/albums/:id" component={Tracks}/>
      <Route path="/register" component={Register}/>
      <Route path="/login" component={Login}/>
      <Route path="/user_history" component={UserHistory}/>
      <Route path="*" render={() => <Typography variant="h1" textAlign="center">Not found!</Typography>}/>
    </Switch>
  </Layout>
);

export default App;
