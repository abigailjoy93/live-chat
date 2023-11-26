import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import "./styles/Form.css";

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
    <main className="container">
      <div className="box">
        <h4 className="box-title">Log On:</h4>
        <div className="form">
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label className="box-label">Log On:</label>
              <br />
              <label htmlFor="email" className="email-label">
                Email address:
              </label>
              <br />
              <input
                className="form-control"
                placeholder="Your email"
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="pwd" className="password-label">
                Password:
              </label>
              <br />
              <input
                className="form-control"
                placeholder="******"
                id="pwd"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
              <div className="form-group">
                <br />
                <label className="remember">
                  <input type="checkbox" /> Remember me
                </label>
              </div>
              <br />
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
