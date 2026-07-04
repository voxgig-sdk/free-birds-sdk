-- Typed models for the FreeBirds SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Bird
---@field description? string
---@field diet? string
---@field family? string
---@field habitat? string
---@field height_cm? number
---@field id? number
---@field image? string
---@field name? string
---@field place_of_found? string
---@field species? string
---@field weight_kg? number

---@class BirdLoadMatch
---@field id number

---@class BirdListMatch

local M = {}

return M
