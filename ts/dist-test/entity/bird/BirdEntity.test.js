"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('BirdEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FREE_BIRDS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FREE_BIRDS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FreeBirdsSDK.test();
        const ent = testsdk.Bird();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FREE_BIRDS_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'bird.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "description", "req": false, "short": "Detailed description of the bird", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "diet", "req": false, "short": "Primary diet of the bird", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "family", "req": false, "short": "Bird family classification", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "habitat", "req": false, "short": "Primary habitat of the bird", "type": "`$STRING`", "index$": 3 }, { "active": true, "format": "float", "name": "height_cm", "req": false, "short": "Average height in centimeters", "type": "`$NUMBER`", "index$": 4 }, { "active": true, "format": "int64", "name": "id", "req": false, "short": "Unique identifier for the bird", "type": "`$INTEGER`", "index$": 5 }, { "active": true, "format": "uri", "name": "image", "req": false, "short": "URL to an image of the bird", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "name", "req": false, "short": "Common name of the bird", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "place_of_found", "req": false, "short": "Geographic location where the bird is commonly found", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "species", "req": false, "short": "Scientific species name", "type": "`$STRING`", "index$": 9 }, { "active": true, "format": "float", "name": "weight_kg", "req": false, "short": "Average weight in kilograms", "type": "`$NUMBER`", "index$": 10 }], "id": { "field": "id", "name": "id" }, "name": "bird", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": 10, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "example": "asc", "kind": "query", "name": "order", "orig": "order", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": 1, "kind": "query", "name": "page", "orig": "page", "reqd": false, "type": "`$INTEGER`", "index$": 2 }, { "active": true, "kind": "query", "name": "search", "orig": "search", "reqd": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "kind": "query", "name": "sort", "orig": "sort", "reqd": false, "type": "`$STRING`", "index$": 4 }] }, "contract": { "id": "GET /birds", "json": "{\"operationId\":\"getBirds\",\"parameters\":[{\"description\":\"Search term to filter birds by name or other attributes\",\"in\":\"query\",\"name\":\"search\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Field to sort results by\",\"in\":\"query\",\"name\":\"sort\",\"required\":false,\"schema\":{\"enum\":[\"name\",\"species\",\"family\",\"habitat\"],\"type\":\"string\"}},{\"description\":\"Sort order\",\"in\":\"query\",\"name\":\"order\",\"required\":false,\"schema\":{\"default\":\"asc\",\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"}},{\"description\":\"Maximum number of results to return\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":10,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"description\":{\"description\":\"Detailed description of the bird\",\"example\":\"A migratory songbird with a distinctive orange-red breast\",\"type\":\"string\"},\"diet\":{\"description\":\"Primary diet of the bird\",\"example\":\"Insects, fruits, berries\",\"type\":\"string\"},\"family\":{\"description\":\"Bird family classification\",\"example\":\"Turdidae\",\"type\":\"string\"},\"habitat\":{\"description\":\"Primary habitat of the bird\",\"example\":\"Woodlands, gardens, parks\",\"type\":\"string\"},\"height_cm\":{\"description\":\"Average height in centimeters\",\"example\":25,\"format\":\"float\",\"type\":\"number\"},\"id\":{\"description\":\"Unique identifier for the bird\",\"example\":1,\"format\":\"int64\",\"type\":\"integer\"},\"image\":{\"description\":\"URL to an image of the bird\",\"example\":\"https://example.com/images/american-robin.jpg\",\"format\":\"uri\",\"type\":\"string\"},\"name\":{\"description\":\"Common name of the bird\",\"example\":\"American Robin\",\"type\":\"string\"},\"place_of_found\":{\"description\":\"Geographic location where the bird is commonly found\",\"example\":\"North America\",\"type\":\"string\"},\"species\":{\"description\":\"Scientific species name\",\"example\":\"Turdus migratorius\",\"type\":\"string\"},\"weight_kg\":{\"description\":\"Average weight in kilograms\",\"example\":0.077,\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/birds", "segments": [{ "lit": "birds" }], "select": { "exist": ["limit", "order", "page", "search", "sort"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /birds/{id}", "json": "{\"operationId\":\"getBirdById\",\"parameters\":[{\"description\":\"Unique identifier of the bird\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"format\":\"int64\",\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"description\":{\"description\":\"Detailed description of the bird\",\"example\":\"A migratory songbird with a distinctive orange-red breast\",\"type\":\"string\"},\"diet\":{\"description\":\"Primary diet of the bird\",\"example\":\"Insects, fruits, berries\",\"type\":\"string\"},\"family\":{\"description\":\"Bird family classification\",\"example\":\"Turdidae\",\"type\":\"string\"},\"habitat\":{\"description\":\"Primary habitat of the bird\",\"example\":\"Woodlands, gardens, parks\",\"type\":\"string\"},\"height_cm\":{\"description\":\"Average height in centimeters\",\"example\":25,\"format\":\"float\",\"type\":\"number\"},\"id\":{\"description\":\"Unique identifier for the bird\",\"example\":1,\"format\":\"int64\",\"type\":\"integer\"},\"image\":{\"description\":\"URL to an image of the bird\",\"example\":\"https://example.com/images/american-robin.jpg\",\"format\":\"uri\",\"type\":\"string\"},\"name\":{\"description\":\"Common name of the bird\",\"example\":\"American Robin\",\"type\":\"string\"},\"place_of_found\":{\"description\":\"Geographic location where the bird is commonly found\",\"example\":\"North America\",\"type\":\"string\"},\"species\":{\"description\":\"Scientific species name\",\"example\":\"Turdus migratorius\",\"type\":\"string\"},\"weight_kg\":{\"description\":\"Average weight in kilograms\",\"example\":0.077,\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Bird not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/birds/{id}", "segments": [{ "lit": "birds" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "bird", "name__orig": "bird", "Name": "Bird", "name_": "bird", "name-": "bird", "NAME": "BIRD", "index$": 0 }, { "active": true, "entity": "bird", "key$": "BasicBirdFlow", "kind": "basic", "name": "BasicBirdFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "bird_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "bird_ref01", "srcdatavar": "bird_ref01_data", "suffix": "_dt0" }, "match": { "id": "bird01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-bird_ref01" } }], "index$": 1 }] }, 'Bird');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let bird_ref01_data = Object.values(setup.data.existing.bird)[0];
        // LIST
        const bird_ref01_ent = client.Bird();
        const bird_ref01_match = {};
        const bird_ref01_list = (await bird_ref01_ent.list(bird_ref01_match)).map((e) => e.data());
        // LOAD
        const bird_ref01_match_dt0 = {};
        bird_ref01_match_dt0.id = bird_ref01_data.id;
        const bird_ref01_data_dt0 = (await bird_ref01_ent.load(bird_ref01_match_dt0)).data();
        (0, node_assert_1.default)(bird_ref01_data_dt0.id === bird_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/bird/BirdTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FreeBirdsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['bird01', 'bird02', 'bird03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FREE_BIRDS_TEST_BIRD_ENTID': idmap,
        'FREE_BIRDS_TEST_LIVE': 'FALSE',
        'FREE_BIRDS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['FREE_BIRDS_TEST_BIRD_ENTID'];
    const live = 'TRUE' === env.FREE_BIRDS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FREE_BIRDS_TEST_BIRD_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.FreeBirdsSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=BirdEntity.test.js.map