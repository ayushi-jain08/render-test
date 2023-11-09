import React, { useEffect, useState } from "react";
import { BsFillPersonFill, BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { GiEgyptianProfile } from "react-icons/gi";
import { AiFillLock, AiFillPicture } from "react-icons/ai";
import "./Edit.css";
import img1 from "./log.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUser } from "../../CreateSlice";

const Edit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });
  const [pic, setPic] = useState(null);
  const userInfo = useSelector((state) => state.user);
  const { Info, loggedIn } = userInfo;
 
  let name;
  let value;
  useEffect(() => {
    if (!Info) {
      navigate("/login");
    } else {
      setUser({
        name: Info.name,
        email: Info.email,
        phone: Info.phone,
        work: Info.work,
      });
    }
  }, [ navigate,Info]);

  const handleInputs =  (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]:value });
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    const { password, cpassword, name, email, phone, work } = user;

    if (password !== cpassword) {
      console.log("password do not match");
      return;
    }
    dispatch(UpdateUser({name,email,phone,work,password}))
  console.log(user)
  };

  

  return (
    <>
      <div className="edit">
        <div className="container">
          <div className="edit-content">
            <div className="edit-top">
              <div className="img bg-img">
                <img src={Info.pic} alt="" width={200} height={200} />
                <div className="sml-img">
                  <img src={Info.pic} alt="" width={200} height={200} />
                </div>
              </div>
            </div>
            <div className="edit-form">
              <h2>Edit Profile</h2>
              <form className="form" onSubmit={updateHandler} method="POST">
                <div className="form-group">
                  <span>
                    <BsFillPersonFill />
                  </span>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={user.name}
                    onChange={handleInputs}
                    name="name"
                  />
                </div>
                <div className="form-group">
                  <span>
                    <MdEmail />
                  </span>
                  <input
                    type="email"
                    placeholder="your email"
                    value={user.email}
                    onChange={handleInputs}
                    name="email"
                  />
                </div>
                <div className="form-group">
                  <span>
                    <BsFillTelephoneFill />
                  </span>
                  <input
                    type="number"
                    placeholder="your number"
                    value={user.phone}
                    onChange={handleInputs}
                    name="phone"
                  />
                </div>
                <div className="form-group">
                  <span>
                    <GiEgyptianProfile />
                  </span>
                  <input
                    type="text"
                    placeholder="your proffesion"
                    value={user.work}
                    onChange={handleInputs}
                    name="work"
                  />
                </div>
                <div className="form-group">
                  <span>
                    <AiFillLock />
                  </span>
                  <input
                    type="password"
                    placeholder="your password"
                    value={user.password}
                    onChange={handleInputs}
                    name="password"
                  />
                </div>
                <div className="form-group">
                  <span>
                    <AiFillLock />
                  </span>
                  <input
                    type="password"
                    placeholder="your confirm password"
                    value={user.cpassword}
                    onChange={handleInputs}
                    name="cpassword"
                  />
                </div>
                <div className="form-group">
                  <span>
                    <AiFillPicture />
                  </span>
                  <input
                    name="photo"
                    type="file"
                    placeholder="Choose file"
                    onChange={(e) => setPic(e.target.files[0])}
                  />
                </div>
                <button type="submit" className="edit-btn">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
