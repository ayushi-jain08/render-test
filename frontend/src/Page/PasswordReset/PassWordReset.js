import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const PassWordReset = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const tokenl = urlSearchParams.get("token");
  const {id,token} = useParams()

  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(false)
  const [error, setError] = useState(false)

  const uservalid = async() => {
    const res = await fetch(`http://localhost:5001/api/forgotpassword/${id}/${token}`,{
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenl}`
      }

    });

    const data = await res.json()
    if(res.ok){
      console.log("Valid User")
    }else{
      navigate("/")
    }
  }
  const setVal = (e) => {
    setPassword(e.target.value)
  }
  const sendPassword = async(e) => {
     e.preventDefault()

     const res = await fetch(`http://localhost:5001/api/${id}/${token}`,{
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenl}`
      },
      body: JSON.stringify({password})
    });

    const data = await res.json()
    if(res.ok){
      setPassword("")
      setMessage(true)
    }else{
      setError(true)
    }
  }
  useEffect(() => {
    uservalid()
  },[])
  return (
    <>
       <div className="forgot" >
        <h2>Enter Your New Password</h2>
        {message ? <p style={{color:'green', fontWeight:'bold', marginBottom:15}}>Password Successfully Update</p>: ""}
        {error ? <p style={{color:'red', fontWeight:'bold', marginBottom:15}}>Token Expired Generate New Link!</p>: ""}
        <form onSubmit={sendPassword}>
            <div className="form-group">
                <label htmlFor="">Password</label>
                <input type="text" name="password" onChange={setVal} value={password} placeholder='your password'/>
            </div>
            <button type='submit' className='forgot-btn'>Submit</button>
        </form>
      </div>
    </>
  )
}

export default PassWordReset
