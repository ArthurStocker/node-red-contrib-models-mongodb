const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NodeSchema = new Schema({
  appname: { type: String, required: true },          // e.g. "nodered-instance-1"
  owner: { type: String, required: true },            // e.g. Keycloak user ID
  type: { type: String, enum: ['tab', 'subflow', 'group', 'config', 'node'], required: true },
  order: { type: Number, required: true },            // for deterministic rebuild
  label: { type: String },                            // optional UI label
  ver: { type: String },                              // semantic version or snapshot ID
  rev: { type: String, required: true },              // shared across all nodes in a snapshot
  state: { type: String, default: 'pending commit' }, // lifecycle state: draft, committed, etc.
  node: { type: Schema.Types.Mixed, required: true }, // raw Node-RED node (includes z, id, etc.)
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

NodeSchema.index({ appname: 1, owner: 1 });
NodeSchema.index({ ver: 1 });
NodeSchema.index({ rev: 1 });
NodeSchema.index({ 'node.id': 1 }, { unique: true });
NodeSchema.index({ 'node.z': 1 }, { sparse: true });

module.exports = mongoose.model('Node', NodeSchema);