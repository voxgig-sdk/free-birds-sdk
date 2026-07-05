# frozen_string_literal: true

# Typed models for the FreeBirds SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Bird entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] diet
#   @return [String, nil]
#
# @!attribute [rw] family
#   @return [String, nil]
#
# @!attribute [rw] habitat
#   @return [String, nil]
#
# @!attribute [rw] height_cm
#   @return [Float, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] place_of_found
#   @return [String, nil]
#
# @!attribute [rw] species
#   @return [String, nil]
#
# @!attribute [rw] weight_kg
#   @return [Float, nil]
Bird = Struct.new(
  :description,
  :diet,
  :family,
  :habitat,
  :height_cm,
  :id,
  :image,
  :name,
  :place_of_found,
  :species,
  :weight_kg,
  keyword_init: true
)

# Request payload for Bird#load.
#
# @!attribute [rw] id
#   @return [Integer]
BirdLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Bird#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] diet
#   @return [String, nil]
#
# @!attribute [rw] family
#   @return [String, nil]
#
# @!attribute [rw] habitat
#   @return [String, nil]
#
# @!attribute [rw] height_cm
#   @return [Float, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] place_of_found
#   @return [String, nil]
#
# @!attribute [rw] species
#   @return [String, nil]
#
# @!attribute [rw] weight_kg
#   @return [Float, nil]
BirdListMatch = Struct.new(
  :description,
  :diet,
  :family,
  :habitat,
  :height_cm,
  :id,
  :image,
  :name,
  :place_of_found,
  :species,
  :weight_kg,
  keyword_init: true
)

