import { Avatar, Button, Chip, Modal, Stack } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, Input, Badge } from "@mui/material";
import { AddUserInGroupChat, FetchMyChat, RemoveUserFromGroupchat, RenameGroupChatName, fetchAllUsers, setSelectedChat } from '../../../CreateSlice';
import { io } from "socket.io-client";


const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const UpdatedGroupChatModel = ({setfetchAgain, fetchAgain, FetchMessage}) => {
    const [groupName, setGroupName] = useState('')
    const socket = useRef();
    const [search, setSearch] = useState('')
    const [open , setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [socketConnected, setSocketConnected] = useState(false)

    const dispatch = useDispatch()
    const users = useSelector((state) => state.user)
    const {clickedChat, loading, Info, SelectedChat, AllUsers} = users

    useEffect(() => {
      socket.current = io("ws://localhost:5000");
      socket.current.emit("setup", Info)
      socket.current.on("connected", () => {
        setSocketConnected(true)
      })
    }, []);
   
    console.log("cli", clickedChat._id)
    const handleRemove = async(user1) => {
        if(clickedChat.groupAdmin._id !== Info._id && user1._id !== Info._id){
            alert("Only admin can add user in group")
            return
            }
           await dispatch(RemoveUserFromGroupchat({chatId: clickedChat._id, userId: user1._id}))
            if(Info._id === user1._id){
               await dispatch(setSelectedChat(null))
            }else{
await dispatch(setSelectedChat(SelectedChat))
            }
            setfetchAgain(!fetchAgain)
            FetchMessage()
          
            // Info._id === user1._id ? dispatch(setSelectedChat(null)) : dispatch(setSelectedChat(SelectedChat))
           
    }
    const handleRename = async() => {
await dispatch(RenameGroupChatName({chatId:clickedChat._id, chatName:groupName}))
await dispatch(setSelectedChat(SelectedChat))
setfetchAgain(!fetchAgain)
setGroupName('')
    }
    const handleSearch = (query) => {
setSearch(query)
if(!query){
    return;
}
dispatch(fetchAllUsers(search))
    }
    const handleAddUser = async(user1) => {
        if(clickedChat.users.find((u) => u._id === user1._id)){
        alert("User already in group")
    return;
} 
if(clickedChat.groupAdmin._id !== Info._id){
alert("Only admin can add user in group")
return
}
await dispatch(AddUserInGroupChat({chatId:clickedChat._id, userId: user1._id}))
await dispatch(setSelectedChat(SelectedChat))

setfetchAgain(!fetchAgain)
socket.current.emit("user add" , {
name: user1.name,
chat: clickedChat
})

    }

  return (
    <>
    <button onClick={handleOpen} style={{padding:'5px 10px', width:'100px' , fontSize:'19px'}}>Edit</button>
           <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
         <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          {clickedChat.chatName}
          </Typography>
         <div style={{ display: "flex", flexDirection: "row", gap: "10px", flexWrap:'wrap' }}>
            {clickedChat?.users?.map((u) => (
                  <Stack direction="row" spacing={1}>
                  <Chip
                    avatar={<Avatar alt="Natacha" src={u.pic} />}
                    label={u.name}
                    onDelete={() => handleRemove(u)}
                    variant="outlined"
                  />
                </Stack>
            ))}
             <div style={{ display: "flex", flexDirection: "row", gap: "5px"}}>
              <input
                style={{ marginBottom:'10px', padding:'5px'}}
                placeholder='Rename group..'
                onChange={(e) => setGroupName(e.target.value)}
              />
              <button style={{width:'100px', background:'blue', border:'none', padding:'5px', color:'white', borderRadius:'5px'}} onClick={ handleRename}>
            Update
            </button>
            </div>
            <FormControl>
              <InputLabel htmlFor="my-input">add user to group</InputLabel>
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                onChange={(e) => handleSearch(e.target.value)}
                value={search}
              />
            </FormControl>
{loading && <p>Loading...</p>}
            {AllUsers?.map((item) => (
              <div
                style={{ textAlign: "left" }}
                onClick={() => handleAddUser(item)}
              >
                <img src={item.pic} alt="" className="conversationImg" style={{width:20, height:20, borderRadius:'50%'}}/>
                <span className="conversionName" style={{fontSize:'15px'}}>{item.name}</span>
              </div>
            ))}
         </div>
         <Button variant="contained" type='warning' size="small" style={{background:'red', marginTop:'10px'}} onClick={() => handleRemove(Info)}>
            Leave Group
            </Button>
        </Box>
        </Modal>
    </>
  )
}

export default UpdatedGroupChatModel
