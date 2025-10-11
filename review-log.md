---
document: Architecture & Commenting Guideline – Schema Review Log
description: Summary of semantic clarity evaluations for recent frontend components
version: 1.0.0
author: Arthur
maintainedBy: Plugin Architecture Team
lastUpdated: 2025-10-11
tags: [clarity-check,schema-review, schema-architecture]
---

# Architecture & Commenting Guideline – Schema Review Log

## ✅ Schema: `NodeSchema`

| Aspect               | Status | Comment                                                                 |
|----------------------|--------|-------------------------------------------------------------------------|
| Field structure      | ✅     | All fields are clearly typed and semantically grouped                  |
| Versioning strategy  | ✅     | `__version` embeds `ver`, `rev`, and `state` for snapshot lifecycle     |
| Audit metadata       | ✅     | `__attributes` includes `created`, `createdBy`, `modified`, `modifiedBy` |
| Content encapsulation| ✅     | `content` holds raw Node-RED node with full flexibility                 |
| Index coverage       | ✅     | All critical fields indexed for performance and uniqueness              |
| Comment clarity      | ✅     | All fields are documented with precise, onboarding-ready comments       |

***✨ Highlights***

- Semantic separation of metadata (`__version`, `__attributes`) from payload (`content`)  
- Lifecycle state tracking via `__version.state` enables draft/commit workflows  
- Audit traceability through `__attributes.createdBy` and `modifiedBy`  
- Deterministic rebuild support via `order` field  
- Unique node enforcement through `content.id` index  
- Sparse indexing on `content.z` supports optional flow grouping  

***📌 Next Steps***

- Add optional `__registry` field for plugin-level grouping and registry mapping  
- Introduce `__auditLog` array for historical lifecycle transitions  
- Extend `content` with schema validator for expected fields (`id`, `type`, `z`, etc.)  
- Document expected `content` contract in onboarding guide  
- Add Guideline-Check generator for schema inspection and registry validation  

---

## ✅ Schema: `CredentialSchema`

| Aspect                   | Status | Comment                                                                 |
|--------------------------|--------|-------------------------------------------------------------------------|
| Field structure          | ✅     | All fields are clearly typed and semantically grouped                  |
| Versioning strategy      | ✅     | `__version` embeds `ver`, `rev`, and `state` for snapshot lifecycle     |
| Audit metadata           | ✅     | `__attributes` includes `created`, `createdBy`, `modified`, `modifiedBy` |
| Content encapsulation    | ✅     | `credentials` holds encrypted payload with full flexibility             |
| Index coverage           | ✅     | Compound index on `appname`, `createdBy`, and `nodeId` ensures uniqueness |
| Comment clarity          | ✅     | All fields are documented with precise, onboarding-ready comments       |

***✨ Highlights***

- Semantic separation of metadata (`__version`, `__attributes`) from payload (`credentials`)  
- Lifecycle state tracking via `__version.state` enables draft/commit workflows  
- Audit traceability through `__attributes.createdBy` and `modifiedBy`  
- Unique credential enforcement via compound index on `appname`, `createdBy`, and `nodeId`  
- Comments clearly define field purpose and expected usage  

***📌 Next Steps***

- Add optional `__registry` field for grouping credentials by plugin or module  
- Introduce `__auditLog` array for historical lifecycle transitions  
- Extend `credentials` with schema validator for expected structure per node type  
- Document expected encryption contract and lifecycle in onboarding guide  

---

## ✅ Schema: `SettingsSchema`

| Aspect                   | Status | Comment                                                                 |
|--------------------------|--------|-------------------------------------------------------------------------|
| Field structure          | ✅     | All fields are clearly typed and semantically grouped                  |
| Versioning strategy      | ✅     | `__version` embeds `ver`, `rev`, and `state` for snapshot lifecycle     |
| Audit metadata           | ✅     | `__attributes` includes `created`, `createdBy`, `modified`, `modifiedBy` |
| Content encapsulation    | ✅     | `settings` holds flexible configuration payload                        |
| Index coverage           | ✅     | Compound index on `appname` and `createdBy` ensures scoped uniqueness   |
| Comment clarity          | ✅     | All fields are documented with precise, onboarding-ready comments       |

### ✨ Highlights

