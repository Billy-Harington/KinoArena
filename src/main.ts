import { Movie } from "./commponents/Movie";
import { Trailer } from "./commponents/Trailer";
import { ApiClient } from "./utils/apiHandler";
import { reload } from "./utils/reload";
import { search } from "./utils/search";


search() 

const apiCall = new ApiClient(import.meta.env.VITE_PUBLIC_BASE_URL)

//Popular movies
const popular_movies = await apiCall.read('/movie/top_rated') as any
const popular_place = document.querySelector('.popular_movies_container') as HTMLElement
reload({arr: popular_movies.results.slice(0, 4),commponent:Movie,place:popular_place})

//Current movies
const current_movies = await apiCall.read('/movie/now_playing') as any
const current_place = document.querySelector('.movies_container') as HTMLElement
reload({arr: current_movies.results.slice(0, 8),commponent:Movie,place:current_place})




//Awaited movies
const awaited_movies = await apiCall.read('/movie/upcoming') as any
const awaited_place = document.querySelector('#awaited') as HTMLElement
reload({arr: awaited_movies.results.slice(0, 8),commponent:Movie,place:awaited_place})

const trailers_place = document.querySelector('.trailers_container') as HTMLElement
reload({arr: awaited_movies.results.slice(0, 20),commponent:Trailer,place:trailers_place})




 