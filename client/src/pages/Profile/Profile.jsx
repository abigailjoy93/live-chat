// imports
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ONE_USER, QUERY_ME } from "../../utils/queries";
import userKitty from "../../assets/cat.png";
import Auth from "../../utils/auth";
import "./Profile.css";
import { UpdateUserEmail, UpdateUserName, DeleteUser } from "../../components/ProfileMutations";

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
      {/* <div className="aboutme-box"> */}
      <div className="aboutme-card">
        {/* <div className="aboutme-name">
          <h2>KITTY</h2>
        </div> */}
        {/* <div className="aboutme-contentcard"> */}
        <div className="aboutme-image">
          <img className="userkittyimage" src={userKitty}></img>
        </div>
        {/* right side */}
        <ul className="aboutme-list">
          <li className="aboutme-listitem">
            <p>
              User Name: <strong>{user.username}</strong>
            </p>
            < UpdateUserName />
            {/* <button className="form-btn" onClick={ UpdateUserName }>
              Change Username
            </button> */}
          </li>
          <br></br>
          <li className="aboutme-listitem">
            <p>
              Email Address: <strong>{user.email}</strong>
            </p>
            < UpdateUserEmail />
            {/* <button className="form-btn" onClick={UpdateUserEmail}>
              Change Email
            </button> */}
          </li>
          <br></br>
          <li className="">
            < DeleteUser />
            {/* <button className="form-btn" onClick={DeleteUser}>
              Delete Account
            </button> */}
          </li>
        </ul>
        {/* </div> */}
      </div>
      {/* </div> */}
    </section>
  );
};

export default Profile;
