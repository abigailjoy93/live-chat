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
    <main
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: "var(--margin-bottom)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "65rem",
        }}
      >
        <div
          style={{
            border: "5px solid var(--accent)",
            marginLeft: "25px",
            marginRight: "25px",
            marginBottom: "15px",
            marginTop: "5px",
            backgroundColor: "var(--light)",
          }}
        >
          <h4
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--pop)",
              padding: "0.5rem",
              fontSize: "1.5rem",
            }}
          >
            Sign Up
          </h4>
          <div style={{ padding: "1rem" }}>
            <form onSubmit={handleFormSubmit}>
              <div>
                <label
                  style={{
                    fontSize: "1.2rem",
                  }}
                  htmlFor="box"
                >
                  Sign Up:
                </label>
                <div>
                  <label
                    style={{
                      margin: "75px",
                      fontSize: "1rem",
                    }}
                    htmlFor="first-name"
                  >
                    First name:
                  </label>
                  <label
                    style={{
                      margin: "75px",
                      fontSize: "1rem",
                    }}
                    htmlFor="last-name"
                  >
                    Last name:
                  </label>
                  <br />
                  <input
                    style={{
                      height: "28px",
                      width: "15vw",
                      alignItems: "center",
                      border: "2px solid var(--pop)",
                    }}
                    type="text"
                    className="form-control"
                    id="first-name"
                  />
                  <input
                    style={{
                      height: "28px",
                      width: "15vw",
                      alignItems: "center",
                      border: "2px solid var(--pop)",
                    }}
                    type="text"
                    className="form-control"
                    id="last-name"
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "1rem",
                    }}
                    className="email"
                    htmlFor="email"
                  >
                    Email address:
                  </label>
                  <br />
                  <input
                    style={{
                      height: "28px",
                      width: "30vw",
                      alignItems: "center",
                      border: "2px solid var(--pop)",
                    }}
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Account email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "1rem",
                    }}
                    className="username"
                    htmlFor="user"
                  >
                    Username:
                  </label>
                  <br />
                  <input
                    style={{
                      height: "28px",
                      width: "30vw",
                      alignItems: "center",
                      border: "2px solid var(--pop)",
                    }}
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
                  <label
                    style={{
                      fontSize: "1rem",
                    }}
                    className="password"
                    htmlFor="pwd"
                  >
                    Password:
                  </label>
                  <br />
                  <input
                    style={{
                      height: "28px",
                      width: "30vw",
                      alignItems: "center",
                      border: "2px solid var(--pop)",
                    }}
                    type="password"
                    className="form-control"
                    id="pwd"
                    name="password"
                    placeholder="******"
                    value={formState.password}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                    className="requirements"
                  >
                    Passwords must be at least 8 characters long and contain at
                    least one uppercase letter, lowercase letter, number, and at
                    least one character from this set \[@ $ ! % * ? &\]
                  </label>
                </div>
                <br />
                <button
                  style={{
                    height: "35px",
                    width: "100px",
                    fontSize: "15px",
                    cursor: "pointer",
                  }}
                  type="submit"
                  className="btn btn-default btn-block btn-primary"
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
