const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CredentialSchema = new Schema({
  appname: { type: String, required: true },                 // e.g. "nodered-instance-1"
  owner: { type: String, required: true },                   // Keycloak user ID
  nodeId: { type: String, required: true },                  // Node-RED node ID
  credentials: { type: Schema.Types.Mixed, required: true }, // Encrypted credentials
  rev: { type: String },                                     // Optional: link to flow snapshot
  state: { type: String, default: 'pending commit' },        // lifecycle state: draft, committed, etc.
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

CredentialSchema.index({ appname: 1, owner: 1, nodeId: 1 }, { unique: true });

module.exports = mongoose.model('Credentials', CredentialSchema);

/* Per-user key (stronger isolation)
// Setup
// - Derive key from user identity (e.g. Keycloak ID + salt):

function deriveUserKey(userId) {
  return crypto.createHash('sha256').update(userId + process.env.SALT).digest();
}

// - Encrypt with derived key:

function encryptWithUserKey(data, userId) {
  const key = deriveUserKey(userId);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decryptWithUserKey(encrypted, userId) {
  const key = deriveUserKey(userId);
  const [ivHex, encryptedData] = encrypted.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return JSON.parse(decrypted);
}

// - Store encrypted string in your model:

credentials: { type: String, required: true } // encrypted with per-user key

*/