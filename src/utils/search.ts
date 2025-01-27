import { Founded } from "../commponents/Founded";
import { ApiClient } from "./apiHandler";
import { reload } from "./reload";
import { MovieType } from "./types";

export function search() {
    const searchOpen = document.querySelector('#search_open') as HTMLElement;
    const dialog = document.querySelector('dialog');
    const closeModal = document.querySelector('.close_modal') as HTMLElement;

    const input = dialog?.querySelector('input') as HTMLInputElement

    if (searchOpen && closeModal) {
        searchOpen.onclick = () => {
            dialog?.showModal();
            
        };
        closeModal.onclick = () => {
            dialog?.close();
        };
    }

    const apiCall = new ApiClient(import.meta.env.VITE_PUBLIC_BASE_URL)

    const founded_place = document.querySelector('.founded_movies') as HTMLElement
    input.onkeyup = async(e:any) => {
        const value = e.target.value.trim().toLowerCase()
        
        const movies = await apiCall.read(`/search/movie?query=${value}`) as any
        
        
        reload<MovieType>({
            arr: movies.results.slice(0,20),
            commponent: Founded,
            place: founded_place
        });
        console.log(movies.results,Founded,founded_place);
        
        
        
    }

}