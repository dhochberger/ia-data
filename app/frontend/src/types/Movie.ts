export type Movie = {
    id: number
    imdb_title_id: string
    title: string
    orginal_title: string
    year: number
    date_published : string
    genre : string
    duration : number
    country : string
    language : string
    director : string 
    writer : string
    production_company : string
    actors : string
    description : string
    avg_vote: string 
    votes : number 
    budget : string 
    reviews_from_users : string
    reviews_from_critics : string
}

export const defaultMovie = {
    id: 0,
    imdb_title_id: '',
    title: '',
    orginal_title: '',
    year: 0,
    date_published : '',
    genre : '',
    duration : 0,
    country : '',
    language : '',
    director : '' ,
    writer : '',
    production_company : '',
    actors : '',
    description : '',
    avg_vote: '', 
    votes : 0, 
    budget : '' ,
    reviews_from_users : '',
    reviews_from_critics : '',
}