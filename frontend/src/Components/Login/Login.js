import React, { useState, useEffect } from 'react'
import { MdEmail } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";
import "./Loggin.css"
import img from "./log.png"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '../../CreateSlice';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false);


  const handleSubmit = async(e) => {
    e.preventDefault()

    if(!email || !password){
      toast.error("Please fill all deatils")
     
    }else{
      dispatch(fetchLogin({email, password}))
     toast.success("you logges in successfully")
     setLoggedIn(true)

      // navigate("/")
    }

  }
  useEffect(() => {
    if (loggedIn) {
      // Delayed navigation to home page after 5000ms (5 seconds)
      const navigationTimeout = setTimeout(() => {
       navigate('/'); // Replace '/home' with your actual home page route
      }, 1000);

      // Clean up the timeout if the component unmounts or loggedIn changes again
      return () => clearTimeout(navigationTimeout);
    }
  }, [loggedIn, navigate]);
  return (
    <>
<div className="login">
  <div className="container">
<div className="login-content">
  <h2>LOGIN</h2>
  <div className="profile">
    <img src={img} alt="" />
  </div>
  <div className="detail">
    <form className='login-form' onSubmit={handleSubmit}>
    <div className="form-group">
             <span><MdEmail/></span>
             <input type="email" placeholder='your email' value={email} onChange={(e) => setEmail(e.target.value)} />
         </div>
             <div className="form-group">
             <span><AiFillLock/></span>
             <input type="password" placeholder='your password' value={password}  onChange={(e) => setPassword(e.target.value)}/>
             </div>
             <button type='submit' className='login-btn'>login</button>

    </form>
  <div className='account'>
 <span><Link to="/register"> No account?Register</Link></span>
 <br />
 <span><Link to="/forgot"><strong style={{color:'black'}}>Forgot Password?</strong>Click here</Link></span>
 
  </div>
  </div>
</div>
  </div>
</div>
<ToastContainer/>
    </>
  )
}

export default Login
