import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

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
    <main className="flex-row justify-center mb-">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <div className="form">
                <label className="boxtitle" htmlFor="box">
                  Sign Up:
                </label>
                <div className="form-group">
                  <label id="first-name-text" htmlFor="first-name">
                    First name:
                  </label>
                  <label id="last-name-text" htmlFor="last-name">
                    Last name:
                  </label>
                  <br />
                  <input type="text" className="form-control" id="first-name" />
                  <input type="text" className="form-control" id="last-name" />
                </div>
                <div className="form-group">
                  <label className="email" htmlFor="email">
                    Email address:
                  </label>
                  <br />
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Account email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="username" htmlFor="user">
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
                <div className="form-group">
                  <label className="password" htmlFor="pwd">
                    Password:
                  </label>
                  <br />
                  <input
                    type="password"
                    className="form-control"
                    id="pwd"
                    name="password"
                    placeholder="******"
                    value={formState.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="requirements">
                  <label className="requirements">
                    Passwords must be at least 8 characters long and contain at
                    least one uppercase letter, lowercase letter, number, and at
                    least one character from this set \[@ $ ! % * ? &\]
                  </label>
                </div>
                <br />
                <button
                  type="submit"
                  className="btn btn-default btn-block btn-primary"
                  style={{ cursor: "pointer" }}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
