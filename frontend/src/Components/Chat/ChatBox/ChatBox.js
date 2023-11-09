import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import "./ChatBox.css"
import SingleChat from './SingleChat'

const ChatBox = ({setfetchAgain, fetchAgain}) => {
  const users = useSelector((state) => state.user)
  const {clickedChat} = users
  return (
    <>
     <div className="chat-box">
<SingleChat fetchAgain={fetchAgain} setfetchAgain={setfetchAgain}/>
     </div>
    </>
  )
}

export default ChatBox
