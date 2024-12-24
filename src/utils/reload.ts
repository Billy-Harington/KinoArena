import { ReloadProps } from "./types"


export function reload({ arr, commponent, place }: ReloadProps) {
    place.innerHTML = ""

    for (const item of arr) {
        const elem: HTMLElement = commponent(item)

        place.append(elem)
    }
}

