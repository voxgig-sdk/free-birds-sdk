package = "voxgig-sdk-free-birds"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/free-birds-sdk.git"
}
description = {
  summary = "FreeBirds SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["free-birds_sdk"] = "free-birds_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
