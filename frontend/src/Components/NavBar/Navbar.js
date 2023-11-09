import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { RiCloseCircleFill , RiLoginBoxFill} from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { BiSolidContact,BiSolidCartAlt,BiLogOut,BiSolidMoon } from "react-icons/bi";
import { FaProductHunt, FaToggleOn, FaRegistered } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { MdAccountCircle } from "react-icons/md";


import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { addNotification, fetchLogout, setSelectedChat, setUserInfo } from "../../CreateSlice";
import { Tooltip } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.user)
  const {Info, loggedIn, notification} = userInfo
  const [clicked, setClicked] = useState(false);


  const dispatch = useDispatch()
  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("RegisterInfo"));
    if (storedUserInfo) {
      // Update the Redux store with the stored user information
      dispatch(setUserInfo(storedUserInfo));
    }
  }, [dispatch]);
  const logOut = () => {
dispatch(fetchLogout())
navigate("/")
  }
  const handleClick = () => {
    setClicked(!clicked);
  };
  const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name
      }
      const handleNotification = (notif) => {
dispatch(setSelectedChat(notif.chat))
dispatch(addNotification(notification.filter((n) => n !== notif)));

      }
  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <svg
            id="logo-13"
            width="49"
            height="48"
            viewBox="0 0 49 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {" "}
            <path
              d="M1.98441 29.2899C1.98441 27.0299 2.42954 24.7919 3.29444 22.704C4.15935 20.6159 5.42701 18.7187 7.02513 17.1206C8.62324 15.5225 10.5204 14.2548 12.6084 13.3899C14.6965 12.5251 16.9344 12.0799 19.1945 12.0799V29.2899H1.98441Z"
              class="ccustom"
              fill="#442781"
            ></path>{" "}
            <path
              d="M1.98441 29.2899C1.98441 31.55 2.42954 33.7879 3.29444 35.876C4.15935 37.964 5.42701 39.8612 7.02513 41.4593C8.62324 43.0574 10.5204 44.3251 12.6084 45.19C14.6965 46.0549 16.9344 46.5 19.1945 46.5V29.2899H1.98441Z"
              class="ccompli1"
              fill="#61459C"
            ></path>{" "}
            <path
              d="M36.4043 29.2899C36.4043 31.55 35.9595 33.7879 35.0947 35.876C34.2298 37.964 32.9622 39.8612 31.3638 41.4593C29.7657 43.0574 27.8685 44.3251 25.7804 45.19C23.6925 46.0549 21.4545 46.5 19.1945 46.5V29.2899H36.4043Z"
              class="ccompli2"
              fill="#A992DB"
            ></path>{" "}
            <path
              d="M47.0156 14.422C47.0156 21.5586 41.23 27.344 34.0935 27.344H21.1716V14.422C21.1716 7.2854 26.957 1.5 34.0935 1.5C41.23 1.5 47.0156 7.2854 47.0156 14.422Z"
              class="ccustom"
              fill="#FF7917"
            ></path>{" "}
          </svg>
        </Link>
      </div>
      <div className="show">
        <ul className="center">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/product">Shop</Link>
          </li>
          <Tooltip title={!notification?.length ? "No new message" : notification?.map((notif) => (
            <p key={notif._id} onClick={() => handleNotification(notif)}> 
              {notif?.chat?.isGroupChat ? `New message in ${notif.chat.chatName}` : `New message from ${getSender(Info, notif.chat.users)}`}
            </p>
          ))}>
          <li>
            <Link to="/chat">Chat</Link>
          </li>
</Tooltip>
         
          <li>
            <Link to="/category">
         Category
            </Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        {loggedIn ?  <li onClick={() => logOut()}>Logout</li>: <li>
        <Link to="/login">
        Login
        </Link>
          </li>}
          <li>
            <Link to="/register">
         Register
            </Link>
          </li>
        </ul>
      </div>
      <div className="hide">
        <ul className={clicked ? " center active" : "center"}>
          <li>
            <Link to="/">
                 <span>
                 <AiFillHome/>
                </span> Home</Link>
          </li>
          <li>
            <Link to="/about"><span><FcAbout/></span> About</Link>
          </li>
          <li>
            <Link to="/contact"><span><BiSolidContact/></span> Contact</Link>
          </li>
          <li>
            <Link to="/product"><span><FaProductHunt/></span> Shop</Link>
          </li>
          <li>
            <Link to="/cart"><span><BiSolidCartAlt/></span>Cart</Link>
          </li>
         {userInfo? <li>
          <span><BiLogOut/></span>
          Logout
         </li>: 
            <li>
            <Link to="/login">
            <span><RiLoginBoxFill/></span>
            Login
            </Link>
          </li>}
          <li>
            <Link>
            <span><FaRegistered/></span>
         Register
            </Link>
          </li>
          
        </ul>
      </div>
      <div className="icon">
        <div className="mobile" onClick={handleClick}>
          {clicked ? <RiCloseCircleFill /> : <FaBars />}
        </div>
        <div className="mode"><BiSolidMoon/></div>
        {loggedIn? (<div className="pic"><Link to="/profile">
          <img src={userInfo.Info.pic} width={40} height={40}  style={{borderRadius:"50%", objectFit:'cover'}}/>
        </Link></div>): <div className="acc"><Link to="/login">
        <MdAccountCircle/>  
        </Link></div>}
      </div>
    </nav>
  );
};

export default Navbar;
