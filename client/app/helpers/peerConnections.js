    'use strict';
    // var _ = require('lodash');
    var peer;
    var connections = {};
    var socket = io();

    // No API key required when not using the peerJS cloud server
    socket.on('port', function(port){
      console.log('port shit is happen');
      // peer = new Peer({host: '/', port: port, path: '/api'});
      peer = new Peer({　host:'/', secure:true, port:443, key: 'peerjs', debug: 3, path: '/api'})
      peer.on('open', function(id){
        console.log('peer id is: ', id);
        socket.emit('peerId', id);
      });
      peer.on('connection', function(dataChannel){
        console.log(dataChannel);
        setPeerListeners(dataChannel);
        connections[dataChannel.id] = dataChannel;
        console.log('peer connected');
      });
    });

    // ids is { [id hash]: id, ... }
    socket.on('peerIds', function(ids){
      console.log('peerIds event: ', ids);
      _.forEach(ids, function(id){
        var dataChannel = peer.connect(id);
        setPeerListeners(dataChannel);
        connections[dataChannel.id] = dataChannel;
      });
    });

    function peerEmit(peerConnections, data){
      _.forEach(peerConnections, function(connection){
        connection.send(data);
      });
    }

    function setPeerListeners(peerConnection){
      peerConnection.on('open', function(){
        // this emission is here solely so jshint won't complain
        // about a function that is defined but not used...
        peerEmit(connections, "ayy lmao");
        console.log('connection opened');
      });

      peerConnection.on('data', function(data){
        console.log(data);
      });

      peerConnection.on('close', function(){
        delete connections[peerConnection.id];
        console.log('connection closed: ', peerConnection.id);
      });

      peerConnection.on('error', function(err){
        console.log(err);
      });
    }