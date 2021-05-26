import { React, useEffect, useLayoutEffect, useState } from "react";
import Register from "./components/Register";
import Navigation from "./components/Navigation";
import Login from "./components/Login"
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// jsx
const App = () => {
  return (
    <>
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </>
  );
};



export default App;
