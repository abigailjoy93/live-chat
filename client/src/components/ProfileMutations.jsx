import React, { useState } from "react";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import {
  UPDATE_USER_EMAIL,
  UPDATE_USER_NAME,
  DELETE_USER,
} from "../utils/mutations";

// update user email
const UpdateUserEmail = ({ userId }) => {
  const [formState, setFormState] = useState({
    email: "",
  });

  const [updateUserMutation, { loading, error }] =
    useMutation(UPDATE_USER_EMAIL);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleUpdateEmail = async () => {
    try {
      const { data } = await updateUserMutation({
        variables: {
          ...formState,
          _id: userId,
          newUserData: {
            email: "",
          },
        },
      });

      console.log("User updated:", data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <form onSubmit={handleUpdateEmail}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          id="new-email"
          name="email"
          placeholder="New email"
          value={formState.email}
          onChange={handleChange}
        />
      </div>
      <button className="form-btn">Update Email</button>
    </form>
  );
};

// update user name
const UpdateUserName = ({ userId }) => {
  const [formState, setFormState] = useState({
    username: "",
  });

  const [updateUserMutation, { loading, error }] =
    useMutation(UPDATE_USER_NAME);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleUpdateName = async () => {
    try {
      const { data } = await updateUserMutation({
        variables: {
          _id: userId,
          newUserData: {
            username: formState.username,
          },
        },
      });

      console.log(data);

      console.log("User updated:", data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <form onSubmit={handleUpdateName}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="new-user"
          name="username"
          placeholder="New username"
          value={formState.username}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="form-btn">
        Update User
      </button>
    </form>
  );
};

// delete user
const DeleteUser = ({ userId }) => {
  const [deleteUserMutation, { loading, error }] = useMutation(DELETE_USER);

  const handleDeleteUser = async () => {
    try {
      const { data } = await deleteUserMutation({
        variables: {
          _id: userId,
        },
      });

      console.log("User deleted:", data);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <button
        className="form-btn"
        onClick={handleDeleteUser}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Deleted User"}
      </button>

      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export { UpdateUserEmail, UpdateUserName, DeleteUser };
