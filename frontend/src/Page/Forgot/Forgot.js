import React, { useEffect, useState } from 'react'
import "./Forgot.css"
  
const Forgot = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState(false)
    const [error, setError] = useState(false)

    const sendEmail = async(e) => {
        e.preventDefault()

      try {
        const res = await fetch("http://localhost:5001/api/sendpasswordlink", {
          method: "POST",
          mode: "cors",
          headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email
            })
          
      })
      const data = await res.json()
      if(res.ok){
        setEmail('');
        setMessage(true);
        setError(false);
      }else{
        setError(true);
        setMessage(false);
      }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  return (
    <>
      <div className="forgot" >
        <h2>Enter Your Email</h2>
        {message? <p style={{color:'green', fontWeight:'bold', marginBottom:15}}>Password reset link send successfully in your email</p>: ""}
        {error? <p tyle={{color:'red', fontWeight:'bold', marginBottom:15}}>Invalid User</p>: ""}
        <form>
            <div className="form-group">
                <label htmlFor="">Email</label>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='your email'/>
            </div>
            <button type='submit' className='forgot-btn' onClick={sendEmail}>Submit</button>
        </form>
      </div>
    </>
  )
}

export default Forgot
