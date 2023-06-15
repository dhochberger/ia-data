import { Grid } from '@mui/material'
import { FunctionComponent, useEffect, useState } from 'react'
import { GET_REQUEST, SERVER_URL } from 'src/config/api'
import { Movie as MovieType } from 'src/types/Movie'
import MoviesCards from 'src/components/LibraryComponents/MoviesCards'
import axios from 'axios'

interface Props {
    movies: MovieType[]
}

const GridLibrary: FunctionComponent<Props> = ({ movies }) => (
    <Grid container spacing={2}>
        <MoviesCards movies={movies} />
    </Grid>
)

export default GridLibrary
