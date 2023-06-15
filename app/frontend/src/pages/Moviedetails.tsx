import { Stack, Typography, Button, Link } from '@mui/material'
import { FunctionComponent, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { CardMovie } from 'src/components/CardMovie'
import { ArrowBack } from '@mui/icons-material'
import { Link as LinkRouter, useLocation } from 'react-router-dom'
import { Movie } from 'src/types/Movie'
type Props = {
    movie?: Movie
}
const MovieDetails: FunctionComponent<Props> = ({ movie }) => {
    const { t } = useTranslation()

    const { state } = useLocation()
    useEffect(() => console.log({ state, movie }), [movie, state])

    return (
        <Stack sx={{ padding: '40px' }}>
            {state ? (
                <>
                    <Link underline="none" component={LinkRouter} to={'/library'}>
                        <Button variant="contained" color="primary" sx={{ height: '40px' }}>
                            <ArrowBack />
                        </Button>
                    </Link>
                    <Typography variant="h2">{t('moviedetailsPage.title')}</Typography>
                </>
            ) : null}
            <CardMovie movie={state ?? movie} />
            <Typography variant={state ? 'h2' : 'h6'} sx={{ marginTop: '40px', marginBottom: '20px' }}>
                {t('moviedetailsPage.subtitle')}
            </Typography>
        </Stack>
    )
}
export default MovieDetails
