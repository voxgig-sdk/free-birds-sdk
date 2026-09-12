export interface Bird {
    description?: string;
    diet?: string;
    family?: string;
    habitat?: string;
    height_cm?: number;
    id?: number;
    image?: string;
    name?: string;
    place_of_found?: string;
    species?: string;
    weight_kg?: number;
}
export interface BirdLoadMatch {
    id: number;
}
export interface BirdListMatch {
    limit?: number;
    order?: string;
    page?: number;
    search?: string;
    sort?: string;
}
