<?php
declare(strict_types=1);

// FreeBirds SDK configuration

class FreeBirdsConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "FreeBirds",
                "slug" => "free-birds",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://freetestapi.com/api/v1",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "bird" => [],
                ],
            ],
            "entity" => [
        'bird' => [
          'fields' => [
            [
              'name' => 'description',
              'short' => 'Detailed description of the bird',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'diet',
              'short' => 'Primary diet of the bird',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'family',
              'short' => 'Bird family classification',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'habitat',
              'short' => 'Primary habitat of the bird',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'float',
              'name' => 'height_cm',
              'short' => 'Average height in centimeters',
              'type' => '`$NUMBER`',
            ],
            [
              'format' => 'int64',
              'name' => 'id',
              'short' => 'Unique identifier for the bird',
              'type' => '`$INTEGER`',
            ],
            [
              'format' => 'uri',
              'name' => 'image',
              'short' => 'URL to an image of the bird',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Common name of the bird',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'place_of_found',
              'short' => 'Geographic location where the bird is commonly found',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'species',
              'short' => 'Scientific species name',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'float',
              'name' => 'weight_kg',
              'short' => 'Average weight in kilograms',
              'type' => '`$NUMBER`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'bird',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 10,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 'asc',
                        'kind' => 'query',
                        'name' => 'order',
                        'orig' => 'order',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'search',
                        'orig' => 'search',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'sort',
                        'orig' => 'sort',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/birds',
                  'segments' => [
                    [
                      'lit' => 'birds',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'order',
                      'page',
                      'search',
                      'sort',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'birds',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/birds/{id}',
                  'segments' => [
                    [
                      'lit' => 'birds',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'birds',
                    '{id}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return FreeBirdsFeatures::make_feature($name);
    }
}
