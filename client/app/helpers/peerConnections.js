    'use strict';
    // var _ = require('lodash');
    var peer;
    var peerConnections = {};
    var socket = io();

    // No API key required when not using the peerJS cloud server
    socket.on('env', function(env, port){
      if (env === 'production'){
         peer = new Peer({　host:'/', secure:true, port:443, key: 'peerjs', path: '/api', config: {
          'iceServers': [
            { url: 'stun:stun.l.google.com:19302' } 
          ]}});
      } else {
        peer = new Peer({host: '/', port: port, path: '/api'});
      }
      peer.on('open', function(id){
        console.log('peer id is: ', id);
        socket.emit('peerId', id);
      });
      peer.on('connection', function(dataChannel){
        setPeerListeners(dataChannel);
        peerConnections[dataChannel.id] = dataChannel;
      });
    });

    // ids is { [id hash]: id, ... }
    socket.on('peerIds', function(ids){
      _.forEach(ids, function(id){
        var dataChannel = peer.connect(id);
        setPeerListeners(dataChannel);
        peerConnections[dataChannel.id] = dataChannel;
      });
    });

    function emitDataToPeers(peerConnections, data){
      _.forEach(peerConnections, function(connection){
        if (connection.open) {
          connection.send(data);
        }
      });
    }

    function setPeerListeners(peerConnection){
      peerConnection.on('open', function(){
        // this emission is here solely so jshint won't complain
        // about a function that is defined but not used...
        emitDataToPeers(peerConnections, "ayy lmao");
      });

      peerConnection.on('data', function(data){
        if (data.chat) {
          $('#messages').append($('<li>').text(peerConnection.id + ': ' + data.chat));
        }
        console.log(data);
      });

      peerConnection.on('close', function(){
        delete peerConnections[peerConnection.id];
      });

      peerConnection.on('error', function(err){
        console.log(err);
      });
    }

    function callHandler(call) {
      call.on('stream', function(stream){
        var vid = $('<video class="peer-vid" autoplay></vid>');
        $('#video-container').append(vid);
        vid.prop('src', URL.createObjectURL(stream));
      });
    }