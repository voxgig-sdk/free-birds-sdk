# FreeBirds SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "FreeBirds",
            "slug": "free-birds",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://freetestapi.com/api/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "bird": {},
            },
        },
        "entity": {
      "bird": {
        "fields": [
          {
            "name": "description",
            "short": "Detailed description of the bird",
            "type": "`$STRING`",
          },
          {
            "name": "diet",
            "short": "Primary diet of the bird",
            "type": "`$STRING`",
          },
          {
            "name": "family",
            "short": "Bird family classification",
            "type": "`$STRING`",
          },
          {
            "name": "habitat",
            "short": "Primary habitat of the bird",
            "type": "`$STRING`",
          },
          {
            "format": "float",
            "name": "height_cm",
            "short": "Average height in centimeters",
            "type": "`$NUMBER`",
          },
          {
            "format": "int64",
            "name": "id",
            "short": "Unique identifier for the bird",
            "type": "`$INTEGER`",
          },
          {
            "format": "uri",
            "name": "image",
            "short": "URL to an image of the bird",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "short": "Common name of the bird",
            "type": "`$STRING`",
          },
          {
            "name": "place_of_found",
            "short": "Geographic location where the bird is commonly found",
            "type": "`$STRING`",
          },
          {
            "name": "species",
            "short": "Scientific species name",
            "type": "`$STRING`",
          },
          {
            "format": "float",
            "name": "weight_kg",
            "short": "Average weight in kilograms",
            "type": "`$NUMBER`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "bird",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "asc",
                      "kind": "query",
                      "name": "order",
                      "orig": "order",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/birds",
                "segments": [
                  {
                    "lit": "birds",
                  },
                ],
                "select": {
                  "exist": [
                    "limit",
                    "order",
                    "page",
                    "search",
                    "sort",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "birds",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/birds/{id}",
                "segments": [
                  {
                    "lit": "birds",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "birds",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
