import { Actor } from "../../commponents/Actor"
import { Frames } from "../../commponents/Frames"
import { Poster } from "../../commponents/Poster"
import { ApiClient } from "../../utils/apiHandler"
import { reload } from "../../utils/reload"
import { ActorsType, PostersType } from "../../utils/types"

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

const trailer = videos.results.find((item) => item.type === "Trailer")
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

const language = translations.translations.find((item) => item.english_name === "Russian")

const movie_names = document.querySelectorAll('.movie_name')
movie_names.forEach(movie => movie.innerHTML = language.data.title)

const short_plot = document.querySelector('.short_movie_info') as HTMLElement
short_plot.innerHTML = language.data.overview

const film = await apiCall.read(`/movie/${pageId}`) as any

console.log(film);

const main_BG = document.querySelector('.main') as HTMLImageElement
main_BG.style.background = `
  linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 0%), 
  url(${import.meta.env.VITE_PUBLIC_BASE_POSTER_URL + film.backdrop_path}) no-repeat center / cover
`;
main_BG.style.height = '110vh';

const credits = await apiCall.read(`/movie/${pageId}/credits`) as any

const votes_total = document.querySelector('.votes_total') as HTMLElement
votes_total.innerHTML = film.vote_average

// данные фильма
// Получение контейнеров
const column1 = document.getElementById('column_1') as HTMLElement
const column2 = document.getElementById('column_2') as HTMLElement

// Форматирование данных для отрисовки
const countryNames = film.production_countries.map(country => country.name).join(', ');
const genres = film.genres.map(genre => genre.name).join(', ');

// Данные для первой колонки
const column1Data = [
    { label: 'Год:', value: film.release_date.split('-')[0] },
    { label: 'Страна:', value: countryNames },
    { label: 'Слоган:', value: film.tagline || 'Не указан' },
    { label: 'Режиссер:', value: 'Информация отсутствует' }, // Нет данных в объекте
    { label: 'Сценарий:', value: 'Информация отсутствует' }, // Нет данных в объекте
    { label: 'Продюсер:', value: 'Информация отсутствует' }, // Нет данных в объекте
    { label: 'Оператор:', value: 'Информация отсутствует' }, // Нет данных в объекте
    { label: 'Композитор:', value: 'Информация отсутствует' } // Нет данных в объекте
];

// Данные для второй колонки
const column2Data = [
    { label: 'Художник:', value: 'Информация отсутствует' }, // Нет данных в объекте
    { label: 'Монтаж:', value: 'Информация отсутствует' }, // Нет данных в объекте
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

