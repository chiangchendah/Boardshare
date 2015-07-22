
if (process.env.NODE_ENV === 'production') {
  module.exports = {
    "GITHUB_CLIENT_ID": process.env.GITHUB_CLIENT_ID,
    "GITHUB_CLIENT_SECRET": process.env.GITHUB_CLIENT_SECRET,
    "GITHUB_CALLBACK_URL": process.env.GITHUB_CALLBACK_URL,
    "MONGODB_URL": process.env.MONGOLAB_URI,
    "SESSION_SECRET": process.env.SESSION_SECRET
  }
} else {
  try {
    var github = require('../secret/github.json');
    module.exports = {
      "GITHUB_CLIENT_ID": github.id,
      "GITHUB_CLIENT_SECRET": github.secret,
      "GITHUB_CALLBACK_URL": github.url,
      "MONGODB_URL": "mongodb://localhost/boardshare",
      "SESSION_SECRET": "ayy lmao"
    }
  } catch(err) {
    console.error('missing "secrets/github.json", ask stephan...');
    process.exit(1);
  }
}
