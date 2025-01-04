import { PostersType } from "../utils/types";


export function Frames(item:PostersType) {
    const frame = document.createElement('div')
    const img = document.createElement('img')

    frame.classList.add('frame')

    img.src = import.meta.env.VITE_PUBLIC_BASE_POSTER_URL +item.file_path


    frame.append(img)

    return frame
}