import { React, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect,
} from "react-router-dom";
import axios from "axios";

export default function Login({setpassed,setlogIn}) {
   

    console.log('setpassed', setpassed);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [errM, seterrM] = useState(false);

  const logInBtn = () => {
     
    axios
      .post("http://localhost:5000/login", {
        email,
        password
      })
      .then((result) => {
        // console.log(result.data.token);
        setpassed(result.data.token)
        setlogIn(true)
       
      })
      .catch((err) => {
        console.log(err);
        if(err.response.data){
            seterrM(true)
            seterrorMessage(err.response.data)
    }
      });
  };

  return (
      <>
      
    <div className="body">
        <h4>Login</h4>
      <input
        type="text"
        placeholder="Email here"
        onChange={(e) => {
          setemail(e.target.value);
        }}
      ></input>
      <input
        type="text"
        placeholder="Password here"
        onChange={(e) => {
          setpassword(e.target.value);
        }}
      ></input>
     <button className="loginBtn" onClick={logInBtn}>Login</button>
      {errM?(<div className="error">{errorMessage}</div>):null}
    </div>
   
    </>
  );
}
