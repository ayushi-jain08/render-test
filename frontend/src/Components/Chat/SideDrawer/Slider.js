import React,  { useEffect, useState } from 'react'
import { Close, Search } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { CreateChat, FetchMyChat, fetchAllUsers, setSelectedChat } from '../../../CreateSlice'


const Slider = ({setDrawer}) => {
    const dispatch = useDispatch()
    const [loadingChat , setLoadingChat] = useState(false)
    const [search, setSearch] = useState("")
    const users = useSelector((state) => state.user)
    const {AllUsers, SelectedChat, clickedChat} = users
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
      dispatch(fetchAllUsers(search))
        }, 300); // Delay of 300 milliseconds
      
        return () => clearTimeout(delayDebounceFn); // Cleanup the timeout on component unmount
      },[dispatch, search])

const accessChat = async(userId) => {
try {
  setLoadingChat(true);
  await dispatch(CreateChat(userId))
 await dispatch(setSelectedChat(SelectedChat))
 
dispatch(FetchMyChat())
setLoadingChat(false);
} catch (error) {
  
}
}
console.log('clickedChat', clickedChat)
console.log("SelectedChat", SelectedChat)
  return (
    <>
      <div className="slider">
        <div className="sub-slider">
     <div className="search-form">
     <form>
    <div className="form-control">
    <Search/>
    <input type="text" placeholder='Search here...' onChange={(e) => setSearch(e.target.value)} value={search}/>
    </div>
</form>
<button  onClick={() => setDrawer(false)} className='close'>
<Close/>
</button>
     </div>
{AllUsers?.map((user) => (
        <div className="conversation" key={user._id} onClick={() => accessChat(user._id)}>
          <img src={user.pic} alt="" width={50} height={50} />
          <div className="users">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>
      ))}
        </div>
      </div>
     
    </>
  )
}

export default Slider
