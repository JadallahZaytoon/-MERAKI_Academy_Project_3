import { React, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import axios from "axios";


export default function Login ()  {
   
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
  return (
    <div className="body">
      <input
        type="text"
        placeholder="Email here"
        onChange={(e) => {
          setLoginEmail(e.target.value);
        }}
      ></input>
      <input
        type="text"
        placeholder="Password here"
        onChange={(e) => {
          setLoginPassword(e.target.value);
        }}
      ></input>
    </div>
  );
};
