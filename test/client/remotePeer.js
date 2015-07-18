var remotePeers = require('../../client/app/helpers/remotePeers');
var RemotePeer = require('../../client/app/helpers/remotePeer');

describe('Remote Peer & Collection', function () {
  var peer, bob, jon;
  before(function () {
    peer = new RemotePeer('abc123');
    jon = new RemotePeer('xyz123');
    jon.name = 'jon';
    bob = new RemotePeer('ayylmao');
    bob.name = 'bob';
  });

  describe('Remote Peer', function () {
    it('should be a function', function () {
      expect(RemotePeer).to.be.a("function");
    });
    it('should make a peer', function () {
      expect(peer).to.be.an.instanceof(RemotePeer);
    });
    it('should have a properties: id, name, dataConnection, mediaConnection', function () {
      expect(peer).to.have.keys('id', 'name', 'dataConnection', 'mediaConnection');
    });
    it('should have the id it was instantiated with', function () {
      expect(peer.id).to.eql('abc123');
    });
    it('should be able to change name', function () {
      peer.name = 'Bob Dole';
      expect(peer.name).to.equal('Bob Dole');
    });
  });
  describe('Remote Peer Collection', function () {
    it('should exist', function () {
      expect(remotePeers).to.exist;
      expect(remotePeers).to.be.a("object");
    });
    it('should have storage and count', function () {
      expect(remotePeers).to.have.keys('_storage', '_count');
    });
    it('should add new peers automatically', function () {
      expect(remotePeers._storage).to.have.keys(peer.id, jon.id, bob.id);
    });
    it('should be able to get peers in storage', function () {
      expect(remotePeers.getPeer).to.be.a('function');
      expect(remotePeers.getPeer(jon.id).name).to.equal('jon');
      expect(remotePeers.getPeer('random')).to.be.undefined;
    });
    it('should be able to remove peers from storage', function () {
      expect(remotePeers.removePeer).to.be.a('function');
      remotePeers.removePeer(jon.id);
      expect(remotePeers.getPeer(jon.id)).to.be.undefined;
    });
    it('should be able to add peers to storage', function () {
      expect(remotePeers.addPeer).to.be.a('function');
      remotePeers.addPeer(jon);
      expect(remotePeers.getPeer(jon.id).name).to.equal('jon');
    });
    it('should keep a peer count', function () {
      expect(remotePeers._count).to.equal(3);
      remotePeers.removePeer(jon.id);
      expect(remotePeers._count).to.equal(2);
    });
    it('should know if a peer already exists in the collection', function () {
      expect(remotePeers.alreadyExists).to.be.a('function');
      expect(remotePeers.alreadyExists(jon.id)).to.be.false;
      remotePeers.addPeer(jon);
      expect(remotePeers.alreadyExists(jon.id)).to.be.true;
    });
    it('shouldn\'t overwrite existing peers', function () {
      var tom = new RemotePeer('xyz123');
      tom.name = 'tom';
      expect(tom.id).to.equal(jon.id);
      expect(remotePeers.getPeer(tom.id).name).to.equal(jon.name);
    });
  });

});
