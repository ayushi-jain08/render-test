import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CreateGroupChat, FetchMyChat, fetchAllUsers, setSelectedChat } from '../../../CreateSlice'
import "./MyChat.css"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, InputLabel, Input, Badge } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { Close } from '@mui/icons-material';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid gray",
    boxShadow: 24,
    p: 2,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 3,
  };
const MyChat = ({fetchAgain}) => {
    const [search, setSearch] = useState('')
    const [name, setName] = useState("")
    const [selectedUserIds, setSelectedUserIds] = useState([]); 
    const [selectedUser, setSelectedUser] = useState([]);
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const dispatch = useDispatch()
    const users = useSelector((state) => state.user)
    const {GetChatUser, Info,  AllUsers, loading, clickedChat} = users
useEffect(() => {
    dispatch(FetchMyChat())
},[dispatch, fetchAgain])
    console.log("GetChatUser", GetChatUser)
    const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name
    }
    const getSenders = (loggedUser, users) => {
        const sender = users.find(user => user._id !== loggedUser._id);
        return sender ? sender.pic : '';
      };
      const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
          return;
        } 
       dispatch(fetchAllUsers(search))

    }
    const handleGroup = (userToAdd) => {
        if (selectedUser.includes(userToAdd) || selectedUserIds.includes(userToAdd)) {
          alert("already added");
          return;
        }
        setSelectedUser([...selectedUser, userToAdd]);
        setSelectedUserIds([...selectedUserIds, userToAdd._id]);
      };
    const handleDelete = (item) => {
        setSelectedUser(selectedUser.filter((sel) => sel._id !== item._id));
        setSelectedUserIds(selectedUserIds.filter((sel) => sel._id !== item._id))
      };
      const handleSubmit = async(e) => {
        e.preventDefault()
       await dispatch(CreateGroupChat({name, users:selectedUser}))
      await dispatch(FetchMyChat())
    setName('')
        setSelectedUser("")
        setSearch('')
        setSelectedUser([])
        setOpen(false);
      }
      const handleSelectedChat = async(chat) => {
        dispatch(setSelectedChat(chat))
      }
     
    
      if (!Array.isArray(GetChatUser)) {
        return <div>Loading...</div>;
      }
  return (
    <>
     <div className="my-chat">
        <div className="my-chat-details">
            <h2 style={{fontSize:'25px', fontWeight:'500'}}>My Chats</h2>
            <button className='create-btn' onClick={handleOpen}>Create Group</button>
            <Modal
          style={{}}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Create Group Chat
            </Typography>
            <FormControl>
              <InputLabel htmlFor="my-input">Chat Name</InputLabel>
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <div style={{display:'flex', justifyContent:'space-between'}} >
              <InputLabel htmlFor="my-input">Search Users...</InputLabel>
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                onChange={(e) => handleSearch(e.target.value)}
                value={search}
              />
             <button style={{width:'80px', border:'none', background:'white'}}>
             <Close/>
             </button>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              {selectedUser !== "" && selectedUser.map((item) => (
                <Stack direction="row" spacing={1}>
                  <Chip
                    avatar={<Avatar alt="Natacha" src={item.pic} />}
                    label={item.name}
                    onDelete={() => handleDelete(item)}
                    variant="outlined"
                  />
                </Stack>
              ))}
            </div>
            {/* {loading && <p>Loading...</p>} */}
            {AllUsers?.map((item) => (
              <div
                style={{ textAlign: "left" }}
                onClick={() => handleGroup(item)}
              >
                <img src={item.pic} alt="" className="conversationImg" style={{width:50, height:50, borderRadius:'50%'}}/>
                <span className="conversionName" style={{fontSize:'15px'}}>{item.name}</span>
              </div>
            ))}
            {/* <input
              type="file"
              name="dp"
              onChange={handleImageChange}
            /> */}
            <Button variant="contained" onClick={handleSubmit}>
              Create Chat
            </Button>
          </Box>
        </Modal>
        </div>
        {loading && <p>Loading...</p>}
     {GetChatUser?.map((chat) => (
        <div className="conversation" key={chat._id} onClick={() => handleSelectedChat(chat)}>
         {!chat.isGroupChat ?  <img src={getSenders(Info, chat.users)} alt="" width={50} height={50} /> :  <Avatar src="/broken-image.jpg" />}
          <div className="users">
            <h2 style={{fontWeight:'500'}}>{!chat.isGroupChat
                    ? getSender(Info, chat.users)
                    : chat.chatName}</h2>
                    <div>
                    {chat.latestMessage && (
                  <p>
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </p>
                )}
                    </div>
          </div>
        
        </div>
        
      ))}
    
     </div>
    </>
  )
}

export default MyChat
