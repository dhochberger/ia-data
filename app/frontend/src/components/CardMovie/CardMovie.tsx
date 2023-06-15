import { Grid, Stack, Paper, styled, Button, Typography, Rating } from '@mui/material'
import { FunctionComponent } from 'react'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { defaultMovie, Movie as MovieType } from 'src/types/Movie'

interface Props {
    movie?: MovieType
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: '10px',
    margin: '5px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
}))

const GreenTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.secondary.main,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.secondary.main,
    },
}))

const CardMovie: FunctionComponent<Props> = ({ movie }) => {
    const checkImage = (item: MovieType) => {
        try {
            return require(`../../assets/img/${item.year}/${item.imdb_title_id}.jpg`).default
        } catch {
            return require('../../image/not_image_available.png').default
        }
    }

    return (
        <Grid container>
            <Grid item md={4} sx={{ padding: '20px' }}>
                <img src={checkImage(movie ?? defaultMovie)} alt="Logo" width="100%" height="auto" />
            </Grid>
            <Grid item md={8} sx={{ display: 'flex', alignItems: 'center' }}>
                <Stack sx={{ padding: '20px' }}>
                    <Item>
                        <Stack direction="row" spacing={2}>
                            <Typography sx={{ width: '90px', textAlign: 'left' }} variant="h6">
                                {' '}
                                Title:{' '}
                            </Typography>
                            <Typography variant="body2">{movie?.title}</Typography>
                        </Stack>
                    </Item>

                    <Grid container>
                        <Grid item md={6} xs={6}>
                            <Item>
                                <Stack direction="row" spacing={2}>
                                    <Typography sx={{ width: '90px', textAlign: 'left' }} variant="h6">
                                        {' '}
                                        Date:{' '}
                                    </Typography>
                                    <Typography variant="body2">{movie?.year}</Typography>
                                </Stack>
                            </Item>
                        </Grid>
                        <Grid item md={6} xs={6}>
                            <Item>
                                <GreenTooltip title={`${movie?.votes} votes`}>
                                    <Button sx={{ padding: '2px' }}>
                                        <Rating
                                            name="read-only"
                                            value={movie ? parseFloat(movie.avg_vote) / 2 : 0}
                                            readOnly
                                            max={5}
                                            precision={0.2}
                                        />
                                    </Button>
                                </GreenTooltip>
                            </Item>
                        </Grid>
                    </Grid>

                    <Item>
                        <Stack direction="row" spacing={2}>
                            <Typography sx={{ width: '90px', textAlign: 'left' }} variant="h6">
                                {' '}
                                Acteurs:{' '}
                            </Typography>
                            <Typography variant="body2">{movie?.actors}</Typography>
                        </Stack>
                    </Item>

                    <Item>
                        <Stack direction="row" spacing={2}>
                            <Typography sx={{ width: '90px', textAlign: 'left' }} variant="h6">
                                {' '}
                                Genre:{' '}
                            </Typography>
                            <Typography variant="body2">{movie?.genre}</Typography>
                        </Stack>
                    </Item>

                    <Item>
                        <Stack direction="row" spacing={2}>
                            <Typography sx={{ width: '90px', textAlign: 'left' }} variant="h6">
                                {' '}
                                Descritpion:{' '}
                            </Typography>
                            <Typography variant="body2">{movie?.description}</Typography>
                        </Stack>
                    </Item>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default CardMovie
