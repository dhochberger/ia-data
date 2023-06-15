import { defaultPredictedColors, PredictedColors } from './Color'
import { defaultPredictedFaces, PredictedFaces } from './PredictedFaces'

export type Prediction = {
    colors: PredictedColors
    faces: PredictedFaces
    ocr: { fiveLines: number; textOnTop: number; titleLowestPart: number }
}

export const defaultPrediction: Prediction = {
    colors: defaultPredictedColors,
    faces: defaultPredictedFaces,
    ocr: { fiveLines: 0, textOnTop: 0, titleLowestPart: 0 },
}
