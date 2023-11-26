import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import "../pages/Home/Home.css";

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

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
    <section className="container">
      <div className="box">
        <h4 className="boxtitle">New to Live Chat?</h4>
        <div className="form">
          <form onSubmit={handleFormSubmit}>
            <div>
              {/* <label htmlFor="box" className="boxlabel">
                Sign Up:
              </label> */}
              <div>
                <label htmlFor="su-email" className="email">
                  Email address:
                </label>
                <br />
                <input
                  type="email"
                  className="form-control"
                  id="su-email"
                  name="email"
                  placeholder="Account email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="user" className="username">
                  Username:
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="user"
                  name="username"
                  placeholder="Username"
                  value={formState.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="su-pwd" className="password">
                  Password:
                </label>
                <br />
                <input
                  type="password"
                  className="form-control"
                  id="su-pwd"
                  name="password"
                  placeholder="******"
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="requirements">
                  Passwords must be at least 8 characters long and contain at
                  least one uppercase letter, lowercase letter, number, and at
                  least one character from this set [@ $ ! % * ? &]
                </label>
              </div>
              <br />
              <button
                type="submit"
                className="btn btn-default btn-block btn-primary"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
