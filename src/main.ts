import { Movie } from "./commponents/Movie";
import { Trailer } from "./commponents/Trailer";
import { ApiClient } from "./utils/apiHandler";
import { reload } from "./utils/reload";

const searchInput = document.querySelector('.searchInp input') as HTMLInputElement;
const movieTitles = document.querySelectorAll('.founded_movies .founded .neccessary h1');
const actorTitles = document.querySelectorAll('.founded_actors .founded .neccessary h1');


function filterItems(): void {
    const query = searchInput.value.toLowerCase();

   
    movieTitles.forEach(title => {
        const text = title.textContent?.toLowerCase() || '';
        if (text.includes(query)) {
            title.closest('.founded')?.classList.remove('hidden');
        } else {
            title.closest('.founded')?.classList.add('hidden');
        }
    });

   
    actorTitles.forEach(title => {
        const text = title.textContent?.toLowerCase() || '';
        if (text.includes(query)) {
            title.closest('.founded')?.classList.remove('hidden');
        } else {
            title.closest('.founded')?.classList.add('hidden');
        }
    });
}


if (searchInput) {
    searchInput.addEventListener('keyup', filterItems);
}


const searchOpen = document.querySelector('#search_open') as HTMLElement;
const dialog = document.querySelector('dialog');
const closeModal = document.querySelector('.close_modal') as HTMLElement;

if (searchOpen && closeModal) {
    searchOpen.onclick = () => {
        dialog?.showModal();
        console.log("clicked");
    };
    closeModal.onclick = () => {
        dialog?.close();
    };
}

 

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




 