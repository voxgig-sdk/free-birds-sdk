package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBirdEntityFunc func(client *FreeBirdsSDK, entopts map[string]any) FreeBirdsEntity

