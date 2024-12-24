export type ReloadProps = {
    arr: Array<any>
    commponent:(item: MovieType) => HTMLElement
    place:HTMLElement
}

export type MovieType = {
    id: string
    title: string
    description: string
    jenre:string
    poster: any
    ratings: string
    type:string
}