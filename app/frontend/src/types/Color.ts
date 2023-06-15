import { PredictedGenre } from './PredictedGenre'

export type Color = {
    color: string
    name: string
    percent: number
    value: string
}

export const defaultColor: Color = {
    color: '',
    name: '',
    percent: 0,
    value: '',
}

export type PredictedColors = {
    colors: Color[]
    genres_colors: string[]
    predicted_colors: PredictedGenre[]
}

export const defaultPredictedColors: PredictedColors = {
    colors: [],
    genres_colors: [],
    predicted_colors: [],
}
