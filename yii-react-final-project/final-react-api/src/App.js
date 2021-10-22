import "./App.css";
//import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./Modules/Home";
import Project from "./Modules/Project/Project";
import Modules from "./Modules/Module/Modules";
import Api from "./Modules/Api/Api";
import Users from "./Modules/Users/Users";
import UsersAddress from "./Modules/Users Address/UserAddress";
import Layout from "./Shared/UI/Header/Layout";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/project" exact>
          <Project />
        </Route>
        <Route path="/modules" exact>
          <Modules />
        </Route>
        <Route path="/api" exact>
          <Api />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/useraddress" exact>
          <UsersAddress />
        </Route>
        <Route path="/">
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
