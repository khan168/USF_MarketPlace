const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // This refers to the User Schema
    required: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post', // This refers to the Post Schema
    required: true
  }
}, {
  timestamps: true // This will add created_at and updated_at fields
});

module.exports = mongoose.model('Like', LikesSchema);
