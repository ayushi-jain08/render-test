import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SideDrawer from '../SideDrawer/SideDrawer'
import {} from '@mui/icons-material'
import { Box } from '@mui/material'
import MyChat from '../MyChat/MyChat'
import ChatBox from '../ChatBox/ChatBox'
import "./ChatPage.css"
import { addNotification } from '../../../CreateSlice'

const ChatPage = () => {
  const [fetchAgain, setfetchAgain] = useState(false)
    const userInfo = useSelector((state) => state.user) 
    const {Info} = userInfo
  return (
    <div>
      {Info && <SideDrawer/>}
     <div className='chat-page-center'>
        {Info && <MyChat fetchAgain={fetchAgain}/>}
        {Info && <ChatBox fetchAgain={fetchAgain} setfetchAgain={setfetchAgain}/>}
     </div>
    </div>
  )
}

export default ChatPage
