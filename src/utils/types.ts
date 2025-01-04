export type ReloadProps<T> = {
    arr: Array<T>;
    commponent: (item: T) => HTMLElement;
    place: HTMLElement;
};


export type MovieType = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: any;
    vote_count: number;
};

export type ActorsType = {
    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: any,
    profile_path: string,
    cast_id: number,
    character: string,
    credit_id: string,
    order: number
}
export type PostersType = {
    aspect_ratio: any,
    height: number,
    iso_639_1: null,
    file_path: string,
    vote_average: any,
    vote_count: number,
    width: number
}

