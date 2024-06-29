import React from "react";
import "../Style/Home.css";
import Nav from "./nav";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Nav />
      <div className="hero-section">
        <div className="text-wrapping">
          <div className="top-heading">
            <h1>Welcome</h1>
          </div>
          <div className="bottom-heading">
            <h2>Document Management System</h2>
          </div>
          <div className="Para">
            <p>
              "Simplify your document management with our streamlined solution.
              Efficiently organize and secure your valuable data. Encourage
              collaboration and enhance productivity with ease. Join us to
              experience a more efficient way to manage your documents."
            </p>
          </div>
          <div className="button-home">
            <Link to="/Login">
              <button>Let's Start</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