- Semantic separation of metadata (`__version`, `__attributes`) from payload (`settings`)  
- Lifecycle state tracking via `__version.state` enables draft/commit workflows  
- Audit traceability through `__attributes.createdBy` and `modifiedBy`  
- Unique settings enforcement via compound index on `appname` and `createdBy`  
- Comments clearly define field purpose and expected usage  

### 📌 Next Steps

- Add optional `__registry` field for grouping settings by module or plugin  
- Introduce `__auditLog` array for historical lifecycle transitions  
- Extend `settings` with schema validator for expected structure per plugin  
- Document expected `settings` contract and lifecycle in onboarding guide  

---

## ✅ Schema: `LibraryEntrySchema`

| Aspect               | Status | Comment                                                                 |
|----------------------|--------|-------------------------------------------------------------------------|
| Field structure      | ✅     | All fields are clearly typed and semantically grouped                  |
| Versioning strategy  | ✅     | `__version` embeds `ver`, `rev`, and `state` for snapshot lifecycle     |
| Audit metadata       | ✅     | `__attributes` includes `created`, `createdBy`, `modified`, `modifiedBy` |
| Content encapsulation| ✅     | `content` holds raw string payload with full flexibility                |
| Index coverage       | ✅     | Compound index on `appname`, `owner`, `type`, `path` ensures uniqueness |
| Comment clarity      | ✅     | All fields are documented with precise, onboarding-ready comments       |

***✨ Highlights***

- Semantic separation of metadata (`__version`, `__attributes`) from payload (`content`)  
- Lifecycle state tracking via `__version.state` enables draft/commit workflows  
- Audit traceability through `__attributes.createdBy` and `modifiedBy`  
- Flexible metadata support via `meta: Mixed` for optional annotations  
- Compound uniqueness enforced across `appname`, `owner`, `type`, and `path`  
- Comments clearly define field purpose and expected usage  

***📌 Next Steps***

- Add `__registry` field for grouping entries by logical module or plugin  
- Introduce `__auditLog` array for historical lifecycle transitions  
- Extend `meta` with optional `tags`, `description`, and `language` fields  
- Document expected `content` contract for each `type` in onboarding guide  
- Add Guideline-Check generator for library inspection and registry validation  

---

## 🧠 Overall Evaluation: Schema Integrity

| Criterion                       | Status | Summary Comment                                                           |
|---------------------------------|--------|---------------------------------------------------------------------------|
| **Schema consistency**          | ✅     | All field paths and prefixes match their respective schemas (`NodeSchema`, `LibraryEntrySchema`, `CredentialSchema`) |
| **Modularity & API separation** | ✅     | Each method is clearly scoped, versionable, and audit-aware with no shared internal logic |
| **Comment discipline**          | ✅     | All comments are in English, precise, lifecycle-aware, and onboarding-ready |
| **Fallback resilience**         | ✅     | `state` logic enables robust handling of draft vs. committed flows, entries, and credentials |
| **Extensibility**               | ✅     | All methods and schemas are ready for registry integration, audit viewers, and snapshot API layers |

### ✅ 1. Schema Review

