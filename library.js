const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LibraryEntrySchema = new Schema({
  meta: { type: Schema.Types.Mixed },                    // optional metadata
  type: { type: String, required: true },                // e.g. "function"
  path: { type: String, required: true },                // e.g. "utils/parseCSV"
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
  content: { type: String, required: true }              // actual content
});

LibraryEntrySchema.index({ appname: 1, '__attributes.createdBy': 1, type: 1, path: 1 }, { unique: true });

module.exports = mongoose.model('LibraryEntry', LibraryEntrySchema);