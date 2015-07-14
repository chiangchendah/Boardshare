var stayinAlive = false;
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
