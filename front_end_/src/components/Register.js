import React, { useState } from "react";
import Nav from "./nav";
import axios from "axios";
import "../Style/Register.css";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/user/register", {
        email: email,
        password: password,
      });

      setEmail("");
      setPassword("");
      
      message.success("Registration successful");

      navigate("/Login");
    } catch (error) {
      message.error("Error during registration");
    }
  };

  return (
    <div>
      <Nav />
      <div className="hero-section3">
        <div class="registration-container">
          <h1>Welcome</h1>
          <h4>Welcome to our Document Management System! </h4>
          <p>
            Seamlessly organize, track, and secure records of incoming and
            outgoing documents. Join us to streamline your document management
            process with ease.
          </p>
          <form class="registration-form">
            <div class="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
            </div>
            <div class="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              ></input>
            </div>
      
            <button onClick={handleSave}>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
