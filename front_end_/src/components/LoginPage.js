import React, { useState } from "react";
import "../Style/LoginPage.css";
import Nav from "./nav";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { message } from "antd";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState("");



  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email: email,
          password: password,
        }
      );
      const user = response.data;
      
      setUser(user);
    } catch (error) {
      setError(error);
    }
  };

  if (user) {
    message.success("Login Succesfully");
    return <Navigate replace to="/Crud" />;
  } else {
    return (
      <div>
        <Nav />
        <div className="hero-section2">
          <div class="login-container">
            <form class="login-form">
              <h2>Login</h2>
              <div class="form-group">
                <label for="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit" onClick={handleLogin}>
                Login
              </button>
            </form>
            <div class="signup-link">
              <p>
                If you don't have an account?
                <Link to="/Registration">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default LoginPage;
