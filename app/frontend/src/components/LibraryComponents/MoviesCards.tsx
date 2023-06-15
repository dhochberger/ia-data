import { CardContent, Grid, Link, Typography, Card, CardMedia } from '@mui/material'
import { FunctionComponent } from 'react'
import { Movie as MovieType } from 'src/types/Movie'
import { Link as LinkRouter } from 'react-router-dom'

interface Props {
    movies: MovieType[]
}

const MoviesCards: FunctionComponent<Props> = ({ movies }) => {
    const checkImage = (item: MovieType) => {
        try {
            return require(`../../assets/img/${item.year}/${item.imdb_title_id}.jpg`).default
        } catch {
            return require('../../image/not_image_available.png').default
        }
    }

    return (
        <Grid container spacing={2}>
            {movies.map((item, index) => {
                if (index >= 12) return
                return (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                        <Link underline="none" component={LinkRouter} to={'/moviedetails'} state={item}>
                            <Card sx={{ height: '400px' }}>
                                <CardMedia
                                    component="img"
                                    width="100%"
                                    height="300px"
                                    image={checkImage(item)}
                                    alt={item.title}
                                />
                                <CardContent>
                                    <Typography variant="subtitle1">{item.title}</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                )
            })}
        </Grid>
    )
}
export default MoviesCards
