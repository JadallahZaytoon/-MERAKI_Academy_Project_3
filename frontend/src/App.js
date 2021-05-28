import { React, useEffect, useLayoutEffect, useState } from "react";
import Register from "./components/Register";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NewArticle from "./components/NewArticle";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";

// jsx
const App = () => {
  const [passedToken, setpassed] = useState("");

  console.log(`App: ${passedToken}`);

  return (
    <>
      <div className="App">
        <Route render={() => <Navigation passedToken={passedToken} />} />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route
            exact
            path="/login"
            render={() => <Login setpassed={setpassed} />}
          />
          <Route exact path="/Dashboard" component={Dashboard} />
          <Route
           exact
           path="/NewArticle"
           render={()=> <NewArticle passedToken={passedToken} />}/>
        </Switch>
      </div>
    </>
  );
};

export default App;
