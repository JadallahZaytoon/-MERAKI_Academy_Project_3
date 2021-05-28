import { React, useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
export default function NewArticle({ passedToken }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [succsess, setSuccsess] = useState(false);
  const [unsUccsess, setUnSccsess] = useState(false);

  const createNew = () => {
    axios
      .post(
        "http://localhost:5000/articles",
        {
          title,
          description,
        },
        {
          headers: {
            authorization: "Bearer " + passedToken,
          },
        }
      )
      .then((result) => {
        if (!result.data.errors) {
          setSuccsess(true);
          setUnSccsess(false);
        } else {
          setSuccsess(false);
          setUnSccsess(true);
        }
      })
      .catch((err) => {
        console.log("hello");
        console.log(err);
      });
  };

  return (
    <>
      <div className="body">
        <div className="createArticlesBody">
          <input
            type="text"
            placeholder="article title here"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
          <textarea
            className="discription"
            placeholder="article description here"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <button id="NewArticle" onClick={createNew}>
          Create New Article
        </button>
        {succsess ? (
          <div className="success">
            The article has been created successfully
          </div>
        ) : null}
        {unsUccsess ? (
          <div className="error">
            Error happened while creating a new article, please try again
          </div>
        ) : null}
      </div>
    </>
  );
}
