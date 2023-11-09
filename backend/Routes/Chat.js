const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const Chat = require("../Model/Chat");
const User = require("../Model/User");

// ===================CREATE SINGLE USER CHAT=====================
router.post("/", auth, async (req, res) => {
  const { userId } = req.body;
console.log("userId", userId)
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.status(400).json({
      success: false,
      message: "UserId param not sent with request",
    });
  }
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email pic",
  });
  if (isChat.length > 0) {
    res.status(200).json(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);

      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(fullChat);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
});

// ============================FETCH CHATS========================
router.get("/getchat", auth, async (req, res) => {
  try {
    let chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    chats = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    res.status(200).json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// ====================CREATE GROUP CHAT====================
router.post("/create/group", auth, async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  //   var users = JSON.parse(req.body.users);
  var users = req.body.users;
  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }
  users.push(req.user);
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// ================RENAME GROUP CHAT NAME==========================
router.put("/rename", auth, async (req, res) => {
  try {
    const { chatId, chatName } = req.body;

    const updateChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    );
    if (!updateChat) {
      console.log("chatId is not found");
      return res.status(400).json({
        success: false,
        message: "chatId is not found",
      });
    }
    res.status(200).json(updateChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// ========================ADD USER TO GROUP===================
router.put("/adduser", auth, async (req, res) => {
 try {
    const { chatId, userId } = req.body;

    const addUser = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      { new: true }
    ).populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!addUser){
        console.log("chatId is not found");
        return res.status(400).json({
          success: false,
          message: "chatId is not found",
        })
    }
    res.status(200).json(addUser)
 } catch (error) {
    res.status(400);
    throw new Error(error.message);
 }
});

// ========================REMOVE USER FROM GROUP======================
router.put("/removeuser", auth, async (req, res) => {
    try {
       const { chatId, userId } = req.body;
   
       const removeUser = await Chat.findByIdAndUpdate(
         chatId,
         {
           $pull: { users: userId },
         },
         { new: true }
       ).populate("users", "-password")
       .populate("groupAdmin", "-password");
       
       if(!removeUser){
           console.log("chatId is not found");
           return res.status(400).json({
             success: false,
             message: "chatId is not found",
           })
       }
       res.status(200).json(removeUser)
    } catch (error) {
       res.status(400);
       throw new Error(error.message);
    }
   });
module.exports = router;
