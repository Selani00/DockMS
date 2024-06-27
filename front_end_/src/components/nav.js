import React from "react";
import "../Style/Nav.css";
import logo from "../img/Logo-1.png";
import { Link } from "react-router-dom";



const Nav = () => {

  return (
    <div>
      <div className="navigate-wrapper">
        <div className="left-column">
          <img src={logo} alt="" />
          <p>Media Mind</p>
        </div>

        <div className="center-column">
          <div className="links-wrapper">
            <div className="links">              
                <Link to="/">Home</Link>             
            </div>          
          </div>
        </div>

        <div className="right-column">
          <Link to="/Login">
            <button>Sign In</button>
          </Link>
          <Link to="/Registration">
            <button>Sign Up</button>
          </Link>
        </div>
      </div>

      <div className="footer-section">
        &copy; 2023 Document Management System &#124; Media Mind &#124; All
        rights reserverd
      </div>
    </div>
  );
};

export default Nav;
