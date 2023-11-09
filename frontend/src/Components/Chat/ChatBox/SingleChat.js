import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UpdatedGroupChatModel from './UpdatedGroupChatModel'
import { Button, Input } from '@mui/material'
import { FetchMessage, GetNotifications, SendMessage, SendMessageToUser, addNotification } from '../../../CreateSlice'
import ScrollableChat from './ScrollableChat'
import { io } from "socket.io-client";
import Lottie from "lottie-react";
import AnimatiomData from "../../../animations/typing.json"

const SingleChat = ({setfetchAgain, fetchAgain}) => {
  const dispatch = useDispatch()
   const socket = useRef();
  const [sloading, setSLoading] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [message, setMessage] = useState([])
  const [socketConnected, setSocketConnected] = useState(false)
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
    const users = useSelector((state) => state.user)
    const {clickedChat, Info, loading, notification} = users
    const typingTimeout = useRef(null);
    const [msg, setMsg] = useState("")

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: AnimatiomData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
      const getSender = (loggedUser, users) => {
        return users[0]._id === loggedUser._id ? users[1].name : users[0].name
          }

      useEffect(() => {
    socket.current = io("ws://localhost:5000");
    socket.current.emit("setup", Info)
    socket.current.on("connected", () => {
      setSocketConnected(true)
    })
    socket.current.on("typing", () => {
      setIsTyping(true)
     
    })
    socket.current.on("stop typing",() => {
      setIsTyping(false)
    
    } )
  }, []);
  useEffect(() => {
    // ...your existing socket setup code
    socket.current.on('user joined', (data) => {
      console.log('User joined:', data.msg);
      setMsg(data); // Set the received message in state
    });
console.log("mfgdf", msg)
    // ...rest of your useEffect logic
  }, [dispatch]);

    useEffect(() => {
      if(!clickedChat){
        return;
      }
     const FetchMessage = async() => {
      const StoredUserInfo = JSON.parse(
        localStorage.getItem("RegisterInfo")
      );
      setSLoading(true)
      const response = await fetch(`http://localhost:5001/api/message/recieve/${clickedChat._id}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        }

      });
      const data = await response.json();
      if (response.ok) {
 setMessage(data)
 setSLoading(false)
 socket.current.emit("join chat", clickedChat._id)

      } else {
        throw new Error(data.message);
      }
     }
     FetchMessage()
    },[dispatch, clickedChat])

    const HandleSendMessage = async(e) => {
      e.preventDefault();
      setNewMessage(e.target.value)
      socket.current.emit("stop typing", clickedChat._id);
      if (!newMessage) {
        alert('Please enter a message.');
      } else {
        try {
          const StoredUserInfo = JSON.parse(
            localStorage.getItem("RegisterInfo")
          );
          const response = await fetch(`http://localhost:5001/api/message`, {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${StoredUserInfo.token}`,
            },
            body: JSON.stringify({content:newMessage, chatId: clickedChat._id})

          });
          const data = await response.json();
          if (response.ok) {
            socket.current.emit("send msg", data)
            setMessage([...message, data]);
            setNewMessage("");
          } else {
            throw new Error(data.message);
          }

        } catch (error) {
          console.error('Error sending message:', error.message);
        }
      setfetchAgain(!fetchAgain)
      }
      }
      useEffect(() => {
        socket.current.on("msg recieved", (newMessageRec) => {
          if(!clickedChat || clickedChat._id !== newMessageRec.chat._id){
            if (Array.isArray(notification) && !notification.includes(newMessageRec)) {
              dispatch(addNotification([newMessageRec, ...notification]));
              setfetchAgain(!fetchAgain);
            }
          }else{
            setMessage([...message, newMessageRec])
          }
        })
      })
      console.log("notification", notification)
      const handleTyping = (e) => {
        setNewMessage(e.target.value);
      
        if (!socketConnected) return;
        
        if (!typing) {
          setTyping(true);
          socket.current.emit("typing", clickedChat._id);
          console.log("Typing started");
        }
      
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
      
        clearTimeout(typingTimeout.current); // Clear any existing timeout
      
        typingTimeout.current = setTimeout(() => {
          var timeNow = new Date().getTime();
          var timeDiff = timeNow - lastTypingTime;
      
          if (timeDiff >= timerLength && typing) {
            socket.current.emit("stop typing", clickedChat._id);
            setTyping(false);
            console.log("Typing stopped");
          }
        }, timerLength);
      };
      
  return (
    <>
      {clickedChat ? (<>{!clickedChat.isGroupChat ? (<><h2>{getSender(Info, clickedChat.users)}</h2></>): (<>
 <div>
  <div style={{display:'flex',justifyContent:'space-between' }}>
 <h2>  {clickedChat.chatName.toUpperCase()}</h2>
 <UpdatedGroupChatModel fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} FetchMessage={FetchMessage}/>
 </div>
 </div>
      </>)}
    <div className='chatbox-inside'>
    {loading ? <Button loading variant="solid">
  Solid
</Button> : (<div className='message'>
  {clickedChat.isGroupChat && (msg.chatId === clickedChat._id && msg && <p style={{textAlign:'center', fontSize:'20px', color:'white', padding:'5px', background:'blue', width:'50%', margin:'10px auto', borderRadius:'15px'}}>{msg.msg}</p>)}
  <ScrollableChat message={message}/>
        </div> 
        )
        }
           <form onSubmit={HandleSendMessage}>
            {isTyping &&  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />}
       <div className="form-control" >
      <input type="text" value={newMessage} onChange={handleTyping} />
        <button type='submit' >Send</button>
        </div>
       </form>
    </div>
      </>) : <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100%'}}><p style={{fontSize:'3rem', fontWeight:600 , color:'gray'}}>Click On User To Start chatting</p></div>}
    </>
  )
}

export default SingleChat
