const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema(
  {
    chatid:{
        type:String,
        required:true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    to:{
        type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    lastMesage: {
      type: String,
      default:"..."
    },
    ReadByReciever:{
        type: Boolean,
        default:false
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", ChatSchema);
