// Typed models for the FreeBirds SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Bird {
  description?: string
  diet?: string
  family?: string
  habitat?: string
  height_cm?: number
  id?: number
  image?: string
  name?: string
  place_of_found?: string
  species?: string
  weight_kg?: number
}

export interface BirdLoadMatch {
  id: number
}

export interface BirdListMatch {
  description?: string
  diet?: string
  family?: string
  habitat?: string
  height_cm?: number
  id?: number
  image?: string
  name?: string
  place_of_found?: string
  species?: string
  weight_kg?: number
}

