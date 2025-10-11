const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NodeSchema = new Schema({
  type: { type: String, enum: ['tab', 'subflow', 'group', 'config', 'node'], required: true },
  order: { type: Number, required: true },               // for deterministic rebuild
  label: { type: String },                               // optional UI label
  appname: { type: String, required: true },             // e.g. "nodered-instance-1"
  '__version' : {
    ver: { type: String },                               // semantic version or snapshot ID
    rev: { type: String, required: true },               // shared across all nodes in a snapshot
    state: { type: String, default: 'pending commit' }   // lifecycle state: draft, committed, etc.
  },
  '__attributes': {
    created: { type: Date, default: Date.now },
    createdBy: { type: String },                         // e.g. User ID
    modified: { type: Date, default: Date.now },
    modifiedBy: { type: String }                         // e.g. User ID
  },
  content: { type: Schema.Types.Mixed, required: true }  // raw Node-RED node (includes z, id, etc.)
});

NodeSchema.index({ appname: 1, '__attributes.createdBy': 1 });
NodeSchema.index({ '__version.ver': 1 });
NodeSchema.index({ '__version.rev': 1 });
NodeSchema.index({ 'content.id': 1 }, { unique: true });
NodeSchema.index({ 'content.z': 1 }, { sparse: true });

module.exports = mongoose.model('Node', NodeSchema);