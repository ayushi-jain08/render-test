import { createAsyncThunk,createSlice} from "@reduxjs/toolkit"

// ====================REGISTETR=======================
export const fetchRegister = createAsyncThunk("data/fetchRegister", async({name, email, phone, work, password, pic }) => {
    const formData = new FormData();
    formData.append("name", name)
    formData.append("email", email)
    formData.append("phone", phone)
    formData.append("work", work)
    formData.append("password", password)
    formData.append("photo", pic)
    try {
        const response = await fetch("http://localhost:5001/api/register", {
        method: "POST",
        mode: "cors",
      "Content-Type": "multipart/form-data",
        body: formData
         
    })
    const data = await response.json()
    if(response.ok){
        localStorage.setItem("RegisterInfo", JSON.stringify(data))
        return data
    }else{
        throw new Error(data.message)
    }
    } catch (error) { 
        throw new Error("An error occurred while processing your request.");
    }
})
// ====================LOGIN============================
export const fetchLogin = createAsyncThunk("data/fetchLogin", async({email, password}) => {
    const formData = new FormData();
    formData.append("email",email)
    formData.append("password", password)
    try {
        const response = await fetch("http://localhost:5001/api/login", {
            method: "POST",
            mode: "cors",
            "Content-Type": "multipart/form-data",
        body: formData
        })
const data = await response.json()
if(response.ok){
    localStorage.setItem("RegisterInfo", JSON.stringify(data))
    return data
}else{
    throw new Error(data.message)
}
    } catch (error) {
        throw new Error("An error occurred while processing your request.");
    }
})

