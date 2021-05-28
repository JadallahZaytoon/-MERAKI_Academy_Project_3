import { React, useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
export default function NewArticle({passedToken}) {
const [title,setTitle]=useState("");
const [description,setDescription]=useState("");

const createNew =()=>{

axios
.post("/articles",{
    title,
    description
})

}

  return (
    <>
      <div className="body">
        <div className="createArticlesBody">
            <input type="text"
        placeholder="article title here"></input>
            <textarea className="discription" placeholder="article description here" 
            onChange={(e) => {
                setDescription(e.target.value);
              }}></textarea>
        </div>
        <button id="NewArticle" onClick={createNew}>Create New Article</button>
      </div>
    </>
  );
}
