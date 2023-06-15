export type Genre = {
    id: number
    count: number
    genre: string
    movie_id: string[]
}

export const defaultGenre = {
    id: 0,
    count: 0,
    genre: '',
    movie_id: [''],
}