// =====================LOGOUT============================
export const fetchLogout = createAsyncThunk("data/fetchLogout", async () => {
    localStorage.removeItem("RegisterInfo");
    return null
})
//   ====================UPDATE INFO============================
export const UpdateUser = createAsyncThunk("data/UpdateUser", async({name, email, phone, work, password}) => {
    const formData = new FormData();
    formData.append("name", name)
    formData.append("email", email)
    formData.append("phone", phone)
    formData.append("work", work)
    formData.append("password", password)
    try {
        const storedUserInfo = JSON.parse(localStorage.getItem("RegisterInfo"));
        const response = await fetch("http://localhost:5001/api/updateduser", {
            method: "PATCH",
        mode: "cors",
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${storedUserInfo.token}`,
          },
        body: formData ,

        })
        const data = await response.json()
        if(response.ok){
            localStorage.setItem("RegisterInfo", JSON.stringify(data))
            return data
        }
        else{
            throw new Error(data.message)
        }
        return data
    } catch (error) {
        throw new Error("An error occurred while processing your request.");
    }
})

//   =========================ABOUT USER==========================
export const fetchAboutUser = createAsyncThunk("data/fetchAboutUser",async(_,thunkAPI) =>{
    try {
        const StoredUserInfo = JSON.parse(
            localStorage.getItem("RegisterInfo")
          );
          const response = await fetch("http://localhost:5001/api/abouts", {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${StoredUserInfo.token}`,
            },
          });
          const data = await response.json();
      if (response.ok) {
        return data; // This data will be passed to the fulfilled action
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
        throw new Error("An error occurred while fetching user profile.");
    }
});
// ==============FETCH ALL USERS===========================
export const fetchAllUsers = createAsyncThunk("data/fetchAllUsers",async(search) =>{
    try {
        const StoredUserInfo = JSON.parse(
            localStorage.getItem("RegisterInfo")
          );
          const response = await fetch(`http://localhost:5001/api/alluser?search=${search}`, {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${StoredUserInfo.token}`,
            },
          });
          const data = await response.json();
      if (response.ok) {
        return data; // This data will be passed to the fulfilled action
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
        throw new Error("An error occurred while fetching user profile.");
    }
})

// ===================CREATE SINGLE USER CHAT=====================
export const CreateChat = createAsyncThunk("data/CreateChat",async(userId) =>{
    try {
        const StoredUserInfo = JSON.parse(
            localStorage.getItem("RegisterInfo")
          );
          const response = await fetch(`http://localhost:5001/api/chat`, {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${StoredUserInfo.token}`,
            },
            body : JSON.stringify({userId})
          });
          const data = await response.json();
      if (response.ok) {
        return data; // This data will be passed to the fulfilled action
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
        throw new Error("An error occurred while fetching user profile.");
    }
})
// =========================FETCH MY CHAT=========================
export const FetchMyChat = createAsyncThunk("data/FetchMyChat",async() =>{
    try {
        const StoredUserInfo = JSON.parse(
            localStorage.getItem("RegisterInfo")
          );
          const response = await fetch(`http://localhost:5001/api/chat/getchat`, {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${StoredUserInfo.token}`,
            }
          });
          const data = await response.json();
      if (response.ok) {
        return data; // This data will be passed to the fulfilled action
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
        throw new Error("An error occurred while fetching user profile.");
    }
})
// ===================CREATE GROUP CHAT=======================
export const CreateGroupChat = createAsyncThunk("data/FetchMyChat",async({users, name}) =>{
    try {
        const StoredUserInfo = JSON.parse(
            localStorage.getItem("RegisterInfo")
          );
          const response = await fetch(`http://localhost:5001/api/chat/create/group`, {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${StoredUserInfo.token}`,
            },
            body: JSON.stringify({users, name})
          });
          const data = await response.json();
      if (response.ok) {
        return data; // This data will be passed to the fulfilled action
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
        throw new Error("An error occurred while fetching user profile.");
    }
})
// =====================RENAME GROUP NAME===================
export const RenameGroupChatName = createAsyncThunk("data/ RenameGroupChatName",async({chatId, chatName}) =>{
  try {
      const StoredUserInfo = JSON.parse(
          localStorage.getItem("RegisterInfo")
        );
        const response = await fetch(`http://localhost:5001/api/chat/rename`, {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${StoredUserInfo.token}`,
          },
          body: JSON.stringify({chatId, chatName})
        });
        const data = await response.json();
    if (response.ok) {
      return data; // This data will be passed to the fulfilled action
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
      throw new Error("An error occurred while fetching user profile.");
  }
})
// ====================ADD USER TO GROUP=====================
export const AddUserInGroupChat = createAsyncThunk("data/ AddUserInGroupChat",async({chatId, userId}) =>{
  try {
      const StoredUserInfo = JSON.parse(
          localStorage.getItem("RegisterInfo")
        );
        const response = await fetch(`http://localhost:5001/api/chat/adduser`, {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${StoredUserInfo.token}`,
          },
          body: JSON.stringify({chatId, userId})
        });
        const data = await response.json();
    if (response.ok) {
      return data; // This data will be passed to the fulfilled action
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
      throw new Error("An error occurred while fetching user profile.");
  }
})
// ====================REMOVE USER FROM GROUP CHAT========================
export const RemoveUserFromGroupchat = createAsyncThunk("data/ RemoveUserFromGroupchat",async({chatId, userId}) =>{
  try {
      const StoredUserInfo = JSON.parse(
          localStorage.getItem("RegisterInfo")
        );
        const response = await fetch(`http://localhost:5001/api/chat/removeuser`, {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${StoredUserInfo.token}`,
          },
          body: JSON.stringify({chatId, userId})
        });
        const data = await response.json();
    if (response.ok) {
      return data; // This data will be passed to the fulfilled action
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
      throw new Error("An error occurred while fetching user profile.");
  }
})
// =========================SEND MESSAGE======================
export const SendMessageToUser = createAsyncThunk("data/SendMessageToUser", async({content, chatId}) => {
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
        body: JSON.stringify({content, chatId})
      });
      const data = await response.json();
  if (response.ok) {
    return data; // This data will be passed to the fulfilled action
  } else {
    throw new Error(data.message);
  }
} catch (error) {
    throw new Error("An error occurred while fetching user profile.");
}
})
// =========================GET MESSAGE==========================
export const FetchMessage = createAsyncThunk("data/FetchMessage", async(chatId) => {
  try {
    const StoredUserInfo = JSON.parse(
        localStorage.getItem("RegisterInfo")
      );
      const response = await fetch(`http://localhost:5001/api/message/recieve/${chatId}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        }
      });
      const data = await response.json();
  if (response.ok) {
    return data; // This data will be passed to the fulfilled action
  } else {
    throw new Error(data.message);
  }
} catch (error) {
    throw new Error("An error occurred while fetching user profile.");
}
})
const infoStorage = () => {
    const StorageUserInfo = JSON.parse(localStorage.getItem("RegisterInfo"));
    if (StorageUserInfo) {
      return StorageUserInfo;
    }
    return null;
  };
