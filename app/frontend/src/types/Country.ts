export type Country = {
    id: number
    count: number
    country: string
    movie_id: string[]
}

export const defaultCountry = {
    id: 0,
    count: 0,
    country: '',
    movie_id: [''],
}
