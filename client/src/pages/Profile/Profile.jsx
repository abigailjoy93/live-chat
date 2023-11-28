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
  // const { username: userParam } = useParams();
  // let navigate = useNavigate();

  const userParam = Auth.getProfile().data.username;

  const { data } = useQuery(userParam ? QUERY_ONE_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  console.log(data)

  const user = data?.me || data?.user || {};

  console.log(user)

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
            <UpdateUserName />
            {/* <button className="form-btn" onClick={ UpdateUserName }>
              Change Username
            </button> */}
          </li>
          <br></br>
          <li className="aboutme-listitem">
            <p>
              Email Address: <strong>{user.email}</strong>
            </p>
            <UpdateUserEmail />
            {/* <button className="form-btn" onClick={UpdateUserEmail}>
              Change Email
            </button> */}
          </li>
          <br></br>
          <li className="">
            <DeleteUser />
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
