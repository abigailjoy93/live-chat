import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  UPDATE_USER_EMAIL,
  UPDATE_USER_NAME,
  DELETE_USER,
} from "../utils/mutations";

// update user email
const UpdateUserEmail = ({ userId }) => {
  const [formState] = useState({
    email: "",
    password: "",
  });

  const [updateUserMutation, { loading, error }] =
    useMutation(UPDATE_USER_EMAIL);

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
    <div>
      <button className="form-btn" onClick={handleUpdateEmail} disabled={loading}>
        {loading ? "Updating..." : "Update Email"}
      </button>

      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

// update user name
const UpdateUserName = ({ userId }) => {
  const [formState] = useState({
    username: "",
    password: "",
  });

  const [updateUserMutation, { loading, error }] =
    useMutation(UPDATE_USER_NAME);

  const handleUpdateName = async () => {
    try {
      const { data } = await updateUserMutation({
        variables: {
          ...formState,
          _id: userId,
          newUserData: {
            username: "",
          },
        },
      });

      console.log("User updated:", data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <button className="form-btn" onClick={handleUpdateName} disabled={loading}>
        {loading ? "Updating..." : "Update User"}
      </button>

      {error && <p>Error: {error.message}</p>}
    </div>
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
      <button className="form-btn" onClick={handleDeleteUser} disabled={loading}>
        {loading ? "Deleting..." : "Delete User"}
      </button>

      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export { UpdateUserEmail, UpdateUserName, DeleteUser };
