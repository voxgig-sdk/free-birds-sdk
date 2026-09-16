

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FreeBirdsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('BirdEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FREE_BIRDS_TEST_LIVE=TRUE.
  afterEach(liveDelay('FREE_BIRDS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FreeBirdsSDK.test()
    const ent = testsdk.Bird()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FREE_BIRDS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'bird.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"description","req":false,"short":"Detailed description of the bird","type":"`$STRING`","index$":0},{"active":true,"name":"diet","req":false,"short":"Primary diet of the bird","type":"`$STRING`","index$":1},{"active":true,"name":"family","req":false,"short":"Bird family classification","type":"`$STRING`","index$":2},{"active":true,"name":"habitat","req":false,"short":"Primary habitat of the bird","type":"`$STRING`","index$":3},{"active":true,"format":"float","name":"height_cm","req":false,"short":"Average height in centimeters","type":"`$NUMBER`","index$":4},{"active":true,"format":"int64","name":"id","req":false,"short":"Unique identifier for the bird","type":"`$INTEGER`","index$":5},{"active":true,"format":"uri","name":"image","req":false,"short":"URL to an image of the bird","type":"`$STRING`","index$":6},{"active":true,"name":"name","req":false,"short":"Common name of the bird","type":"`$STRING`","index$":7},{"active":true,"name":"place_of_found","req":false,"short":"Geographic location where the bird is commonly found","type":"`$STRING`","index$":8},{"active":true,"name":"species","req":false,"short":"Scientific species name","type":"`$STRING`","index$":9},{"active":true,"format":"float","name":"weight_kg","req":false,"short":"Average weight in kilograms","type":"`$NUMBER`","index$":10}],"id":{"field":"id","name":"id"},"name":"bird","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":10,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":"asc","kind":"query","name":"order","orig":"order","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":2},{"active":true,"kind":"query","name":"search","orig":"search","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"kind":"query","name":"sort","orig":"sort","reqd":false,"type":"`$STRING`","index$":4}]},"contract":{"id":"GET /birds","json":"{\"operationId\":\"getBirds\",\"parameters\":[{\"description\":\"Search term to filter birds by name or other attributes\",\"in\":\"query\",\"name\":\"search\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Field to sort results by\",\"in\":\"query\",\"name\":\"sort\",\"required\":false,\"schema\":{\"enum\":[\"name\",\"species\",\"family\",\"habitat\"],\"type\":\"string\"}},{\"description\":\"Sort order\",\"in\":\"query\",\"name\":\"order\",\"required\":false,\"schema\":{\"default\":\"asc\",\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"}},{\"description\":\"Maximum number of results to return\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":10,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"description\":{\"description\":\"Detailed description of the bird\",\"example\":\"A migratory songbird with a distinctive orange-red breast\",\"type\":\"string\"},\"diet\":{\"description\":\"Primary diet of the bird\",\"example\":\"Insects, fruits, berries\",\"type\":\"string\"},\"family\":{\"description\":\"Bird family classification\",\"example\":\"Turdidae\",\"type\":\"string\"},\"habitat\":{\"description\":\"Primary habitat of the bird\",\"example\":\"Woodlands, gardens, parks\",\"type\":\"string\"},\"height_cm\":{\"description\":\"Average height in centimeters\",\"example\":25,\"format\":\"float\",\"type\":\"number\"},\"id\":{\"description\":\"Unique identifier for the bird\",\"example\":1,\"format\":\"int64\",\"type\":\"integer\"},\"image\":{\"description\":\"URL to an image of the bird\",\"example\":\"https://example.com/images/american-robin.jpg\",\"format\":\"uri\",\"type\":\"string\"},\"name\":{\"description\":\"Common name of the bird\",\"example\":\"American Robin\",\"type\":\"string\"},\"place_of_found\":{\"description\":\"Geographic location where the bird is commonly found\",\"example\":\"North America\",\"type\":\"string\"},\"species\":{\"description\":\"Scientific species name\",\"example\":\"Turdus migratorius\",\"type\":\"string\"},\"weight_kg\":{\"description\":\"Average weight in kilograms\",\"example\":0.077,\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/birds","segments":[{"lit":"birds"}],"select":{"exist":["limit","order","page","search","sort"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /birds/{id}","json":"{\"operationId\":\"getBirdById\",\"parameters\":[{\"description\":\"Unique identifier of the bird\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"format\":\"int64\",\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"description\":{\"description\":\"Detailed description of the bird\",\"example\":\"A migratory songbird with a distinctive orange-red breast\",\"type\":\"string\"},\"diet\":{\"description\":\"Primary diet of the bird\",\"example\":\"Insects, fruits, berries\",\"type\":\"string\"},\"family\":{\"description\":\"Bird family classification\",\"example\":\"Turdidae\",\"type\":\"string\"},\"habitat\":{\"description\":\"Primary habitat of the bird\",\"example\":\"Woodlands, gardens, parks\",\"type\":\"string\"},\"height_cm\":{\"description\":\"Average height in centimeters\",\"example\":25,\"format\":\"float\",\"type\":\"number\"},\"id\":{\"description\":\"Unique identifier for the bird\",\"example\":1,\"format\":\"int64\",\"type\":\"integer\"},\"image\":{\"description\":\"URL to an image of the bird\",\"example\":\"https://example.com/images/american-robin.jpg\",\"format\":\"uri\",\"type\":\"string\"},\"name\":{\"description\":\"Common name of the bird\",\"example\":\"American Robin\",\"type\":\"string\"},\"place_of_found\":{\"description\":\"Geographic location where the bird is commonly found\",\"example\":\"North America\",\"type\":\"string\"},\"species\":{\"description\":\"Scientific species name\",\"example\":\"Turdus migratorius\",\"type\":\"string\"},\"weight_kg\":{\"description\":\"Average weight in kilograms\",\"example\":0.077,\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Bird not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/birds/{id}","segments":[{"lit":"birds"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"bird","name__orig":"bird","Name":"Bird","name_":"bird","name-":"bird","NAME":"BIRD","index$":0}, {"active":true,"entity":"bird","key$":"BasicBirdFlow","kind":"basic","name":"BasicBirdFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"bird_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"bird_ref01","srcdatavar":"bird_ref01_data","suffix":"_dt0"},"match":{"id":"bird01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-bird_ref01"}}],"index$":1}]}, 'Bird')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let bird_ref01_data = Object.values(setup.data.existing.bird)[0] as any

    // LIST
    const bird_ref01_ent = client.Bird()
    const bird_ref01_match: any = {}

    const bird_ref01_list = (await bird_ref01_ent.list(bird_ref01_match)).map((e: any) => e.data())


    // LOAD
    const bird_ref01_match_dt0: any = {}
    bird_ref01_match_dt0.id = bird_ref01_data.id
    const bird_ref01_data_dt0 = (await bird_ref01_ent.load(bird_ref01_match_dt0)).data()
    assert(bird_ref01_data_dt0.id === bird_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/bird/BirdTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = FreeBirdsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['bird01','bird02','bird03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FREE_BIRDS_TEST_BIRD_ENTID': idmap,
    'FREE_BIRDS_TEST_LIVE': 'FALSE',
    'FREE_BIRDS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FREE_BIRDS_TEST_BIRD_ENTID']

  const live = 'TRUE' === env.FREE_BIRDS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FREE_BIRDS_TEST_BIRD_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new FreeBirdsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.FREE_BIRDS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
