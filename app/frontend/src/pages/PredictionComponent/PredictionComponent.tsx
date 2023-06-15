import { Grid, Stack, Typography } from '@mui/material'
import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { BoxColor } from 'src/components'
import { CardNumber } from 'src/components/Cards'
import { Prediction } from 'src/types/Prediction'

type Props = {
    prediction: Prediction
}
const PredictionComponent: FunctionComponent<Props> = ({ prediction }) => {
    const { t } = useTranslation()

    return (
        <Stack sx={{ padding: '40px' }}>
            <Typography variant="h2" sx={{ marginBottom: '20px' }}>
                Analyse et Prediction du fichier
            </Typography>
            <Grid container direction="row" spacing={2}>
                <Grid item xs={12} sm={4}>
                    {prediction.colors.predicted_colors.length > 0 && (
                        <Stack direction="column" gap={1}>
                            <Typography variant="h6">Couleurs</Typography>
                            <BoxColor predictionColors={prediction.colors} />
                            <Stack direction="row">
                                {prediction.colors.genres_colors.map(item => (
                                    <CardNumber value={item} label="" />
                                ))}
                            </Stack>
                            <Stack direction="column" gap={0.5}>
                                {prediction.colors.predicted_colors
                                    .sort((a, b) => b.percent - a.percent)
                                    .slice(0, 5)
                                    .map(item => (
                                        <Typography variant="body1">
                                            {item.genre} : {item.percent.toFixed(2)}
                                        </Typography>
                                    ))}
                            </Stack>
                        </Stack>
                    )}
                </Grid>

                <Grid item xs={12} sm={4}>
                    {prediction.faces.genres_faces.length > 0 && (
                        <Stack direction="column" gap={1}>
                            <Typography variant="h6">Visages</Typography>
                            <Typography variant="subtitle2" height="80px">
                                Nombre de visages: {prediction.faces.number_faces}
                            </Typography>
                            <Stack direction="row">
                                {prediction.faces.genres_faces.map(item => (
                                    <CardNumber value={item} label="" />
                                ))}
                            </Stack>
                            <Stack direction="column" gap={0.5}>
                                {prediction.faces.predicted_faces
                                    .sort((a, b) => b.percent - a.percent)
                                    .slice(0, 5)
                                    .map(item => (
                                        <Typography variant="body1">
                                            {item.genre} : {item.percent.toFixed(2)}
                                        </Typography>
                                    ))}
                            </Stack>
                        </Stack>
                    )}
                </Grid>

                <Grid item xs={12} sm={4}>
                    {prediction.faces.genres_faces.length > 0 && (
                        <Stack direction="column" gap={1}>
                            <CardNumber label="Texte en haut" value={prediction.ocr.textOnTop ? 'Oui' : 'Non'} />
                            <CardNumber
                                label="Titre dans la moitié basse"
                                value={prediction.ocr.titleLowestPart ? 'Oui' : 'Non'}
                            />
                            <CardNumber
                                label="Plus de 5 lignes en bas"
                                value={prediction.ocr.fiveLines ? 'Oui' : 'Non'}
                            />
                        </Stack>
                    )}
                </Grid>
            </Grid>
        </Stack>
    )
}
export default PredictionComponent
