import {Route, Switch} from "react-router-dom";
import Main from "./containers/Main/Main";

const App = () => (
  <Switch>
    <Route path="/" exact component={Main}/>
  </Switch>
);

export default App;
