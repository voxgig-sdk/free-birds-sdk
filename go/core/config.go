package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "FreeBirds",
			"slug": "free-birds",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://freetestapi.com/api/v1",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"bird": map[string]any{},
			},
		},
		"entity": map[string]any{
			"bird": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "Detailed description of the bird",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "diet",
						"short": "Primary diet of the bird",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "family",
						"short": "Bird family classification",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "habitat",
						"short": "Primary habitat of the bird",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "height_cm",
						"short": "Average height in centimeters",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the bird",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "image",
						"short": "URL to an image of the bird",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Common name of the bird",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "place_of_found",
						"short": "Geographic location where the bird is commonly found",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "species",
						"short": "Scientific species name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "weight_kg",
						"short": "Average weight in kilograms",
						"type": "`$NUMBER`",
					},
				},
				"name": "bird",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "asc",
											"kind": "query",
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/birds",
								"parts": []any{
									"birds",
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"order",
										"page",
										"search",
										"sort",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/birds/{id}",
								"parts": []any{
									"birds",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
