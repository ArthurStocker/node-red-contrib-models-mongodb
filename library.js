const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LibraryEntrySchema = new Schema({
  appname: { type: String, required: true },
  owner: { type: String, required: true },
  type: { type: String, required: true },           // e.g. "function"
  path: { type: String, required: true },           // e.g. "utils/parseCSV"
  meta: { type: Schema.Types.Mixed },               // optional metadata
  body: { type: String, required: true },           // actual content
  rev: { type: String },
  state: { type: String, default: "pending commit" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

LibraryEntrySchema.index({ appname: 1, owner: 1, type: 1, path: 1 }, { unique: true });

module.exports = mongoose.model('LibraryEntry', LibraryEntrySchema);