import { Autocomplete, Grid, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import randomColor from 'randomcolor'
import { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CardNumber } from 'src/components/Cards'
import { Bar } from 'src/components/Charts'
import { GET_REQUEST, SERVER_URL } from 'src/config/api'

const categories = [
    'Action',
    'Adventure',
    'Animation',
    'Biography',
    'Comedy',
    'Crime',
    'Drama',
    'Family',
    'Fantasy',
    'History',
    'Horror',
    'Music',
    'Musical',
    'Mystery',
    'News',
    'Reality-TV',
    'Romance',
    'Sci-Fi',
    'Shorts',
    'Sport',
    'Thriller',
    'War',
    'Western',
]

const options = {
    plugins: {
        legend: {
            display: false,
        },
    },
}

const CategoryAnalysis: FunctionComponent = () => {
    const { t } = useTranslation()

    const [selectedCategory, setSelectedCategory] = useState('')

    const [ocrFromCat, setOcrFromCat] = useState<{
        fiveLines: number
        lowestPart: number
        textTop: number
    }>({ fiveLines: 0, lowestPart: 0, textTop: 0 })
    const [genreCompanies, setGenreCompanies] = useState<{ count: number; production_company: string }[]>([])
    const [companiesLength, setCompaniesLength] = useState(0)

    const [genreLanguages, setGenreLanguages] = useState<{ count: number; language: string }[]>([])
    const [languagesLength, setLanguagesLength] = useState(0)

    const [genreCountries, setGenreCountries] = useState<{ count: number; country: string }[]>([])
    const [countriesLength, setCountriesLength] = useState(0)

    const [genreYears, setGenreYears] = useState<{ count: number; year: string }[]>([])
    const [yearsLength, setYearsLength] = useState(0)

    const handleSelectedCategory = () => {
        axios
            .get(`${SERVER_URL}/movies/ocr?genre=${selectedCategory}`, GET_REQUEST)
            .then(res => {
                setOcrFromCat(res.data.data)
            })
            .catch(e => console.log({ e }))
        axios
            .get(`${SERVER_URL}/movies/production_companies?genre=${selectedCategory}`, GET_REQUEST)
            .then(res => {
                setGenreCompanies(res.data.data)
            })
            .catch(e => console.log({ e }))
        axios
            .get(`${SERVER_URL}/movies/languages?genre=${selectedCategory}`, GET_REQUEST)
            .then(res => {
                setGenreLanguages(res.data.data)
            })
            .catch(e => console.log({ e }))
        axios
            .get(`${SERVER_URL}/movies/countries?genre=${selectedCategory}`, GET_REQUEST)
            .then(res => {
                setGenreCountries(res.data.data)
            })
            .catch(e => console.log({ e }))
        axios
            .get(`${SERVER_URL}/movies/years?genre=${selectedCategory}`, GET_REQUEST)
            .then(res => {
                setGenreYears(res.data.data)
            })
            .catch(e => console.log({ e }))
    }

    useEffect(() => {
        if (selectedCategory) handleSelectedCategory()
    }, [selectedCategory])

    return (
        <Stack direction="column">
            <Typography variant="h2" sx={{ marginBottom: '20px' }}>
                Analyse de la catégorie
            </Typography>
            <Autocomplete
                disablePortal
                options={categories}
                getOptionLabel={option => option}
                onChange={(e, value) => (value ? setSelectedCategory(value) : setSelectedCategory(''))}
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
            {selectedCategory && (
                <>
                    <Typography variant="h6">{selectedCategory}</Typography>
                    <Stack direction="row">
                        <CardNumber label="Text en haut" value={`${(ocrFromCat?.textTop * 100).toFixed(2)}%`} />
                        <CardNumber
                            label="Titre dans la moitié basse"
                            value={`${(ocrFromCat?.lowestPart * 100).toFixed(2)}%`}
                        />
                        <CardNumber label="5 Lignes au bas" value={`${(ocrFromCat?.fiveLines * 100).toFixed(2)}%`} />
                    </Stack>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <Bar
                                data={{
                                    labels: genreCompanies
                                        .map(item => item.production_company)
                                        .slice(0, companiesLength ? companiesLength : 10),
                                    datasets: [
                                        {
                                            data: genreCompanies.map(item => item.count).slice(0, 10),
                                            backgroundColor: randomColor({
                                                hue: 'purple',
                                                count: genreCompanies.length,
                                            }),
                                        },
                                    ],
                                }}
                                options={options}
                                title={'Number of films by company'}
                                showSelection
                                max={genreCompanies.length}
                                setNumber={value => setCompaniesLength(value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Bar
                                data={{
                                    labels: genreLanguages
                                        .map(item => item.language)
                                        .slice(0, languagesLength ? languagesLength : 15),
                                    datasets: [
                                        {
                                            data: genreLanguages
                                                .map(item => item.count)
                                                .slice(0, languagesLength ? languagesLength : 15),
                                            backgroundColor: randomColor({
                                                hue: 'yellow',
                                                count: genreLanguages.length,
                                            }),
                                        },
                                    ],
                                }}
                                options={options}
                                title={'Number of films by language'}
                                showSelection
                                max={genreLanguages.length}
                                setNumber={value => setLanguagesLength(value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Bar
                                data={{
                                    labels: genreCountries
                                        .map(item => item.country)
                                        .slice(0, countriesLength ? countriesLength : 10),
                                    datasets: [
                                        {
                                            data: genreCountries
                                                .map(item => item.count)
                                                .slice(0, countriesLength ? countriesLength : 10),
                                            backgroundColor: randomColor({
                                                luminosity: 'light',
                                                count: genreCountries.length,
                                            }),
                                        },
                                    ],
                                }}
                                options={options}
                                title={'Number of films by country'}
                                showSelection
                                max={genreCountries.length}
                                setNumber={value => setCountriesLength(value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Bar
                                data={{
                                    labels: genreYears.map(item => item.year).slice(0, yearsLength ? yearsLength : 15),
                                    datasets: [
                                        {
                                            data: genreYears
                                                .map(item => item.count)
                                                .slice(0, yearsLength ? yearsLength : 15),
                                            backgroundColor: randomColor({ hue: 'random', count: genreYears.length }),
                                        },
                                    ],
                                }}
                                options={options}
                                title={'Number of films by year'}
                                showSelection
                                max={genreYears.length}
                                setNumber={value => setYearsLength(value)}
                            />
                        </Grid>
                    </Grid>
                </>
            )}
        </Stack>
    )
}
export default CategoryAnalysis
