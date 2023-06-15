import { Button, ButtonGroup, Grid, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MoviesCards } from 'src/components/LibraryComponents'
import { SERVER_URL, GET_REQUEST } from 'src/config/api'
import { Movie as MovieType } from 'src/types/Movie'

const Library: FunctionComponent = () => {
    const { t } = useTranslation()

    const yearValue = [1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 0]

    const [selectedYear, setSelectedYear] = useState(0)

    const [movies, setMovies] = useState<MovieType[]>([])
    useEffect(() => {
        axios.get(`${SERVER_URL}/movies`, GET_REQUEST).then(res => {
            setMovies(res.data.data.movies)
        })
    }, [])

    const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null)
    useEffect(() => {
        if (!selectedMovie) return
        axios.get(`${SERVER_URL}/movies/${selectedMovie?.imdb_title_id}`, GET_REQUEST).then(res => {
            setSelectedMovie(old => ({ ...old, ...res.data.data }))
        })
    }, [selectedMovie])

    const [yearMovies, setYearMovies] = useState<MovieType[]>([])
    useEffect(() => {
        if (!selectedYear) return
        axios.get(`${SERVER_URL}/movies?year=${selectedYear}`, GET_REQUEST).then(res => {
            setYearMovies(res.data.data.movies)
        })
    }, [selectedYear])

    return (
        <Stack p={5}>
            <Typography variant="h2" sx={{ marginBottom: '20px' }}>
                {t('libraryPage.title')}
            </Typography>
            <Typography variant="body1">{t('libraryPage.summary')}</Typography>

            <Grid item md={12} sx={{ textAlign: 'center', padding: '20px' }}>
                <ButtonGroup>
                    {yearValue.map((item, index) => (
                        <Button
                            key={index}
                            color="secondary"
                            sx={{
                                backgroundColor: theme => (selectedYear === item ? theme.palette.secondary.main : ''),
                                color: theme => (selectedYear === item ? theme.palette.common.white : ''),
                                fontSize: '18px',
                            }}
                            onClick={() => setSelectedYear(item)}
                        >
                            {item ? item : 'All'}
                        </Button>
                    ))}
                </ButtonGroup>
            </Grid>

            <MoviesCards movies={selectedYear ? yearMovies : movies} />
        </Stack>
    )
}
export default Library
