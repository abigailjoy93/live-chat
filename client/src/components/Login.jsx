import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import "../pages/Home/Home.css";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <section className="form-box">
      <form className="form" onSubmit={handleFormSubmit}>
        <h4 className="box-title">Already Have an Account?</h4>
        <label htmlFor="form-box" className="form-box-label">
          Log On
        </label>
        <div className="form-group">
          <label htmlFor="email" className="email-label">
            Email address:
          </label>
          <input
            className="form-control"
            placeholder="Your email"
            id="log-email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="log-pwd" className="password-label">
            Password:
          </label>
          <input
            className="form-control"
            placeholder="******"
            id="log-pwd"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="remember">
            <input type="checkbox" /> Remember me
          </label>
        </div>
        <button type="submit" className="form-btn">
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
