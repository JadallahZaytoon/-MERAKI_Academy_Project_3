import { React, useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
export default function Dashboard() {

  const [articles,setArticles]=useState([]);
 
 const y= articles.map((elem)=>{

    return  <div><p>{`Title: ${elem.title}`}</p><p>{`Description: ${elem.description}`}</p></div>
  })
  

  

  const getArticles=()=>{

    
      axios.get(`http://localhost:5000/articles`).then((res) => {
        setArticles(res.data);
        console.log(res.data);

      });
      
  
  }

    


  return (
    <>
      <div className="body">
        <div className="articlesBody">{y}</div>
        <button onClick={getArticles}>Get All Articles</button>
      </div>
    </>
  );
}
