import {React ,useEffect, useState}  from 'react';
import {BrowserRouter as Router,Link,} from "react-router-dom";

export default function Navigation(){
    return(
    <div className="header">
    <Link to="/login">login</Link>
    <Link to="/register">register</Link>
    </div>
  )
  };