import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import "../App.css";

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
        <h4 className="title">Log On:</h4>
        <div className="form">
          <form onSubmit={handleFormSubmit}>
            <div className="formGroup">
              <label htmlFor="email" className="email">
                Email address:
              </label>
              <input className="formControl" placeholder="Your email" name="email" type="email" value={formState.email} onChange={handleChange} />
              <br />
              <label htmlFor="pwd" className="password">
                Password:
              </label>
              <input className="formControl" placeholder="******" name="password" type="password" value={formState.password} onChange={handleChange} />
              <label className="remember">
                <input type="checkbox" /> Remember me
              </label>
              <button type="submit" className="button btn-primary">
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
