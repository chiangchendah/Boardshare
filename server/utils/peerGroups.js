/**
 * A collection of PeerGroup instances
 * @return     {Object} A collection of PeerGroup instances
 */
var PeerGroups = function () {
  this._storage = {};
  this._count = 0;
};

/**
 * Add a PeerGroup to the collection
 * @param      {Object}   peerGroup An instance of PeerGroup
 * @return     {Object} the added peerGroup
 */
PeerGroups.prototype.addGroup = function (peerGroup) {
   this._storage[ peerGroup.id ] = peerGroup;
   this._count++;
   return peerGroup;
};

/**
 * Remove a PeerGroup to the collection
 * @param      {String}   id The id of a peerGroup instance (peerGroup.id)
 */
PeerGroups.prototype.removeGroup = function (id) {
  delete this._storage[ id ];
  this._count--;
};

/**
 * Check if a group already exists in the collection
 * @param      {String}   id The id of a peerGroup instance (peerGroup.id)
 * @return     {Boolean} true if the group exists, false if not
 */
PeerGroups.prototype.groupExists = function (id) {
  return id in this._storage;
};

/**
 * Retrieve a PeerGroup from the collection
 * @param      {String}   id The id of a peerGroup instance (peerGroup.id)
 * @return     {Object} a peerGroup if one exists, undefined if one does not exists
 */
PeerGroups.prototype.getGroup = function (id) {
  return this._storage[ id ];
};

/**
 * The number of PeerGroup that currently exist in the collection
 * @return     {Number} the number of groups in the collection
 */
PeerGroups.prototype.countGroups = function() {
  return this._count;
};

module.exports = new PeerGroups();
