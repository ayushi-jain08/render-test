import React, { useState, useEffect } from 'react'
import { BsFillPersonFill, BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { GiEgyptianProfile } from "react-icons/gi";
import { AiFillLock, AiFillPicture } from "react-icons/ai";
import "./Register.css"
import img from "./sign.png"
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister } from '../../CreateSlice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
const navigate = useNavigate()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state.user)
  const { error, Info} = selector
const [user, setUser] = useState({
  name: "",
  email: "",
  phone: "",
  work: "",
  password: "",
  cpassword: "",
})
const [pic, setPic] = useState("")
const [loggedIn, setLoggedIn] = useState(false);

let name;
let value;
const handleInputs = async (e) => {
   name = e.target.name
   value = e.target.value

 setUser({...user, [name]: value})
}
const handleSubmit = (e) => {
  e.preventDefault()

  const {password, cpassword, name,email, phone,work} = user
  if (!name || !email || !phone || !work || !password || !cpassword) {
   console.log("password do not match")
   toast.error(" Please Fill All Details")
  }else{
    dispatch(fetchRegister({name,email,phone,work,password,pic}))
    toast.success("Registered successfully")
    setLoggedIn(true)
    // navigate("/login")
  }
 
 
}
useEffect(() => {
  if (loggedIn) {
    // Delayed navigation to home page after 5000ms (5 seconds)
    const navigationTimeout = setTimeout(() => {
     navigate('/'); // Replace '/home' with your actual home page route
    }, 2000);

    // Clean up the timeout if the component unmounts or loggedIn changes again
    return () => clearTimeout(navigationTimeout);
  }
}, [loggedIn, navigate]);
  return (
    <>
     <div className="signup">
      <div className="container">
        <div className="signup-content">
          <div className="signup-form">
            <h2>Sign-Up</h2>
            <form className='register-form' method="POST" enctype="multipart/form-data" onSubmit={handleSubmit}>
            <div className="form-group">
              <span><BsFillPersonFill/></span>
              <input type="text" placeholder='Your name' value={user.name}  onChange={handleInputs} name='name'/>
             </div>
             <div className="form-group">
             <span><MdEmail/></span>
             <input type="email" placeholder='your email' value={user.email}  onChange={handleInputs} name='email'/>
             </div>
             <div className="form-group">
             <span><BsFillTelephoneFill/></span>
             <input type="number" placeholder='your number' value={user.phone}  onChange={handleInputs} name='phone' />
             </div>
             <div className="form-group">
             <span><GiEgyptianProfile/></span>
             <input type="text" placeholder='your proffesion'  value={user.work} onChange={handleInputs} name='work'/>
             </div>
             <div className="form-group">
             <span><AiFillLock/></span>
             <input type="password" placeholder='your password' value={user.password}  onChange={handleInputs}name='password'/>
             </div>
             <div className="form-group">
             <span><AiFillLock/></span>
             <input type="password" placeholder='your confirm password' value={user.cpassword}  onChange={handleInputs}name='cpassword' />
             </div>
             <div className="form-group">
              <span><AiFillPicture/></span>
              <input name='photo'
          type="file"
          placeholder="Choose file"
          onChange={(e) => setPic(e.target.files[0])} />
             </div>
             <button type='submit' className='signup-btn'>Submit</button>
            </form>
          </div>
        </div>
        <div className="picture">
<img src={img} alt="" />
        </div>
      </div>
     </div>
     <ToastContainer/>
    </>
  )
}

export default Register
