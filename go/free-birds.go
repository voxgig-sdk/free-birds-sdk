package voxgigfreebirdssdk

import (
	"github.com/voxgig-sdk/free-birds-sdk/core"
	"github.com/voxgig-sdk/free-birds-sdk/entity"
	"github.com/voxgig-sdk/free-birds-sdk/feature"
	_ "github.com/voxgig-sdk/free-birds-sdk/utility"
)

// Type aliases preserve external API.
type FreeBirdsSDK = core.FreeBirdsSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type FreeBirdsEntity = core.FreeBirdsEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type FreeBirdsError = core.FreeBirdsError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewBirdEntityFunc = func(client *core.FreeBirdsSDK, entopts map[string]any) core.FreeBirdsEntity {
		return entity.NewBirdEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewFreeBirdsSDK = core.NewFreeBirdsSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
