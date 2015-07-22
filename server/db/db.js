var mongoose = require('mongoose');

var mongoDB = process.env.MONGOLAB_URI || "mongodb://localhost/boardshare";

mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var UserSchema = new mongoose.Schema({
  githubId: { type: String, index: { unique: true } },
  username: String,
  boards: [String]
});

var BoardSchema = new mongoose.Schema({
  canvas: String,
  editor: String,
  url: String
});

module.exports = {
  Board: mongoose.model('Board', BoardSchema),
  User: mongoose.model('User', UserSchema)
};
