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
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["short"] = "Detailed description of the bird",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "diet",
            ["short"] = "Primary diet of the bird",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "family",
            ["short"] = "Bird family classification",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "habitat",
            ["short"] = "Primary habitat of the bird",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "height_cm",
            ["short"] = "Average height in centimeters",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "id",
            ["short"] = "Unique identifier for the bird",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "image",
            ["short"] = "URL to an image of the bird",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["short"] = "Common name of the bird",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "place_of_found",
            ["short"] = "Geographic location where the bird is commonly found",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "species",
            ["short"] = "Scientific species name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "weight_kg",
            ["short"] = "Average weight in kilograms",
            ["type"] = "`$NUMBER`",
          },
        },
        ["name"] = "bird",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 10,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = "asc",
                      ["kind"] = "query",
                      ["name"] = "order",
                      ["orig"] = "order",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "search",
                      ["orig"] = "search",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "sort",
                      ["orig"] = "sort",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/birds",
                ["parts"] = {
                  "birds",
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
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/birds/{id}",
                ["parts"] = {
                  "birds",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
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
