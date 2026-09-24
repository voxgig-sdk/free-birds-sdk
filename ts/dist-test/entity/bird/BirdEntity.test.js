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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Detailed description of the bird", "t": "`$STRING`", "key$": "description", "index$": 0 }, "diet": { "a": true, "h": "Diet", "n": "diet", "r": false, "sh": "Primary diet of the bird", "t": "`$STRING`", "key$": "diet", "index$": 1 }, "family": { "a": true, "h": "Family", "n": "family", "r": false, "sh": "Bird family classification", "t": "`$STRING`", "key$": "family", "index$": 2 }, "habitat": { "a": true, "h": "Habitat", "n": "habitat", "r": false, "sh": "Primary habitat of the bird", "t": "`$STRING`", "key$": "habitat", "index$": 3 }, "height_cm": { "a": true, "fo": "float", "h": "Height Cm", "n": "height_cm", "r": false, "sh": "Average height in centimeters", "t": "`$NUMBER`", "key$": "height_cm", "index$": 4 }, "id": { "a": true, "fo": "int64", "h": "Id", "n": "id", "r": false, "sh": "Unique identifier for the bird", "t": "`$INTEGER`", "key$": "id", "index$": 5 }, "image": { "a": true, "fo": "uri", "h": "Image", "n": "image", "r": false, "sh": "URL to an image of the bird", "t": "`$STRING`", "key$": "image", "index$": 6 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Common name of the bird", "t": "`$STRING`", "key$": "name", "index$": 7 }, "place_of_found": { "a": true, "h": "Place Of Found", "n": "place_of_found", "r": false, "sh": "Geographic location where the bird is commonly found", "t": "`$STRING`", "key$": "place_of_found", "index$": 8 }, "species": { "a": true, "h": "Species", "n": "species", "r": false, "sh": "Scientific species name", "t": "`$STRING`", "key$": "species", "index$": 9 }, "weight_kg": { "a": true, "fo": "float", "h": "Weight Kg", "n": "weight_kg", "r": false, "sh": "Average weight in kilograms", "t": "`$NUMBER`", "key$": "weight_kg", "index$": 10 } }, "id": { "field": "id", "name": "id" }, "name": "bird", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /birds", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 10, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": "asc", "k": "query", "n": "order", "or": "order", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/birds", "q": { "exist": ["limit", "order", "page", "search", "sort"] }, "r": {}, "s": [{ "lit": "birds" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /birds/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/birds/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "birds" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "bird", "name__orig": "bird", "Name": "Bird", "name_": "bird", "name-": "bird", "NAME": "BIRD", "index$": 0 }, { "active": true, "entity": "bird", "key$": "BasicBirdFlow", "kind": "basic", "name": "BasicBirdFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "bird_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "bird_ref01", "srcdatavar": "bird_ref01_data", "suffix": "_dt0" }, "m": { "id": "bird01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-bird_ref01" } }], "index$": 1 }] }, 'Bird', { "GET /birds": { "protocol": "http", "operationId": "getBirds", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "id": { "type": "integer", "format": "int64", "description": "Unique identifier for the bird", "example": 1, "key$": "id" }, "name": { "type": "string", "description": "Common name of the bird", "example": "American Robin", "key$": "name" }, "species": { "type": "string", "description": "Scientific species name", "example": "Turdus migratorius", "key$": "species" }, "family": { "type": "string", "description": "Bird family classification", "example": "Turdidae", "key$": "family" }, "habitat": { "type": "string", "description": "Primary habitat of the bird", "example": "Woodlands, gardens, parks", "key$": "habitat" }, "place_of_found": { "type": "string", "description": "Geographic location where the bird is commonly found", "example": "North America", "key$": "place_of_found" }, "diet": { "type": "string", "description": "Primary diet of the bird", "example": "Insects, fruits, berries", "key$": "diet" }, "description": { "type": "string", "description": "Detailed description of the bird", "example": "A migratory songbird with a distinctive orange-red breast", "key$": "description" }, "weight_kg": { "type": "number", "format": "float", "description": "Average weight in kilograms", "example": 0.077, "key$": "weight_kg" }, "height_cm": { "type": "number", "format": "float", "description": "Average height in centimeters", "example": 25, "key$": "height_cm" }, "image": { "type": "string", "format": "uri", "description": "URL to an image of the bird", "example": "https://example.com/images/american-robin.jpg", "key$": "image" } }, "x-ref": "#/components/schemas/Bird", "index$": 0 } } } } }, "400": { "description": "Bad request - Invalid parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "message": { "type": "string", "description": "Detailed error description" }, "statusCode": { "type": "integer", "description": "HTTP status code" } }, "x-ref": "#/components/schemas/Error" } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "message": { "type": "string", "description": "Detailed error description" }, "statusCode": { "type": "integer", "description": "HTTP status code" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "search", "in": "query", "description": "Search term to filter birds by name or other attributes", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "sort", "in": "query", "description": "Field to sort results by", "required": false, "schema": { "type": "string", "enum": ["name", "species", "family", "habitat"] }, "index$": 1 }, { "name": "order", "in": "query", "description": "Sort order", "required": false, "schema": { "type": "string", "enum": ["asc", "desc"], "default": "asc" }, "index$": 2 }, { "name": "limit", "in": "query", "description": "Maximum number of results to return", "required": false, "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 10 }, "index$": 3 }, { "name": "page", "in": "query", "description": "Page number for pagination", "required": false, "schema": { "type": "integer", "minimum": 1, "default": 1 }, "index$": 4 }], "securitySource": "unspecified" }, "GET /birds/{id}": { "protocol": "http", "operationId": "getBirdById", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "integer", "format": "int64", "description": "Unique identifier for the bird", "example": 1, "key$": "id" }, "name": { "type": "string", "description": "Common name of the bird", "example": "American Robin", "key$": "name" }, "species": { "type": "string", "description": "Scientific species name", "example": "Turdus migratorius", "key$": "species" }, "family": { "type": "string", "description": "Bird family classification", "example": "Turdidae", "key$": "family" }, "habitat": { "type": "string", "description": "Primary habitat of the bird", "example": "Woodlands, gardens, parks", "key$": "habitat" }, "place_of_found": { "type": "string", "description": "Geographic location where the bird is commonly found", "example": "North America", "key$": "place_of_found" }, "diet": { "type": "string", "description": "Primary diet of the bird", "example": "Insects, fruits, berries", "key$": "diet" }, "description": { "type": "string", "description": "Detailed description of the bird", "example": "A migratory songbird with a distinctive orange-red breast", "key$": "description" }, "weight_kg": { "type": "number", "format": "float", "description": "Average weight in kilograms", "example": 0.077, "key$": "weight_kg" }, "height_cm": { "type": "number", "format": "float", "description": "Average height in centimeters", "example": 25, "key$": "height_cm" }, "image": { "type": "string", "format": "uri", "description": "URL to an image of the bird", "example": "https://example.com/images/american-robin.jpg", "key$": "image" } }, "x-ref": "#/components/schemas/Bird", "index$": 0 } } } }, "404": { "description": "Bird not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "message": { "type": "string", "description": "Detailed error description" }, "statusCode": { "type": "integer", "description": "HTTP status code" } }, "x-ref": "#/components/schemas/Error" } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "message": { "type": "string", "description": "Detailed error description" }, "statusCode": { "type": "integer", "description": "HTTP status code" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "id", "in": "path", "description": "Unique identifier of the bird", "required": true, "schema": { "type": "integer", "format": "int64" }, "index$": 0 }], "securitySource": "unspecified" } });
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