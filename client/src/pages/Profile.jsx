// imports
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ONE_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
// import { UPDATE_USER_EMAIL, UPDATE_USER_NAME, DELETE_USER } from "../components/ProfileMutations"

// page function
const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_ONE_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return //<-- make this goes to profile page
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

  return //<-- page here;
};

export default Profile;
