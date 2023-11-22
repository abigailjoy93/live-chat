import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

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
            Log On:
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
                  Log On:
                </label>
                <br />
                <label
                  style={{
                    fontSize: "1rem",
                  }}
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
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <br />
                <label
                  style={{
                    fontSize: "1rem",
                  }}
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
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <div>
                  <br />
                  <label
                    style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                    className="remember"
                  >
                    <input type="checkbox" /> Remember me
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
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
  

export default Login;
