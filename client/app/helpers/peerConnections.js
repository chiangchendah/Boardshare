    'use strict';
    // var _ = require('lodash');
    var peer;
    var connections = {};
    var socket = io();

    // No API key required when not using the peerJS cloud server
    socket.on('env', function(env, port){
      if (env === 'production'){
         peer = new Peer({　host:'/', secure:true, port:443, key: 'peerjs', path: '/api'});  
      } else {
        peer = new Peer({host: '/', port: port, path: '/api'});
      }
      peer.on('open', function(id){
        console.log('peer id is: ', id);
        socket.emit('peerId', id);
      });
      peer.on('connection', function(dataChannel){
        setPeerListeners(dataChannel);
        connections[dataChannel.id] = dataChannel;
      });
    });

    // ids is { [id hash]: id, ... }
    socket.on('peerIds', function(ids){
      _.forEach(ids, function(id){
        var dataChannel = peer.connect(id);
        setPeerListeners(dataChannel);
        connections[dataChannel.id] = dataChannel;
      });
    });

    function peerEmit(peerConnections, data){
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
        peerEmit(connections, "ayy lmao");
      });

      peerConnection.on('data', function(data){
        console.log(data);
      });

      peerConnection.on('close', function(){
        delete connections[peerConnection.id];
      });

      peerConnection.on('error', function(err){
        console.log(err);
      });
    }