| Schema               | Field                    | Type   | Required     | Comment Quality | Notes |
|----------------------|--------------------------|--------|--------------|-----------------|------------------------------------|
| `NodeSchema`         | `nodeId`                 | String | ✅           | ✅             | Unique node reference |
|                      | `appname`                | String | ✅           | ✅             | Node-RED instance name |
|                      | `content`                | Mixed  | ✅           | ✅             | Node-RED node definition |
|                      | `__version.ver`          | String | ❌           | ✅             | Semantic version or snapshot label |
|                      | `__version.rev`          | String | ✅           | ✅             | Snapshot ID shared across nodes |
|                      | `__version.state`        | String | ❌ (default) | ✅             | Lifecycle state |
|                      | `__attributes.created`   | Date   | ❌ (default) | ✅             | Timestamp for creation |
|                      | `__attributes.createdBy` | String | ❌           | ✅             | Audit trace |
|                      | `__attributes.modified`  | Date   | ❌ (default) | ✅             | Timestamp for last modification |
|                      | `__attributes.modifiedBy`| String | ❌           | ✅             | Audit trace |
| `LibraryEntrySchema` | `type`                   | String | ✅           | ✅             | Entry type (e.g. function) |
|                      | `path`                   | String | ✅           | ✅             | Logical path |
|                      | `appname`                | String | ✅           | ✅             | Node-RED instance name |
|                      | `content`                | String | ✅           | ✅             | Raw content |
|                      | `__version.ver`          | String | ❌           | ✅             | Semantic version or snapshot label |
|                      | `__version.rev`          | String | ✅           | ✅             | Snapshot ID shared across entries |
|                      | `__version.state`        | String | ❌ (default) | ✅             | Lifecycle state |
|                      | `__attributes.created`   | Date   | ❌ (default) | ✅             | Timestamp for creation |
|                      | `__attributes.createdBy` | String | ❌           | ✅             | Audit trace |
|                      | `__attributes.modified`  | Date   | ❌ (default) | ✅             | Timestamp for last modification |
|                      | `__attributes.modifiedBy`| String | ❌           | ✅             | Audit trace |
| `CredentialSchema`   | `nodeId`                 | String | ✅           | ✅             | Node-RED node ID |
|                      | `appname`                | String | ✅           | ✅             | Node-RED instance name |
|                      | `credentials`            | Mixed  | ✅           | ✅             | Encrypted payload |
|                      | `__version.ver`          | String | ❌           | ✅             | Semantic version or snapshot label |
|                      | `__version.rev`          | String | ✅           | ✅             | Snapshot ID shared across credentials |
|                      | `__version.state`        | String | ❌ (default) | ✅             | Lifecycle state |
|                      | `__attributes.created`   | Date   | ❌ (default) | ✅             | Timestamp for creation |
|                      | `__attributes.createdBy` | String | ❌           | ✅             | Audit trace |
|                      | `__attributes.modified`  | Date   | ❌ (default) | ✅             | Timestamp for last modification |
|                      | `__attributes.modifiedBy`| String | ❌           | ✅             | Audit trace |
| `SettingsSchema`     | `appname`                | String | ✅           | ✅             | Node-RED instance name |
|                      | `settings`               | Mixed  | ❌ (default) | ✅             | Configuration object with default `{}` fallback |
|                      | `__version.ver`          | String | ❌           | ✅             | Semantic version or snapshot label |
|                      | `__version.rev`          | String | ✅           | ✅             | Snapshot ID shared across settings |
|                      | `__version.state`        | String | ❌ (default) | ✅             | Lifecycle state |
|                      | `__attributes.created`   | Date   | ❌ (default) | ✅             | Timestamp for creation |
|                      | `__attributes.createdBy` | String | ❌           | ✅             | Audit trace |
|                      | `__attributes.modified`  | Date   | ❌ (default) | ✅             | Timestamp for last modification |
|                      | `__attributes.modifiedBy`| String | ❌           | ✅             | Audit trace |

---

### ✅ 2. Schema Index Review

| Schema               | Index Fields                           | Unique | Scope Comment                                 |
|----------------------|----------------------------------------|--------|-----------------------------------------------|
| `NodeSchema`         | `appname`, `createdBy`, `nodeId`       | ✅     | Ensures unique node per user and app          |
| `LibraryEntrySchema` | `appname`, `createdBy`, `type`, `path` | ✅     | Ensures unique entry per user, type, and path |
| `CredentialSchema`   | `appname`, `createdBy`, `nodeId`       | ✅     | Ensures unique credentials per node and user  |
| `SettingsSchema`     | `appname`, `createdBy`                 | ✅     | Ensures one settings object per user and app  |

---

### ✅ 3. Snapshot Lifecycle Validator – Field Presence & Transition

| Schema       | Field                  | Expected Values                        | Transition Logic                          |
|--------------|------------------------|----------------------------------------|-------------------------------------------|
| All Schemata | `__version.state`      | `draft`, `pending commit`, `committed` | Must follow: draft → pending → committed  |
| All Schemata | `__version.rev`        | String (timestamp or hash)             | Shared across all entries in a snapshot   |
| All Schemata | `__version.ver`        | Semantic version or label              | Optional, used for human-readable tagging |
| All Schemata | `__attributes.created` | Date                                   | Set unless state is `committed`           |
| All Schemata | `__attributes.modified`| Date                                   | Always updated on change                  |

***📌 Next Steps***

- Automate lifecycle validation on insert/update  
- Generate onboarding-ready Guideline-Check tables per plugin  
- Extend registry logic with plugin grouping (`__registry`)  
- Introduce audit log arrays for change tracking  
- Build snapshot diff and rollback utilities  
