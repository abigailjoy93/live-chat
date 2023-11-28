// imports
import { useQuery } from "@apollo/client";
import { QUERY_ONE_USER, QUERY_ME } from "../../utils/queries";
import userKitty from "../../assets/cat.png";
import Auth from "../../utils/auth";
import "./Profile.css";
import {
  UpdateUserEmail,
  UpdateUserName,
  DeleteUser,
} from "../../components/ProfileMutations";

// page function
const Profile = () => {
  const userParam = Auth.getProfile().data.username;

  const { data } = useQuery(userParam ? QUERY_ONE_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  console.log(data)

  const user = data?.me || data?.user || {};

  console.log(user)

  return (
    <section className="aboutme-container">
      <div className="aboutme-card">
        {/* left side */}
        <div className="aboutme-image">
          <img className="userkittyimage" src={userKitty}></img>
        </div>
        {/* right side */}
        <ul className="aboutme-list">
          <li className="aboutme-listitem">
            <p>
              User Name: <strong>{user.username}</strong>
            </p>
            <UpdateUserName />
          </li>
          <br></br>
          <li className="aboutme-listitem">
            <p>
              Email Address: <strong>{user.email}</strong>
            </p>
            <UpdateUserEmail />
          </li>
          <br></br>
          <li className="">
            <DeleteUser />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Profile;
