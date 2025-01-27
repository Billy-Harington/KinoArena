import { Actor } from "../../commponents/Actor"
import { Frames } from "../../commponents/Frames"
import { Movie } from "../../commponents/Movie"
import { Poster } from "../../commponents/Poster"
import { ApiClient } from "../../utils/apiHandler"
import { reload } from "../../utils/reload"
import { search } from "../../utils/search"
import { ActorsType, MovieType, PostersType } from "../../utils/types"


search() 

const pageId = location.search.split('=').at(-1) 
const apiCall = new ApiClient(import.meta.env.VITE_PUBLIC_BASE_URL)

const actors = await apiCall.read(`/movie/${pageId}/credits`) as any

console.log(pageId);


const actors_place = document.querySelector('.actors_container') as HTMLElement
reload<ActorsType>({
    arr: actors.cast.slice(0,12),
    commponent: Actor,
    place: actors_place,
});

const videos = await apiCall.read(`movie/${pageId}/videos`) as any

const trailer = videos.results.find((item:any) => item.type === "Trailer")
const iframe = document.querySelector('iframe') as any
 iframe.src = `https://www.youtube.com/embed/${trailer.key}`

 const posters_place = document.querySelector('.posters_container') as HTMLElement
const posters = await apiCall.read(`/movie/${pageId}/images`) as any




 reload<PostersType>({
    arr: posters.posters.slice(0,12),
    commponent: Poster,
    place: posters_place,
});
 const frames_place = document.querySelector('.frames_container') as HTMLElement




 reload<PostersType>({
    arr: posters.backdrops.slice(0,12),
    commponent: Frames,
    place: frames_place,
});


const translations = await apiCall.read(`movie/${pageId}/translations`) as any

const language = translations.translations.find((item:any) => item.english_name === "Russian")

const movie_names = document.querySelectorAll('.movie_name')
movie_names.forEach(movie => movie.innerHTML = language.data.title)

const short_plot = document.querySelector('.short_movie_info') as HTMLElement
short_plot.innerHTML = language.data.overview

const film = await apiCall.read(`/movie/${pageId}`) as any



const main_BG = document.querySelector('.main') as HTMLImageElement
main_BG.style.background = `
  linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 0%), 
  url(${import.meta.env.VITE_PUBLIC_BASE_POSTER_URL + film.backdrop_path}) no-repeat center / cover
`;
main_BG.style.height = '110vh';

const credits = await apiCall.read(`/movie/${pageId}/credits`) as any
const films = await apiCall.read(`/search/movie`) as any

const votes_total = document.querySelector('.votes_total') as HTMLElement
votes_total.innerHTML = film.vote_average

const similar = await apiCall.read(`/movie/${pageId}/similar`) as any
const similar_place = document.querySelector('.movies_container') as HTMLElement
reload<MovieType>({
    arr: similar.results.slice(0,8),
    commponent: Movie,
    place: similar_place
});



// данные фильма

const column1 = document.getElementById('column_1');
const column2 = document.getElementById('column_2');


const countryNames = film.production_countries.map(country => country.name).join(', ');
const genres = film.genres.map(genre => genre.name).join(', ');


const director = credits.crew.find(member => member.job === 'Director')?.name || 'Информация отсутствует';
const screenwriters = credits.crew.filter(member => member.job === 'Screenplay').map(writer => writer.name).join(', ') || 'Информация отсутствует';
const producers = credits.crew.filter(member => member.job === 'Producer').map(producer => producer.name).join(', ') || 'Информация отсутствует';
const cinematographer = credits.crew.find(member => member.job === 'Director of Photography')?.name || 'Информация отсутствует';
const composer = credits.crew.find(member => member.job === 'Original Music Composer')?.name || 'Информация отсутствует';
const productionDesigner = credits.crew.find(member => member.job === 'Production Design')?.name || 'Информация отсутствует';
const editor = credits.crew.find(member => member.job === 'Editor')?.name || 'Информация отсутствует';



const column1Data = [
    { label: 'Год:', value: film.release_date.split('-')[0] },
    { label: 'Страна:', value: countryNames },
    { label: 'Слоган:', value: film.tagline || 'Не указан' },
    { label: 'Режиссер:', value: director },
    { label: 'Сценарий:', value: screenwriters },
    { label: 'Продюсер:', value: producers },
    { label: 'Оператор:', value: cinematographer },
    { label: 'Композитор:', value: composer }
];

// Данные для второй колонки
const column2Data = [
    { label: 'Художник:', value: productionDesigner },
    { label: 'Монтаж:', value: editor },
    { label: 'Жанр:', value: genres },
    { label: 'Сборы в мире:', value: `$${film.revenue.toLocaleString()}` },
    { label: 'Премьера (мир):', value: film.release_date },
    { label: 'Возраст:', value: film.adult ? '18+' : 'Для всех' },
    { label: 'Время:', value: `${film.runtime} мин.` }
];

// Функция для отрисовки данных
function renderData(column, data) {
    data.forEach(item => {
        const p = document.createElement('p');
        const span = document.createElement('span');
        span.textContent = item.label;
        p.appendChild(span);
        p.appendChild(document.createTextNode(` ${item.value}`));
        column.appendChild(p);
    });
}

// Отрисовка данных в колонки
renderData(column1, column1Data);
renderData(column2, column2Data);

// studios info

const studiosContainer = document.querySelector('.studios') as HTMLElement
const productionContainer = document.querySelector('.production ul') as HTMLElement




const crewData = credits.crew.filter(member => 
    [ 'Producer',  ].includes(member.job)
);


function createCrewElement(person: any) {
    const personDiv = document.createElement('div');
    personDiv.classList.add('person');
    
    const img = document.createElement('img');
    img.src = import.meta.env.VITE_PUBLIC_BASE_POSTER_URL +person.profile_path
    img.alt = person.name;

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');

    const h1 = document.createElement('h1');
    h1.textContent = person.name;

    const h3 = document.createElement('h3');
    h3.textContent = person.original_name || person.name; // Используем оригинальное имя, если доступно

    const p = document.createElement('p');
    p.textContent = person.job;

    infoDiv.appendChild(h1);
    infoDiv.appendChild(h3);
    infoDiv.appendChild(p);
    personDiv.appendChild(img);
    personDiv.appendChild(infoDiv);

    return personDiv;
}


crewData.forEach(person => {
    const crewElement = createCrewElement(person);
    studiosContainer.appendChild(crewElement);
});

// Данные для "Производство"
film.production_companies.forEach((company, index) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = `${index + 1}. ${company.name}`;
    li.appendChild(a);
    productionContainer.appendChild(li);
});







