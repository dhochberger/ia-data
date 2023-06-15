import { PredictedGenre } from './PredictedGenre'

export type PredictedFaces = {
    genres_faces: string[]
    number_faces: number
    predicted_faces: PredictedGenre[]
}

export const defaultPredictedFaces: PredictedFaces = {
    genres_faces: [],
    number_faces: 0,
    predicted_faces: [],
}
