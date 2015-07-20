var mongoose = require('mongoose');

var mongoDB = process.env.MONGOLAB_URI || "mongodb://localhost/boardshare";

mongoose.connect(mongoDB);

var UserSchema = new mongoose.Schema({
  githubId: { type: String, index: { unique: true } },
  username: String,
  board: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }]
  // user may have many boards
});

var BoardSchema = new mongoose.Schema({
  canvas: String,
  editor: String
});

module.exports = {
  board: mongoose.model('board', UserSchema), 
  user: mongoose.model('user', UserSchema)
};
