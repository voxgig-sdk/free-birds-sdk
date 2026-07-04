# Typed models for the FreeBirds SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Bird:
    description: Optional[str] = None
    diet: Optional[str] = None
    family: Optional[str] = None
    habitat: Optional[str] = None
    height_cm: Optional[float] = None
    id: Optional[int] = None
    image: Optional[str] = None
    name: Optional[str] = None
    place_of_found: Optional[str] = None
    species: Optional[str] = None
    weight_kg: Optional[float] = None


@dataclass
class BirdLoadMatch:
    id: int


@dataclass
class BirdListMatch:
    description: Optional[str] = None
    diet: Optional[str] = None
    family: Optional[str] = None
    habitat: Optional[str] = None
    height_cm: Optional[float] = None
    id: Optional[int] = None
    image: Optional[str] = None
    name: Optional[str] = None
    place_of_found: Optional[str] = None
    species: Optional[str] = None
    weight_kg: Optional[float] = None

