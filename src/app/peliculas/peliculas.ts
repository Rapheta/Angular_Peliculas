import { actorAutocompleteDTO } from "../actores/actores";
import { CineDTO } from "../cines/cines";
import { GeneroDto } from "../generos/generos";

export interface PeliculaDTO {
    id: number;
    titulo: string;
    fechaLanzamiento: Date;
    trailer: string;
    poster?: string
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