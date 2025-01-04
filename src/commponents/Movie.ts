import { MovieType } from "../utils/types";

export function Movie(item: MovieType) {




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


    btn.innerText = "Карточка Фильма"
    movie_poster.style.background = `url(${import.meta.env.VITE_PUBLIC_BASE_POSTER_URL + item.poster_path}) no-repeat center / contain`;
    h1.innerText = item.title




   
    movie_rating.innerHTML = item.vote_average

    movie.append(movie_poster, movie_data, movie_rating)
    movie_poster.append(btn)
    movie_data.append(h1, p)

    movie.onclick = () => {
        const movieId = item.id
        console.log(movieId);
        
        location.assign(`src/pages/movie_page/?id=${movieId}`)
    }

    return movie
}