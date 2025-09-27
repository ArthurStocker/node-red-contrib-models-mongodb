const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingsSchema = new Schema({
  appname: { type: String, required: true },
  owner: { type: String, required: true },
  settings: { type: Schema.Types.Mixed, default: {} },
  rev: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

SettingsSchema.index({ appname: 1, owner: 1 }, { unique: true });

module.exports = mongoose.model('Settings', SettingsSchema);