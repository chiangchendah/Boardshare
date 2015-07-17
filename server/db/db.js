var mongoose = require('mongoose');

var mongoDB = process.env.MONGODB_URL || "mongodb://localhost/boardshare";

mongoose.connect(mongoDB);

var UserSchema = new mongoose.Schema({
  githubId: { type: String, index: { unique: true } },
  firepadId: String,
  canvasJSON: String,
  message: String
});

module.exports = mongoose.model('User', UserSchema);
