import { React, useEffect, useLayoutEffect, useState  } from "react";
import Register from "./components/Register";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";
import { BrowserRouter as Router, Switch, Route,Redirect,useHistory  } from "react-router-dom";

// jsx
const App = () => {
  const [passedToken, setpassed] = useState("");
  const [loggedIn, setlogIn] = useState(false);

  //   const handleToken = (string) => {
  //   console.log("",string);
  //   setpassed(string)
  // }

  // useEffect(() => {

  // }, [passedToken])

  console.log(`App: ${passedToken}`);
  console.log(`App: ${loggedIn}`);
  return (
    <>
      <div className="App">
        <Route render={() => <Navigation passedToken={passedToken} />} />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route
            exact
            path="/login"
            render={() => <Login setpassed={setpassed} setlogIn={setlogIn}/>}
          />
          <Route exact path="/Dashboard" component={Dashboard} />
         {loggedIn?<Redirect from="/login" to="/dashboard" /> <Route pa>
        </Switch>
      </div>
    </>
  );
};

export default App;
