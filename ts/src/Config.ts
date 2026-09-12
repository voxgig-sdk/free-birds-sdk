
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'FreeBirds',
        slug: "free-birds",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://freetestapi.com/api/v1",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      bird: {
      },

    }
  }


  entity = {
    "bird": {
      "fields": [
        {
          "name": "description",
          "short": "Detailed description of the bird",
          "type": "`$STRING`"
        },
        {
          "name": "diet",
          "short": "Primary diet of the bird",
          "type": "`$STRING`"
        },
        {
          "name": "family",
          "short": "Bird family classification",
          "type": "`$STRING`"
        },
        {
          "name": "habitat",
          "short": "Primary habitat of the bird",
          "type": "`$STRING`"
        },
        {
          "format": "float",
          "name": "height_cm",
          "short": "Average height in centimeters",
          "type": "`$NUMBER`"
        },
        {
          "format": "int64",
          "name": "id",
          "short": "Unique identifier for the bird",
          "type": "`$INTEGER`"
        },
        {
          "format": "uri",
          "name": "image",
          "short": "URL to an image of the bird",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "short": "Common name of the bird",
          "type": "`$STRING`"
        },
        {
          "name": "place_of_found",
          "short": "Geographic location where the bird is commonly found",
          "type": "`$STRING`"
        },
        {
          "name": "species",
          "short": "Scientific species name",
          "type": "`$STRING`"
        },
        {
          "format": "float",
          "name": "weight_kg",
          "short": "Average weight in kilograms",
          "type": "`$NUMBER`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "asc",
                    "kind": "query",
                    "name": "order",
                    "orig": "order",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/birds",
              "segments": [
                {
                  "lit": "birds"
                }
              ],
              "select": {
                "exist": [
                  "limit",
                  "order",
                  "page",
                  "search",
                  "sort"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "birds"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/birds/{id}",
              "segments": [
                {
                  "lit": "birds"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "birds",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

