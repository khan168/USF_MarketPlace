const asyncHandler = require("express-async-handler");

const Message = require("../models/messageModel");



// @desc Get all Messages between users
// @route GET /api/message/:chatid
// @access Private

const getAllMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({
    chatid:req.params.chatid
  })

  res.status(200).json(messages);
});

// @desc finds if chat exists else creates a Chat
// @route post /api/message/:chatid
// @access Private

const createMessage = asyncHandler(async (req, res,next) => {
  if(req.body && req.body.desc){
    const result = await Message.create({
      user: req.user._id,
      desc: req.body.desc,
      chatid: req.params.chatid,
    })

  // await result.populate("user")
  return res.status(201).send(result);
    
  }else{
    const err = new Error("empty body or desc")
    err.status=400;
    next(err)
  }
});


// @desc Delete message
// @route DELETE /api/chat/:id
// @access Private
const deleteMessage = asyncHandler(async (req, res) => {
  const chat = await Message.findByIdAndDelete(req.body.id);
  await chat.remove;

  res.status(200).json({ message: `Chat ${req.body.id} removed` });
});

module.exports = {
  getAllMessages,
  createMessage,
  deleteMessage,
};
