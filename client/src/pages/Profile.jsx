//User Page

// imports
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { UPDATE_USER_EMAIL, UPDATE_USER_NAME, DELETE_USER} from "../utils/mutations"
import Auth from "../utils/auth";

// page function
const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />; //<-- make this go to profile page
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        Please log in to see this!
      </h4>
    );
  }

  return <div></div>;
};

export default Profile;

// to do
// add update username functionality
// add update user email functionality
// add delete user functionality
