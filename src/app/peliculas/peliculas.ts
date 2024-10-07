import { actorAutocompleteDTO } from "../actores/actores";
import { CineDTO } from "../cines/cines";
import { GeneroDto } from "../generos/generos";

export interface PeliculaDTO {
    id: number;
    titulo: string;
    fechaLanzamiento: Date;
    trailer: string;
    poster?: string;
    generos?: GeneroDto[];
    cines?: CineDTO[];
    actores: actorAutocompleteDTO[];
}

export interface PeliculaCreacionDTO {
    titulo: string;
    fechaLanzamiento: Date;
    trailer: string;
    poster?: File
    generosIds?: number[];
    cinesIds?: number[];
    actores?: actorAutocompleteDTO[];
}

export interface PeliculasPostGetDTO {
    generos: GeneroDto[];
    cines: CineDTO[];
}

export interface LandingPageDTO {
    enCines: PeliculaDTO[];
    proximosEstrenos: PeliculaDTO[];
}

export interface PeliculasPutGetDTO {
    pelicula: PeliculaDTO;
    generosSeleccionados: GeneroDto[];
    generosNoSeleccionados: GeneroDto[];
    cinesSeleccionados: CineDTO[];
    cinesNoSeleccionados: CineDTO[];
    actores: actorAutocompleteDTO[];
}