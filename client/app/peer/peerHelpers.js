var stayinAlive = false;


/**
 * Keep the PeerJS socket connection alive (only applicable to heroku)
 * @param      {Object}   rtc instance of PeerJS Peer()
 */
function stayAlive(rtc){
  if(!stayinAlive){
    stayinAlive = true;
    return setInterval(function(){
        rtc.socket.send({type: "DUMMY"});
    }, 50000);
  }
}

module.exports = {
  stayAlive: stayAlive
};
