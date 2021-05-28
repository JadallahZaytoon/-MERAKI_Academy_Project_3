import { React, useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
export default function Dashboard() {

  const getArticles=()=>{

    axios
    .get("http://localhost:5000/articles")
    .then((result))
  
  }



  return (
    <>
      <div className="body">
        <div className="articlesBody"></div>
        <button onClick={getArticles}>Get All Articles</button>
      </div>
    </>
  );
}
