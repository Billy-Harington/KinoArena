import { MovieType } from "../utils/types";

export function name(item:MovieType) {
    const movie = document.createElement('div')
    const movie_poster = document.createElement('div')
    const movie_data = document.createElement('div')
    const movie_rating = document.createElement('div')
    const btn = document.createElement('button')
    const h1 = document.createElement('h1')
    const p = document.createElement('p')


    movie.classList.add('movie')
    movie_poster.classList.add('movie_poster')
    movie_data.classList.add('movie_data')
    movie_rating.classList.add('movie_rating')
    btn.classList.add('movie_button')

    movie_poster.style.background = `url(${item.poster})no-repeat center /cover;`
    h1.innerText = item.title
    p.innerText = item.jenre
    movie_rating.innerText = item.ratings

    movie.append(movie_poster,movie_data,movie_rating)
    movie_poster.append(btn)
    movie_data.append(h1,p)

    movie.onclick = ()=>{
        location.assign("/src/pages/movie_page/")
    }

    return movie
}