const initialState = {
    Info: infoStorage() || [],
    AllUsers: [],
    GetChatUser: [],
    SelectedChat: "",
  clickedChat: null,
  messages: [],
  notification:[],
    loading: false,
    error: null,
    loggedIn: false,
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.Info = action.payload;
            state.loggedIn = true;
            localStorage.setItem("RegisterInfo", JSON.stringify(action.payload));
          },
          setSelectedChat: (state, action) => {
            state.clickedChat = action.payload;
          },
          addNotification: (state, action) => {
           state.notification = action.payload
           
          },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchRegister.pending, (state) => {
            state.loading = true;
           state.error = false
        })
        .addCase(fetchRegister.fulfilled, (state,action) => {
            state.loading = false;
            state.Info = action.payload;
            state.loggedIn = true;
        })
        .addCase(fetchRegister.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
            state.loggedIn = false;
        })
        .addCase(fetchLogin.pending, (state) => {
            state.loading = true;
           state.error = false
        })
        .addCase(fetchLogin.fulfilled, (state,action) => {
            state.loading = false;
            state.Info = action.payload;
            state.loggedIn = true;
            localStorage.setItem("RegisterInfo", JSON.stringify(action.payload));
        })
        .addCase(fetchLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        .addCase(fetchLogout.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchLogout.fulfilled, (state) => {
            state.loading = false;
            state.Info = "";
            state.loggedIn = false;
            localStorage.removeItem("RegisterInfo");
          })
          .addCase(fetchLogout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(UpdateUser.pending, (state) => {
            state.loading = true;
           state.error = false
        })
        .addCase(UpdateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.Info = action.payload;
            state.loggedIn = true;
            localStorage.setItem("RegisterInfo", JSON.stringify(action.payload)); // Update local storage
        })
        .addCase(UpdateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
            state.loggedIn = false;
        })
        .addCase(fetchAboutUser.pending, (state) => {
            state.loading = true;
           state.error = false
        })
        .addCase(fetchAboutUser.fulfilled, (state,action) => {
            state.loading = false;
            state.Info = action.payload;
            state.loggedIn = true;
        })
        .addCase(fetchAboutUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
            state.loggedIn = false;
        })
        .addCase(fetchAllUsers.pending, (state) => {
            state.loading = true;
           state.error = false
        })
        .addCase(fetchAllUsers.fulfilled, (state,action) => {
            state.loading = false;
          state.AllUsers = action.payload
        })
        .addCase(fetchAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        .addCase(CreateChat.pending, (state) => {
            state.loading = true;
           state.error = false
        })
        .addCase(CreateChat.fulfilled, (state,action) => {
            state.loading = false;
          state.SelectedChat = action.payload
        })
        .addCase(CreateChat.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        .addCase(FetchMyChat.pending, (state) => {
            state.loading = true;
           state.error = false
        })
        .addCase(FetchMyChat.fulfilled, (state,action) => {
            state.loading = false;
          state.GetChatUser = action.payload
        })
        .addCase(FetchMyChat.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        .addCase(RenameGroupChatName.pending, (state) => {
          state.loading = true;
         state.error = false
      })
      .addCase(RenameGroupChatName.fulfilled, (state,action) => {
          state.loading = false;
        state.SelectedChat = action.payload
      })
      .addCase(RenameGroupChatName.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message
      })
      .addCase(AddUserInGroupChat.pending, (state) => {
        state.loading = true;
       state.error = false
    })
    .addCase(AddUserInGroupChat.fulfilled, (state,action) => {
        state.loading = false;
      state.SelectedChat = action.payload
    })
    .addCase(AddUserInGroupChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
    })
    .addCase(RemoveUserFromGroupchat.pending, (state) => {
      state.loading = true;
     state.error = false
  })
  .addCase(RemoveUserFromGroupchat.fulfilled, (state,action) => {
      state.loading = false;
    state.SelectedChat = action.payload
  })
  .addCase(RemoveUserFromGroupchat.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message
  })
  .addCase(SendMessageToUser.pending, (state, action) => {
    state.status = 'failed';
    state.error = action.error.message;
  })
  .addCase(SendMessageToUser.fulfilled, (state, action) => {
    state.status = 'succeeded';
    // Assuming your API returns the newly sent message
    state.messages.push(action.payload);
  })
  .addCase(SendMessageToUser.rejected, (state, action) => {
    state.status = 'failed';
    state.error = action.error.message;
  })
  .addCase(FetchMessage.pending, (state) => {
    state.status = 'loading';
  })
  .addCase(FetchMessage.fulfilled, (state, action) => {
    state.status = 'succeeded';
    state.messages = action.payload;
  })
  .addCase(FetchMessage.rejected, (state, action) => {
    state.status = 'failed';
    state.error = action.error.message;
  });
    }

})

export const { setUserInfo , setSelectedChat, addNotification} = userSlice.actions;

export default userSlice.reducer;