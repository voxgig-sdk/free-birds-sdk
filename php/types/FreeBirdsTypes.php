<?php
declare(strict_types=1);

// Typed models for the FreeBirds SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Bird entity data model. */
class Bird
{
    public ?string $description = null;
    public ?string $diet = null;
    public ?string $family = null;
    public ?string $habitat = null;
    public ?float $height_cm = null;
    public ?int $id = null;
    public ?string $image = null;
    public ?string $name = null;
    public ?string $place_of_found = null;
    public ?string $species = null;
    public ?float $weight_kg = null;
}

/** Request payload for Bird#load. */
class BirdLoadMatch
{
    public int $id;
}

/** Match filter for Bird#list (any subset of Bird fields). */
class BirdListMatch
{
    public ?string $description = null;
    public ?string $diet = null;
    public ?string $family = null;
    public ?string $habitat = null;
    public ?float $height_cm = null;
    public ?int $id = null;
    public ?string $image = null;
    public ?string $name = null;
    public ?string $place_of_found = null;
    public ?string $species = null;
    public ?float $weight_kg = null;
}

