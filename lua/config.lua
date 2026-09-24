-- FreeBirds SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "FreeBirds",
      slug = "free-birds",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://freetestapi.com/api/v1",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["bird"] = {},
      },
    },
    entity = {
      ["bird"] = {
        ["fields"] = {
          {
            ["name"] = "description",
            ["title"] = "Description",
            ["type"] = "`$STRING`",
            ["short"] = "Detailed description of the bird",
          },
          {
            ["name"] = "diet",
            ["title"] = "Diet",
            ["type"] = "`$STRING`",
            ["short"] = "Primary diet of the bird",
          },
          {
            ["name"] = "family",
            ["title"] = "Family",
            ["type"] = "`$STRING`",
            ["short"] = "Bird family classification",
          },
          {
            ["name"] = "habitat",
            ["title"] = "Habitat",
            ["type"] = "`$STRING`",
            ["short"] = "Primary habitat of the bird",
          },
          {
            ["name"] = "height_cm",
            ["title"] = "Height Cm",
            ["type"] = "`$NUMBER`",
            ["short"] = "Average height in centimeters",
            ["format"] = "float",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$INTEGER`",
            ["short"] = "Unique identifier for the bird",
            ["format"] = "int64",
          },
          {
            ["name"] = "image",
            ["title"] = "Image",
            ["type"] = "`$STRING`",
            ["short"] = "URL to an image of the bird",
            ["format"] = "uri",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "Common name of the bird",
          },
          {
            ["name"] = "place_of_found",
            ["title"] = "Place Of Found",
            ["type"] = "`$STRING`",
            ["short"] = "Geographic location where the bird is commonly found",
          },
          {
            ["name"] = "species",
            ["title"] = "Species",
            ["type"] = "`$STRING`",
            ["short"] = "Scientific species name",
          },
          {
            ["name"] = "weight_kg",
            ["title"] = "Weight Kg",
            ["type"] = "`$NUMBER`",
            ["short"] = "Average weight in kilograms",
            ["format"] = "float",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "bird",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/birds",
                ["segments"] = {
                  {
                    ["lit"] = "birds",
                  },
                },
                ["parts"] = {
                  "birds",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 10,
                    },
                    {
                      ["name"] = "order",
                      ["orig"] = "order",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "asc",
                    },
                    {
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "search",
                      ["orig"] = "search",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "sort",
                      ["orig"] = "sort",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "limit",
                    "order",
                    "page",
                    "search",
                    "sort",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/birds/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "birds",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "birds",
                  "{id}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
