import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import "./Auth.css";

const initialUserDetails = {
  fullName: "",
  username: "",
  password: "",
  avatar: "",
};

const cookies = new Cookies();

const Auth = () => {
  const [registered, setRegistered] = useState(false);
  const [form, setForm] = useState(initialUserDetails);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const { username, password, avatar } = form;

    const URL = "https://chat-app-tfkh.onrender.com";

    // const URL = "http://localhost:5000/auth";

    const {
      data: { token, userId, hashedPassword, fullName },
    } = await axios.post(`${URL}/${registered ? "login" : "signup"}`, {
      username,
      password,
      fullName: form.fullName,
      avatar,
    });
    cookies.set("token", token);
    cookies.set("username", username);
    cookies.set("fullName", fullName);
    cookies.set("userId", userId);

    if (!registered) {
      cookies.set("avatar", avatar);
      cookies.set("hashedPassword", hashedPassword);
    }

    window.location.reload();
  };

  const formHandler = (event) => {
    // spread form to keep other inputs, and change the current value
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div className="auth-container">
      <div className="auth-fields">
        <h1>{registered ? "Sign in" : "Sign up"}</h1>
        <form onSubmit={formSubmitHandler}>
          {!registered && (
            <div className="input-field">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Full Name"
                onChange={formHandler}
                required
              />
            </div>
          )}
          <div className="input-field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              onChange={formHandler}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={formHandler}
              required
            />
          </div>
          {!registered && (
            <div className="input-field">
              <label htmlFor="avatar">Avatar</label>
              <input
                type="url"
                name="avatar"
                id="avatar"
                placeholder="Avatar URL (Optional)"
                onChange={formHandler}
              />
            </div>
          )}
          <button className="sign-button">
            {registered ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <p className="sign-options">
          {registered ? "Don't have an account? " : "Already Signed Up? "}
          <span
            onClick={() => setRegistered((prevRegistered) => !prevRegistered)}
          >
            <b>{registered ? "Sign up" : "Sign in"}</b>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
