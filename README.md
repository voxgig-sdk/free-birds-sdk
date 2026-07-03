# FreeBirds SDK

Free Birds API client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

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

## Quickstart

### TypeScript

```ts
import { FreeBirdsSDK } from 'free-birds'

const client = new FreeBirdsSDK({
  apikey: process.env.FREE-BIRDS_APIKEY,
})

// List all birds
const birds = await client.Bird().list()
console.log(birds.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

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
| **Bird** |  | `/birds` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from freebirds_sdk import FreeBirdsSDK

client = FreeBirdsSDK({
    "apikey": os.environ.get("FREE-BIRDS_APIKEY"),
})

# List all birds
birds, err = client.Bird().list()
print(birds)

# Load a specific bird
bird, err = client.Bird().load({"id": "example_id"})
print(bird)
```

### PHP

```php
<?php
require_once 'freebirds_sdk.php';

$client = new FreeBirdsSDK([
    "apikey" => getenv("FREE-BIRDS_APIKEY"),
]);

// List all birds
[$birds, $err] = $client->Bird()->list();
print_r($birds);

// Load a specific bird
[$bird, $err] = $client->Bird()->load(["id" => "example_id"]);
print_r($bird);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/free-birds-sdk/go"

client := sdk.NewFreeBirdsSDK(map[string]any{
    "apikey": os.Getenv("FREE-BIRDS_APIKEY"),
})

// List all birds
birds, err := client.Bird(nil).List(nil, nil)
fmt.Println(birds)
```

### Ruby

```ruby
require_relative "FreeBirds_sdk"

client = FreeBirdsSDK.new({
  "apikey" => ENV["FREE-BIRDS_APIKEY"],
})

# List all birds
birds, err = client.Bird().list
puts birds

# Load a specific bird
bird, err = client.Bird().load({ "id" => "example_id" })
puts bird
```

### Lua

```lua
local sdk = require("free-birds_sdk")

local client = sdk.new({
  apikey = os.getenv("FREE-BIRDS_APIKEY"),
})

-- List all birds
local birds, err = client:Bird():list()
print(birds)

-- Load a specific bird
local bird, err = client:Bird():load({ id = "example_id" })
print(bird)
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
client = FreeBirdsSDK.test()
result, err = client.Bird().load({"id": "test01"})
```

### PHP

```php
$client = FreeBirdsSDK::test();
[$result, $err] = $client->Bird()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.Bird(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = FreeBirdsSDK.test
result, err = client.Bird().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:Bird():load({ id = "test01" })
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

---

Generated from the Free Birds API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
