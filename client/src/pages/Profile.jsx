// imports
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ONE_USER, QUERY_ME } from "../utils/queries";
import userKitty from "../assets/cat.png";
import logo from "../assets/liveChatHighResolutionLogoTransparent.png";
import Auth from "../utils/auth";
import "../App.css";
// import { UPDATE_USER_EMAIL, UPDATE_USER_NAME, DELETE_USER } from "../components/ProfileMutations"

// page function
const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_ONE_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return; //<-- make this goes to profile page
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return <h4>Please log in to see this!</h4>;
  }

  return (
    <main className="aboutme-container">
      <div classnName="aboutme-box">
        <div className="aboutme-card">
          <header className="aboutme-name">
            <h2>KITTY</h2>
          </header>
          <div className="aboutme-contentcard">
            <div className="aboutme-userimagecard">
              <img className="userkittyimage">{userKitty}</img>
            </div>
            <ul>
              <div className="aboutme-username">
                <li>
                  User Name: <strong>{user.username}</strong>
                </li>
                <btn className="aboutme-changeusername">Change Username</btn>
              </div>
              <br></br>
              <div className="aboutme-emailaddress">
                <li>
                  Email Address: <strong>{user.email}</strong>
                </li>
                <btn className="aboutme-changeusername">Change Email Address</btn>
              </div>
              <br></br>
              <div className="aboutme-deleteaccount">
                <li className="aboutme-delete">
                  <btn className="deleteButton">Delete Account</btn>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div className="aboutme-footer">
        <footer>
          <div>
            <img className="aboutme-logo" src={logo}></img>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default Profile;
