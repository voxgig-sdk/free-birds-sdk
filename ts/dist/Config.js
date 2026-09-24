"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'FreeBirds',
        slug: "free-birds",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://freetestapi.com/api/v1",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            bird: {},
        }
    };
    entity = {
        "bird": {
            "fields": [
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "short": "Detailed description of the bird"
                },
                {
                    "name": "diet",
                    "title": "Diet",
                    "type": "`$STRING`",
                    "short": "Primary diet of the bird"
                },
                {
                    "name": "family",
                    "title": "Family",
                    "type": "`$STRING`",
                    "short": "Bird family classification"
                },
                {
                    "name": "habitat",
                    "title": "Habitat",
                    "type": "`$STRING`",
                    "short": "Primary habitat of the bird"
                },
                {
                    "name": "height_cm",
                    "title": "Height Cm",
                    "type": "`$NUMBER`",
                    "short": "Average height in centimeters",
                    "format": "float"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$INTEGER`",
                    "short": "Unique identifier for the bird",
                    "format": "int64"
                },
                {
                    "name": "image",
                    "title": "Image",
                    "type": "`$STRING`",
                    "short": "URL to an image of the bird",
                    "format": "uri"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "short": "Common name of the bird"
                },
                {
                    "name": "place_of_found",
                    "title": "Place Of Found",
                    "type": "`$STRING`",
                    "short": "Geographic location where the bird is commonly found"
                },
                {
                    "name": "species",
                    "title": "Species",
                    "type": "`$STRING`",
                    "short": "Scientific species name"
                },
                {
                    "name": "weight_kg",
                    "title": "Weight Kg",
                    "type": "`$NUMBER`",
                    "short": "Average weight in kilograms",
                    "format": "float"
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/birds",
                            "segments": [
                                {
                                    "lit": "birds"
                                }
                            ],
                            "parts": [
                                "birds"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    },
                                    {
                                        "name": "order",
                                        "orig": "order",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "asc"
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "search",
                                        "orig": "search",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sort",
                                        "orig": "sort",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "limit",
                                    "order",
                                    "page",
                                    "search",
                                    "sort"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
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
                            "parts": [
                                "birds",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map