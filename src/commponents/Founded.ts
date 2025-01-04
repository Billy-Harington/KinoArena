// import { MovieType } from "../utils/types";

// export function Founded(item:MovieType) {
    
//     const founded = document.createElement('div')
//     const neccessary = document.createElement('div')
//     const movie_data = document.createElement('div')
//     const f_ratings = document.createElement('div')
//     const img = document.createElement('img')
//     const h1 = document.createElement('h1')
//     const h2 = document.createElement('h2')
//     const p = document.createElement('p')

//     founded.classList.add('founded')
//     neccessary.classList.add('neccessary')
//     movie_data.classList.add('movie_data')
//     f_ratings.classList.add('f_ratings')

//     img.src = item.poster
//     img.alt = ''
//     h1.innerText = `${item.title}(${item.type})`
//     h2.innerText = item.title
//     p.innerText = item.jenre 
    
//     if (item.ratings) {
//         f_ratings.innerText = item.ratings
//     }
//     founded.append(neccessary,f_ratings)
//     neccessary.append(img,movie_data)
//     movie_data.append(h1,h2,p)

    
// }