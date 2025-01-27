import { ApiClient } from "../utils/apiHandler";
import { MovieType } from "../utils/types";

export function Trailer(movie:MovieType) {
    const trailer = document.createElement('div')
    const img = document.createElement('img')
    const h1 = document.createElement('h1')

    trailer.classList.add('trailer')
    img.src = `${import.meta.env.VITE_PUBLIC_BASE_POSTER_URL + movie.poster_path}`;

    h1.innerText = movie.title

    trailer.append(img,h1)

    trailer.onclick = async () =>{
        const apiCall = new ApiClient(import.meta.env.VITE_PUBLIC_BASE_URL)
        const videos = await apiCall.read(`movie/${movie.id}/videos`) as any

        const trailer = videos.results.find((item:any) => item.type === "Trailer")
        const iframe = document.querySelector('iframe') as any
        const title =  document.querySelector('#trailer_title') as any
        iframe.src = `https://www.youtube.com/embed/${trailer.key}`
        title.innerHTML = movie.title
    }


    return trailer

}