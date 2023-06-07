const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema(
  {
    chatid:{
        type:String,
        required:true,
        unique:true
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
      default: "new chat"
    },
    readby:{
        type: Array,
        default:[]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", ChatSchema);
