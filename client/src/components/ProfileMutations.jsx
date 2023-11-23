import React from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_EMAIL, UPDATE_USER_NAME, DELETE_USER } from "../utils/mutations";

const UpdateUserEmail = () => {
  const [updateUserMutation, { loading, error }] =
    useMutation(UPDATE_USER_EMAIL);

  const handleUpdateEmail = async () => {
    try {
      const { data } = await updateUserMutation({
        variables: {
          // variables
          userId: "123",
          newUserData: {
            // updated data
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
      <button onClick={handleUpdateEmail} disabled={loading}>
        {loading ? "Updating..." : "Update User"}
      </button>

      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

const UpdateUserName = () => {
  const [updateUserMutation, { loading, error }] =
    useMutation(UPDATE_USER_NAME);

  const handleUpdateName = async () => {
    try {
      const { data } = await updateUserMutation({
        variables: {
          // variables
          userId: "123",
          newUserData: {
            // updated data
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
      <button onClick={handleUpdateName} disabled={loading}>
        {loading ? "Updating..." : "Update User"}
      </button>

      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

const DeleteUser = ({ userId }) => {
  const [deleteUserMutation, { loading, error }] = useMutation(DELETE_USER);

  const handleDeleteUser = async () => {
    try {
      const { data } = await deleteUserMutation({
        variables: {
          userId: _id,
        },
      });

      console.log("User deleted:", data);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <button onClick={handleDeleteUser} disabled={loading}>
        {loading ? "Deleting..." : "Delete User"}
      </button>

      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default { UpdateUserEmail, UpdateUserName, DeleteUser };
