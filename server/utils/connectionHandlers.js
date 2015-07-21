var PeerGroup = require('./peerGroup');
var peerGroups = require('./peerGroups');

/**
 * Get the peerIds for a boardshare instance and emit them to the socket
 * and add the requesting user to the PeerGroup
 * @param      {Object}   socket Socket.io socket obj of requesting user
 * @param      {String}   peerId The peerId of the requesting user
 * @param      {String}   groupId The groupId of the group the user is trying to join
 */
var returnPeerIds = function(socket, peerId, groupId){
  var group = peerGroups.getGroup(groupId);
  group && socket.emit('peerIds', group.peerIds);
  group && group.addPeerId(socket.id, peerId);
};

/**
 * Remove a peerId from the collection (used when peer disconnects), also
 * deletes the group form the collection if the group is empty
 * @param      {Object}   socket Socket.io socket obj of disconnecting user
 */
var removePeerId = function(socket){
  var group = peerGroups.getGroup(socket.group);
  if (group) {
    group.removePeerId(socket.id);
    group.isEmpty() && peerGroups.removeGroup(group.id);
  }
};

// put the exports down here so doxx wouldn't get confused
exports.returnPeerIds = returnPeerIds;
exports.removePeerId = removePeerId;
