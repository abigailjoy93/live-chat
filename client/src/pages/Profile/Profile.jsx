// imports
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ONE_USER, QUERY_ME } from "../../utils/queries";
import userKitty from "../../assets/cat.png";
import logo from "../../assets/liveChatHighResolutionLogoTransparent.png";
import Auth from "../../utils/auth";
import "./Profile.css";
// import { UPDATE_USER_EMAIL, UPDATE_USER_NAME, DELETE_USER } from "../components/ProfileMutations"

// page function
const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_ONE_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //   return; //<-- make this goes to profile page
  // }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!user?.username) {
  //   return <h4>Please log in to see this!</h4>;
  // }

  return (
    <section className="aboutme-container">
      <div className="aboutme-box">
        <div className="aboutme-card">
          <header className="aboutme-name">
            <h2>KITTY</h2>
          </header>
          <div className="aboutme-contentcard">
            <div className="aboutme-userimagecard">
              <img className="userkittyimage" src={userKitty}></img>
            </div>
            <ul>
              <div className="aboutme-username">
                <li>
                  User Name: <strong>{user.username}</strong>
                </li>
                <button className="aboutme-changeusername">Change Username</button>
              </div>
              <br></br>
              <div className="aboutme-emailaddress">
                <li>
                  Email Address: <strong>{user.email}</strong>
                </li>
                <button className="aboutme-changeusername">
                  Change Email Address
                </button>
              </div>
              <br></br>
              <div className="aboutme-deleteaccount">
                <li className="aboutme-delete">
                  <button className="deleteButton">Delete Account</button>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
