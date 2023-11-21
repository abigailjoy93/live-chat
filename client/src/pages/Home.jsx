//Where you can login and sign up

// imports
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

// home page function
const Home = () => {

  //signup function
  const signupHandler = () => {
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

    const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log(formState);

      try {
        const { data } = await addUser({
          variables: { ...formState },
        });

        Auth.login(data.addUser.token);
      } catch (e) {
        console.error(e);
      }
    };
  };

  // login function
  const loginHandler = (props) => {
    const [formState, setFormState] = useState({ email: "", password: "" });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
      const { name, value } = event.target;

      setFormState({
        ...formState,
        [name]: value,
      });
    };

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

      setFormState({
        email: "",
        password: "",
      });
    };

    return; //<-- page here;
  };
};

export default { Home };
