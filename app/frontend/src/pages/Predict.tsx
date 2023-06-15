import { Download } from '@mui/icons-material'
import { Autocomplete, IconButton, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GET_REQUEST, POST_REQUEST, SERVER_URL } from 'src/config/api'
import PredictionComponent from 'src/pages/PredictionComponent/PredictionComponent'
import { Movie as MovieType } from 'src/types/Movie'
import { defaultPrediction, Prediction } from 'src/types/Prediction'
import Moviedetails from './Moviedetails'

const WAIT_INTERVAL = 1000
let timerID: NodeJS.Timeout

const Predict: FunctionComponent = () => {
    const { t } = useTranslation()

    const [searchMovies, setSearchMovies] = useState<MovieType[]>([])
    const [moviePrediction, setMoviePrediction] = useState<Prediction>(defaultPrediction)
    const handleSearch = (query: string) => {
        clearTimeout(timerID)

        timerID = setTimeout(() => {
            axios.get(`${SERVER_URL}/movies/search?title=${query}`, GET_REQUEST).then(res => {
                setSearchMovies(res.data.data)
            })
        }, WAIT_INTERVAL)
    }

    const reader = new FileReader()
    const fileRef = useRef(null)

    const getBase64 = (file: any) => {
        return new Promise(resolve => {
            let fileInfo
            let baseURL: string | ArrayBuffer | null = null
            // Make new FileReader
            let reader = new FileReader()

            // Convert the file to base64 text
            reader.readAsDataURL(file)

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                console.log('Called', reader)
                baseURL = reader.result
                console.log(baseURL)
                resolve(baseURL)
            }
            console.log(fileInfo)
        })
    }

    const uploadFile = async (file: any) => {
        if (!file) return
        await getBase64(file).then(result => {
            axios
                .post(`${SERVER_URL}/movies`, { base64: result }, POST_REQUEST)
                .then(res => setMoviePrediction(res.data.data))
            file['base64'] = result
            console.log('File Is', file)
        })
    }

    useEffect(() => {
        console.log({ moviePrediction })
    }, [moviePrediction])

    const [selectedMovie, setSelectedMovie] = useState<MovieType>()

    return (
        <Stack sx={{ padding: '40px' }}>
            <Typography variant="h2" sx={{ marginBottom: '20px' }}>
                {t('predictPage.search')}
            </Typography>

            <Autocomplete
                disablePortal
                options={searchMovies}
                getOptionLabel={(option: MovieType) => option.title}
                onInputChange={(e, value) => handleSearch(value)}
                onChange={(e, value) => (value ? setSelectedMovie(value) : '')}
                renderInput={params => (
                    <TextField
                        {...params}
                        label={''}
                        sx={{
                            color: theme => theme.palette.secondary.main,
                            backgroundColor: theme => theme.palette.common.white,
                            borderRadius: '8px',
                        }}
                    />
                )}
            />

            {selectedMovie ? <Moviedetails movie={selectedMovie} /> : null}

            <Stack direction="column" spacing={2} sx={{ marginTop: '40px', alignItems: 'center' }}>
                <Typography variant="h2" sx={{ marginBottom: '20px' }}>
                    {t('predictPage.download')}
                </Typography>
                <label htmlFor="raised-button-file">
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        type="file"
                        ref={fileRef}
                        onChange={e => {
                            console.log({ e })
                            const file = e.target.files

                            if (file && file[0]) uploadFile(file[0])
                        }}
                    />
                    <IconButton
                        color="secondary"
                        aria-label="upload picture"
                        component="span"
                        sx={{
                            backgroundColor: theme => theme.palette.common.white,
                            borderRadius: 1,
                            border: theme => `2px solid ${theme.palette.secondary.main}`,
                        }}
                    >
                        <Download /> Download file
                    </IconButton>
                </label>
                <PredictionComponent prediction={moviePrediction} />
            </Stack>
        </Stack>
    )
}
export default Predict
