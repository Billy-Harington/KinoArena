import { ActorsType } from "../utils/types";

export function Actor(item:ActorsType){
const actor = document.createElement('div')
const img = document.createElement('img')
const h1 = document.createElement('h1')
const p = document.createElement('p')

actor.classList.add('actor')

img.src = `${import.meta.env.VITE_PUBLIC_BASE_POSTER_URL + item.profile_path}`
h1.innerText = item.name
p.innerText = item.character


actor.onclick = () => {
    const movieId = item.id
    console.log(movieId);
    
    location.assign(`/src/pages/actor_page/?id=${movieId}`)
}
actor.append(img,h1,p)

return actor

}