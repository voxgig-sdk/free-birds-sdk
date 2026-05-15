package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/free-birds-sdk"
	"github.com/voxgig-sdk/free-birds-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestBirdEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Bird(nil)
		if ent == nil {
			t.Fatal("expected non-nil BirdEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := birdBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "bird." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set FREEBIRDS_TEST_BIRD_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		birdRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.bird", setup.data)))
		var birdRef01Data map[string]any
		if len(birdRef01DataRaw) > 0 {
			birdRef01Data = core.ToMapAny(birdRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = birdRef01Data

		// LIST
		birdRef01Ent := client.Bird(nil)
		birdRef01Match := map[string]any{}

		birdRef01ListResult, err := birdRef01Ent.List(birdRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, birdRef01ListOk := birdRef01ListResult.([]any)
		if !birdRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", birdRef01ListResult)
		}

		// LOAD
		birdRef01MatchDt0 := map[string]any{
			"id": birdRef01Data["id"],
		}
		birdRef01DataDt0Loaded, err := birdRef01Ent.Load(birdRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		birdRef01DataDt0LoadResult := core.ToMapAny(birdRef01DataDt0Loaded)
		if birdRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if birdRef01DataDt0LoadResult["id"] != birdRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func birdBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "bird", "BirdTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read bird test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse bird test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"bird01", "bird02", "bird03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("FREEBIRDS_TEST_BIRD_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"FREEBIRDS_TEST_BIRD_ENTID": idmap,
		"FREEBIRDS_TEST_LIVE":      "FALSE",
		"FREEBIRDS_TEST_EXPLAIN":   "FALSE",
		"FREEBIRDS_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["FREEBIRDS_TEST_BIRD_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["FREEBIRDS_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["FREEBIRDS_APIKEY"],
			},
			extra,
		})
		client = sdk.NewFreeBirdsSDK(core.ToMapAny(mergedOpts))
	}

	live := env["FREEBIRDS_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["FREEBIRDS_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
