
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

 const movie = document.querySelectorAll(".movie") as NodeListOf<HTMLElement>

 movie.forEach(mov => mov.onclick = () =>{
    location.assign('/src/pages/movie_page/')
   
} )
 