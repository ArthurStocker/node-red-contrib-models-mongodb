const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingsSchema = new Schema({
  appname: { type: String, required: true },
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
  settings: { type: Schema.Types.Mixed, default: {} }
});

SettingsSchema.index({ appname: 1, '__attributes.createdBy': 1 }, { unique: true });

module.exports = mongoose.model('Settings', SettingsSchema);