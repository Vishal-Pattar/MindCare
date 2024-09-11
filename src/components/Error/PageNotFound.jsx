import React from "react";
import "./Error.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="error__container">
      <div className="error__code">404</div>
      <div className="error__title">Oops! Page not found</div>
      <div className="error__desc">The page you`re looking for doesn't exists or has been moved.</div>
      <Link to="/"><button className="error__button">Go Home</button>
        </Link>
    </div>
  );
};

export default PageNotFound;
