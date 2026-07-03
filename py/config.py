# FreeBirds SDK configuration


def make_config():
    return {
        "main": {
            "name": "FreeBirds",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://freetestapi.com/api/v1",
            "auth": {
                "prefix": "Bearer",
            },
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
            "active": True,
            "name": "description",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "diet",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "family",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "habitat",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "height_cm",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "image",
            "req": False,
            "type": "`$STRING`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "place_of_found",
            "req": False,
            "type": "`$STRING`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "species",
            "req": False,
            "type": "`$STRING`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "weight_kg",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 10,
          },
        ],
        "name": "bird",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": 10,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "example": "asc",
                      "kind": "query",
                      "name": "order",
                      "orig": "order",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "search",
                      "orig": "search",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/birds",
                "parts": [
                  "birds",
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
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/birds/{id}",
                "parts": [
                  "birds",
                  "{id}",
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
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
