# FreeBirds SDK

Browse a small bird dataset for prototyping, with search, sort, and limit query params

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Free Birds API

The Free Birds API is one of several sample datasets published by [freetestapi.com](https://freetestapi.com), a service that exposes static JSON collections for use in tutorials, demos, and front-end prototypes. The bird dataset is intended for development and testing rather than production use.

What you get from the API:

- A `GET /birds` endpoint that returns a JSON list of bird records
- Standard freetestapi query parameters for filtering and pagination, such as `search`, `sort`, and `limit`
- A single record can be retrieved by id via `GET /birds/{id}`

Operational notes: no authentication is required. The freepublicapis catalogue entry reports that CORS is disabled, so requests from a browser may need a proxy. Reliability is inconsistent — the catalogue's recent health checks show the search endpoint failing — so treat this as a sandbox dataset rather than a stable source.

## Try it

**TypeScript**
```bash
npm install free-birds
```

**Python**
```bash
pip install free-birds-sdk
```

**PHP**
```bash
composer require voxgig/free-birds-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/free-birds-sdk/go
```

**Ruby**
```bash
gem install free-birds-sdk
```

**Lua**
```bash
luarocks install free-birds-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { FreeBirdsSDK } from 'free-birds'

const client = new FreeBirdsSDK({})

// List all birds
const birds = await client.Bird().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o free-birds-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "free-birds": {
      "command": "/abs/path/to/free-birds-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Bird** | A bird record served under `/birds`, with a single-record form at `/birds/{id}` and list filtering via `search`, `sort`, and `limit` query parameters. | `/birds` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from freebirds_sdk import FreeBirdsSDK

client = FreeBirdsSDK({})

# List all birds
birds, err = client.Bird(None).list(None, None)

# Load a specific bird
bird, err = client.Bird(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'freebirds_sdk.php';

$client = new FreeBirdsSDK([]);

// List all birds
[$birds, $err] = $client->Bird(null)->list(null, null);

// Load a specific bird
[$bird, $err] = $client->Bird(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/free-birds-sdk/go"

client := sdk.NewFreeBirdsSDK(map[string]any{})

// List all birds
birds, err := client.Bird(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "FreeBirds_sdk"

client = FreeBirdsSDK.new({})

# List all birds
birds, err = client.Bird(nil).list(nil, nil)

# Load a specific bird
bird, err = client.Bird(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("free-birds_sdk")

local client = sdk.new({})

-- List all birds
local birds, err = client:Bird(nil):list(nil, nil)

-- Load a specific bird
local bird, err = client:Bird(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = FreeBirdsSDK.test()
const result = await client.Bird().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = FreeBirdsSDK.test(None, None)
result, err = client.Bird(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = FreeBirdsSDK::test(null, null);
[$result, $err] = $client->Bird(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Bird(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = FreeBirdsSDK.test(nil, nil)
result, err = client.Bird(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Bird(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Free Birds API

- Upstream: [https://freetestapi.com/api/v1](https://freetestapi.com/api/v1)
- API docs: [https://freepublicapis.com/free-birds-api](https://freepublicapis.com/free-birds-api)

---

Generated from the Free Birds API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
