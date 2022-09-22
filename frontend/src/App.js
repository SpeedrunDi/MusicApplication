import {Route, Switch} from "react-router-dom";
import Main from "./containers/Main/Main";
import Layout from "./components/UI/Layout/Layout";

const App = () => (
  <Layout>
    <Switch>
      <Route path="/" exact component={Main}/>
    </Switch>
  </Layout>
);

export default App;
