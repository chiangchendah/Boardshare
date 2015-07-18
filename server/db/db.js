var mongoose = require('mongoose');

var mongoDB = process.env.MONGOLAB_URI || "mongodb://localhost/boardshare";

mongoose.connect(mongoDB);

var UserSchema = new mongoose.Schema({
  githubId: { type: String, index: { unique: true } },
  board: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }]
  // use may have many boards
});

var BoardSchema = new mongoose.Schema({
  canvas: String,
  editor: String
});

module.exports = mongoose.model('User', UserSchema);
