import React, { useEffect, useState } from "react";
import "./Profile.css";
import img1 from "./log.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAboutUser } from "../../CreateSlice";

const Profile = () => {
  const dispatch = useDispatch()
  const [about, setAbout] = useState([])
  const infos = JSON.parse(localStorage.getItem("RegisterInfo"))
const navigate = useNavigate()
  const userInfo = useSelector((state) => state.user)
  const {Info, loggedIn} = userInfo

useEffect(() => {
if(!Info){
  navigate("/login")
}else{
 dispatch(fetchAboutUser())
}
},[ dispatch])
  return (
    <>
      <div className="profile">
        <div className="container">
          <div className="content">
          <div className="top">
              <div className="top-left">
                <img src={Info.pic} alt="" width={250} height={250} />
              </div>
              <div className="top-right">
                <div className="profile-head">
                <h2>{Info.name}</h2>
                <span>{Info.work}</span>
                <p>
                  RANKINGS: <span>1/10</span>
                </p>
                <div className="profile-about">
                    <h3>About</h3>
                  </div>
                </div>
              </div>
              <div className="top-end">
                    <button>
                      <Link to="/edit">
                      Edit
                      </Link>
                    </button>
                </div>
            </div>
           <div className="profile-details">
           <div className="links">
            <h5>Work Link</h5>
            <a href="https://www.youtube.com" target="_thappa">Youtube</a>
            <a href="https://www.youtube.com" target="_thappa">Instagram</a>
            <a href="https://www.youtube.com" target="_thappa">Linkdien</a>
            <a href="https://www.youtube.com" target="_thappa">Google</a>
            <a href="https://www.youtube.com" target="_thappa">Developer</a>
          </div>
           <div className="ids">
            <span>User Id</span>
            <span>Name</span>
            <span>Email</span>
            <span>Phone </span>
            <span>Profession</span>
          </div>
          <div className="ids-details">
            <span>{Info._id}</span>
            <span>{Info.name}</span>
            <span>{Info.email}</span>
            <span>{Info.phone} </span>
            <span>{Info.work}</span>
          </div>
           </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
