const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const Message = require('../Model/Message')
const Chat = require('../Model/Chat')
const User = require('../Model/User')

// =====================SEND MESSAGE=====================
router.post("/", auth, async(req,res) => {
const {content, chatId} = req.body
console.log("content", content)
console.log("chatId", chatId)
if(!content || !chatId){
    return res.status(400).json({ error: "Invalid data passed into request" })
}
const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
}
try {
    var message = await Message.create(newMessage)
    await message.populate("sender", "name pic")
    await message.populate("chat")
    await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
    res.status(200).json(message);
} catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to send message" })
}
})


// ===================GET MESSAGE=====================
router.get("/recieve/:chatId", auth, async(req,res) => {
try {
    const { chatId } = req.params
    const message = await Message.find({chat:chatId}).populate("sender", "name pic email").populate("chat")

    res.status(200).json(message)
} catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to send message" })
}
})
module.exports = router