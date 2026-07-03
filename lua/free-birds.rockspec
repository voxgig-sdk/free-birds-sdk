package = "voxgig-sdk-free-birds"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/free-birds-sdk.git",
  tag = "lua/v0.0.1",
  dir = "free-birds-sdk/lua"
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
