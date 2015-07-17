var mongoose = require('mongoose');

var mongoDB = process.env.MONGOLAB_URI || "mongodb://localhost/boardshare";

mongoose.connect(mongoDB);

var UserSchema = new mongoose.Schema({
  githubId: { type: String, index: { unique: true } },
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' }
});

var BoardSchema = new mongoose.Schema({
  canvas: String,
  editor: String,
  messages: String,
});

var MessagesSchema = new mongoose.Schema({
  boardId: String,
  text: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('User', UserSchema);
