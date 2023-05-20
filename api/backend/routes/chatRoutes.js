const express = require("express");
const router = express.Router();
const {
  getChats,
  getSingleChat,
  updateChat,
  findorcreateChat,
  deleteChat
} = require("../controllers/chatController.js");

const {protect} = require("../middleware/authMiddleware.js");

router.post("/",protect, findorcreateChat);    //create chat if not found 

router.route("/:id").put(protect, updateChat).delete(protect, deleteChat);

router.get("/all",protect,getChats)


module.exports = router;
