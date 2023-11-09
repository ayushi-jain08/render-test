import React from 'react'
import { useSelector } from 'react-redux';

const ScrollableChat = ({message}) => {
    const users = useSelector((state) => state.user)
    const {Info} = users
     const isSameSender = (messages, m, i, userId) => {
        return (
          i < messages.length - 1 &&
          (messages[i + 1].sender._id !== m.sender._id ||
            messages[i + 1].sender._id === undefined) &&
          messages[i].sender._id !== userId
        );
      };
      
       const isLastMessage = (messages, i, userId) => {
        return (
          i === messages.length - 1 &&
          messages[messages.length - 1].sender._id !== userId &&
          messages[messages.length - 1].sender._id
        );
      };
  return (
    <>
      {message && message.map((msg,i) => (
<div key={msg._id} className={msg.sender._id === Info._id ?"msg own" : "msg"}>
   { (isSameSender(message,msg,i,Info._id )) || isLastMessage(message,i,Info._id) ?
   <img src={msg.sender.pic} alt=""  width={50} height={50} style={{borderRadius:'50%'}}/>
 : <span style={{width:50}}></span>  }
   <span style={{background:`${msg.sender._id === Info._id ? 'red': 'green'}`, borderRadius:'15px', padding:'5px 15px', color:'white'}} className='msg-content' >{msg.content}</span>
</div>
      ))}
    </>
  )
}

export default ScrollableChat
