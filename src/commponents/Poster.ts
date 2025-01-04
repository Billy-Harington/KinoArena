import { PostersType } from "../utils/types";

const movie_main_poster = document.querySelector('.movie_poster') as HTMLImageElement

export function Poster(item:PostersType) {
    const poster = document.createElement('div')
    const movie_poster = document.createElement('div')

    poster.classList.add('poster')
    movie_poster.classList.add('movie_poster')

    movie_poster.style.background = ` url(${import.meta.env.VITE_PUBLIC_BASE_POSTER_URL +item.file_path})no-repeat center /cover`

    movie_main_poster.src = import.meta.env.VITE_PUBLIC_BASE_POSTER_URL + item.file_path
    
    poster.append(movie_poster)

    return poster
}