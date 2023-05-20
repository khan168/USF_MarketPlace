const asyncHandler = require("express-async-handler");

const Chat = require("../models/chatModel");

// @desc Get chat
// @route GET /api/chats/:id
// @access Private
//find by post id
const getSingleChat = asyncHandler(async (req, res) => {
  const chat = await Chat.find({chatid:req.params.id})
  if (items) {
    res.status(200).json(chat);
  } else {
    res.status(404).json({ message: "Chat not found" });
  }
});

// @desc Get all Chats
// @route GET /api/chats
// @access Private

const getChats = asyncHandler(async (req, res) => {
  const items = await Chat.find({
    $or: [{ from: req.user._id }, { to: req.user._id }],
  }).populate("from").populate("to")

    res.status(200).json(items);
});


// @desc finds if chat exists else creates a Chat
// @route post /api/chats
// @access Private

const findorcreateChat = asyncHandler(async (req, res,next) => {
  const chat_id = req.user._id> req.body.to ? req.user._id + req.body.to : req.body.to + req.user._id;

  const foundChat = await Chat.find({chatid:chat_id});
  if(foundChat.length!==0){
      return res.status(200).send({oldchat:foundChat});
  }else{
    const newChat = new Chat({
      chatid: req.user._id> req.to ? req.user._id + req.to : req.body.to + req.user._id,  //makes sure user1 and user2 chat is same as user2 and user1 chat
      from: req.user._id,
      to: req.body.to,
    });
    
    try {
      const nc = await newChat.save();
      res.status(201).send(nc);
    } catch (err) {
      next(err);
    }
  }
});







// @desc Update Chat -> mainly read or not and last message 
// @route PUT /api/items/:id
// @access Private
const updateChat = asyncHandler(async (req, res) => {

  const found = await Chat.find({chatid:req.params.id}).populate("to");

  const updatedChat = await Chat.findOneAndUpdate(
    { chatid: req.params.id },
    {
      $set: {
        ...(req.user._id.toString() === found[0].to._id.toString()
          ? { ReadByReciever: true }
          : { ReadByReciever: false }),
      },
    },
    { new: true }
  );
  res.status(200).send(updatedChat);
});


// @desc Delete chat
// @route DELETE /api/chat/:id
// @access Private
const deleteChat = asyncHandler(async (req, res) => {
  const chat = await Chat.find({chatid:req.params.id});

  await chat.remove;

  res.status(200).json({ message: `Chat ${req.params.id} removed` });
});

module.exports = {
  getChats,
  getSingleChat,
  updateChat,
  findorcreateChat,
  deleteChat,
};
