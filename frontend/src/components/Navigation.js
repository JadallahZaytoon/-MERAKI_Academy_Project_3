import { React, useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default function Navigation({ passedToken }) {
  console.log("passed =", passedToken);
  return (
    <>
      <div className="header">
        {!passedToken ? <Link to="/login">login</Link> : null}
        {!passedToken ? <Link to="/register">register</Link> : null}
        {passedToken ? <Link to="/dashboard">Dashboard</Link> : null}
        {passedToken ? <Link to="/newArticle">New Article</Link> : null}
      </div>
    </>
  );
}
