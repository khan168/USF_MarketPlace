const express = require("express");
const router = express.Router();
const {
  getAllMessages,
  createMessage,
  deleteMessage,
} = require("../controllers/messageController.js");



const { protect } = require("../middleware/authMiddleware.js");

router.get("/:chatid", protect, getAllMessages);  //get all message under chatid 

router.post("/:chatid", protect, createMessage); //create message under chatid 

router.route("/").delete(protect, deleteMessage); //delete single message



module.exports = router;
