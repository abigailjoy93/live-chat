import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import "../app2.css";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const emailValidate = () => {
    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formState.email);
  };

  const passwordValidate = () => {
    // Password validation using regex

    // This regex enforces the following rules:

    // At least one uppercase letter
    // At least one lowercase letter
    // At least one digit
    // At least one special character from the set [@ $ ! % * ? &]
    // Minimum length of 8 characters

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(formState.password);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    if (!emailValidate()) {
      console.log("Invalid email");
      return;
    }

    if (!passwordValidate()) {
      console.log("Invalid password");
      return;
    }

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="container">
      <div className="box">
        <h4 className="title">Sign Up:</h4>
        <div className="form">
          <form onSubmit={handleFormSubmit}>
            <div className="formGroup">
              <label htmlFor="email" className="email">
                Email Address:
              </label>
              <input className="formControl" placeholder="Account email" name="email" type="email" value={formState.email} onChange={handleChange}></input>
              <br />
              <label htmlFor="user" className="user">
                User Name:
              </label>
              <input className="formControl" placeholder="Username" name="username" type="text" value={formState.username} onChange={handleChange}></input>
              <br />
              <label htmlFor="pwd" className="password">
                Password:
              </label>
              <input class="formControl" placeholder="********" name="password" type="password" value={formState.password} onChange={handleChange}></input>
              <label className="requirements">Passwords must be at least 8 characters long and contain at least one uppercase letter, lowercase letter, number, and at least one character from this set [@ $ ! % * ? &]</label>
              <button type="submit" className="button btn-primary">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
