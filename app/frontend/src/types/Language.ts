export type Language = {
    id: number
    count: number
    language: string
    movie_id: string[]
}

export const defaultLanguage = {
    id: 0,
    count: 0,
    language: '',
    movie_id: [''],
}
