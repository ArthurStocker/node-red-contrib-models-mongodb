# node-red-contrib-models-mongodb

## Overview

A curated collection of Mongoose schemas designed for use in Node-RED storage plugins.  
These models provide a structured foundation for persisting flows, credentials, settings, and other runtime data in MongoDB.

---

## Documentation

Full documentation is maintained in a **separate repository**:

👉 [Project Documentation](https://github.com/your-org/docs-repo)

The documentation includes:

- **Architecture** — Node-RED, MongoDB, Docker, VS Code integration  
- **Extension details** — WebView, Web Components, schema-driven forms  
- **Orchestration** — docker.sock, OAuth proxy, container lifecycle  
- **Flows** — endpoints, schema registry, persistence  
- **Deployment** — Compose setup, Traefik routing, security notes

---

## Repository Structure

```text
repo-root/
├── README.md              # High-level overview
├── .gitignore             # Git ignore rules
├── index.js               # Plugin entry point
├── package.json           # Package definition and metadata
├── nodes.js               # Flow definitions 
├── credentials.js         # Encrypted credentials for nodes
├── settings.js            # Runtime configuration settings
├── library.js             # User-defined library entries
└── LICENSE.md             # License (see separate repo/discussion)
```

## MongoDB Collections

The plugin provides the following collections:

- `Node` — Node-RED flow definitions  
- `Credentials` — Encrypted credentials for nodes  
- `Settings` — Runtime configuration settings  
- `LibraryEntry` — User-defined library entries

---

## License

See [`LICENSE`](./LICENSE) for licensing details.
